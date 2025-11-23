const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Contract = require('../models/Contract');

const router = express.Router();

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 */
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    // Get user statistics
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalFarmers = await User.countDocuments({ role: 'farmer', isActive: true });
    const totalInvestors = await User.countDocuments({ role: 'investor', isActive: true });
    const pendingVerifications = await User.countDocuments({ 
      'verification.verificationStatus': 'pending',
      isActive: true 
    });

    // Get contract statistics
    const totalContracts = await Contract.countDocuments();
    const activeContracts = await Contract.countDocuments({ status: 'active' });
    const pendingContracts = await Contract.countDocuments({ status: 'pending_approval' });
    const completedContracts = await Contract.countDocuments({ status: 'completed' });

    // Get revenue statistics
    const revenueData = await Contract.aggregate([
      { $unwind: '$investments' },
      {
        $group: {
          _id: null,
          totalInvestment: { $sum: '$investments.totalAmount' },
          totalInvestments: { $sum: 1 }
        }
      }
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0] : { totalInvestment: 0, totalInvestments: 0 };

    // Get recent activities
    const recentUsers = await User.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username role createdAt verification.verificationStatus');

    const recentContracts = await Contract.find()
      .populate('farmerId', 'username')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          users: {
            total: totalUsers,
            farmers: totalFarmers,
            investors: totalInvestors,
            pendingVerifications
          },
          contracts: {
            total: totalContracts,
            active: activeContracts,
            pending: pendingContracts,
            completed: completedContracts
          },
          revenue: {
            totalInvestment: revenue.totalInvestment,
            totalInvestments: revenue.totalInvestments,
            avgInvestment: revenue.totalInvestments > 0 ? revenue.totalInvestment / revenue.totalInvestments : 0
          }
        },
        recentActivities: {
          users: recentUsers,
          contracts: recentContracts
        }
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
});

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users with filters
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [farmer, investor]
 *         description: Filter by user role
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, verified, rejected]
 *         description: Filter by verification status
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const { role, status, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = { isActive: true };
    if (role) filter.role = role;
    if (status) filter['verification.verificationStatus'] = status;

    const skip = (page - 1) * limit;

    const users = await User.find(filter)
      .select('-password -refreshToken')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: users
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
});

/**
 * @swagger
 * /api/admin/users/{id}/verify:
 *   put:
 *     summary: Verify or reject user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [verified, rejected]
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verification status updated
 */
router.put('/users/:id/verify', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, remarks } = req.body;
    const userId = req.params.id;

    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be either verified or rejected'
      });
    }

    const updateData = {
      'verification.verificationStatus': status,
      'verification.verifiedBy': req.user._id,
      'verification.verifiedAt': new Date()
    };

    if (status === 'verified') {
      updateData['verification.isDocumentVerified'] = true;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `User ${status} successfully`,
      data: user
    });

  } catch (error) {
    console.error('Verify user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating verification status'
    });
  }
});

/**
 * @swagger
 * /api/admin/contracts:
 *   get:
 *     summary: Get all contracts for admin review
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contracts retrieved successfully
 */
router.get('/contracts', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const contracts = await Contract.find(filter)
      .populate('farmerId', 'username profile verification')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Contract.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: contracts.length,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: contracts
    });

  } catch (error) {
    console.error('Get contracts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contracts'
    });
  }
});

/**
 * @swagger
 * /api/admin/contracts/{id}/approve:
 *   put:
 *     summary: Approve or reject contract
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [approve, reject]
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contract status updated
 */
router.put('/contracts/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const { action, remarks } = req.body;
    const contractId = req.params.id;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Action must be either approve or reject'
      });
    }

    const updateData = {
      status: action === 'approve' ? 'approved' : 'cancelled',
      approvedBy: req.user._id,
      approvedAt: new Date()
    };

    if (action === 'reject' && remarks) {
      updateData.rejectionReason = remarks;
    }

    const contract = await Contract.findByIdAndUpdate(
      contractId,
      updateData,
      { new: true }
    ).populate('farmerId', 'username profile');

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    res.status(200).json({
      success: true,
      message: `Contract ${action}d successfully`,
      data: contract
    });

  } catch (error) {
    console.error('Approve contract error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating contract status'
    });
  }
});

module.exports = router;
