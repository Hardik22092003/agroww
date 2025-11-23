const express = require('express');
const { protect, authorize, requireVerification } = require('../middleware/auth');
const Contract = require('../models/Contract');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * /api/farmers/dashboard:
 *   get:
 *     summary: Get farmer dashboard data
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('farmer'), async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Get farmer's contracts
    const contracts = await Contract.find({ farmerId });

    // Calculate statistics
    const totalContracts = contracts.length;
    const activeContracts = contracts.filter(c => c.status === 'active').length;
    const completedContracts = contracts.filter(c => c.status === 'completed').length;
    const totalInvestmentReceived = contracts.reduce((sum, contract) => {
      return sum + contract.investments.reduce((invSum, inv) => invSum + inv.totalAmount, 0);
    }, 0);

    const pendingContracts = contracts.filter(c => c.status === 'pending_approval').length;

    res.status(200).json({
      success: true,
      data: {
        farmer: req.user,
        statistics: {
          totalContracts,
          activeContracts,
          completedContracts,
          pendingContracts,
          totalInvestmentReceived
        },
        recentContracts: contracts.slice(0, 5)
      }
    });

  } catch (error) {
    console.error('Farmer dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
});

/**
 * @swagger
 * /api/farmers/contracts:
 *   get:
 *     summary: Get farmer's contracts
 *     tags: [Farmers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contracts retrieved successfully
 */
router.get('/contracts', protect, authorize('farmer'), async (req, res) => {
  try {
    const contracts = await Contract.find({ farmerId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts
    });

  } catch (error) {
    console.error('Get farmer contracts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contracts'
    });
  }
});

module.exports = router;
