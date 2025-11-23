const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Contract = require('../models/Contract');
const User = require('../models/User');

const router = express.Router();

/**
 * @swagger
 * /api/investors/dashboard:
 *   get:
 *     summary: Get investor dashboard data
 *     tags: [Investors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 */
router.get('/dashboard', protect, authorize('investor'), async (req, res) => {
  try {
    const investorId = req.user._id;

    // Get contracts where user has invested
    const investedContracts = await Contract.find({
      'investments.investorId': investorId
    }).populate('farmerId', 'username profile');

    // Calculate statistics
    let totalInvested = 0;
    let totalUnits = 0;
    let activeInvestments = 0;
    let completedInvestments = 0;

    const investments = investedContracts.map(contract => {
      const userInvestment = contract.investments.find(
        inv => inv.investorId.toString() === investorId.toString()
      );

      totalInvested += userInvestment.totalAmount;
      totalUnits += userInvestment.unitsBought;

      if (contract.status === 'active') activeInvestments++;
      if (contract.status === 'completed') completedInvestments++;

      return {
        contract: {
          _id: contract._id,
          contractName: contract.contractName,
          cropType: contract.cropType,
          status: contract.status,
          unitPrice: contract.unitPrice,
          expectedROI: contract.expectedROI,
          farmer: contract.farmerId
        },
        investment: userInvestment
      };
    });

    // Get available contracts for investment
    const availableContracts = await Contract.find({
      status: { $in: ['approved', 'active'] },
      unitsLeft: { $gt: 0 }
    }).populate('farmerId', 'username profile')
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        investor: req.user,
        statistics: {
          totalInvested,
          totalUnits,
          activeInvestments,
          completedInvestments,
          totalInvestments: investments.length
        },
        myInvestments: investments,
        availableContracts
      }
    });

  } catch (error) {
    console.error('Investor dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
});

/**
 * @swagger
 * /api/investors/investments:
 *   get:
 *     summary: Get investor's investments
 *     tags: [Investors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Investments retrieved successfully
 */
router.get('/investments', protect, authorize('investor'), async (req, res) => {
  try {
    const contracts = await Contract.find({
      'investments.investorId': req.user._id
    }).populate('farmerId', 'username profile');

    const investments = contracts.map(contract => {
      const userInvestment = contract.investments.find(
        inv => inv.investorId.toString() === req.user._id.toString()
      );

      return {
        contract: {
          _id: contract._id,
          contractName: contract.contractName,
          cropType: contract.cropType,
          status: contract.status,
          unitPrice: contract.unitPrice,
          expectedROI: contract.expectedROI,
          duration: contract.duration,
          farmer: contract.farmerId,
          startDate: contract.startDate,
          endDate: contract.endDate,
          landDetails: contract.landDetails
        },
        investment: userInvestment
      };
    });

    res.status(200).json({
      success: true,
      count: investments.length,
      data: investments
    });

  } catch (error) {
    console.error('Get investor investments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching investments'
    });
  }
});

/**
 * @swagger
 * /api/investors/available-contracts:
 *   get:
 *     summary: Get available contracts for investment
 *     tags: [Investors]
 *     responses:
 *       200:
 *         description: Available contracts retrieved successfully
 */
router.get('/available-contracts', async (req, res) => {
  try {
    const {
      cropType,
      riskLevel,
      state,
      minROI,
      maxPrice,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      limit = 20
    } = req.query;

    // Build filter
    const filter = {
      status: { $in: ['approved', 'active'] },
      unitsLeft: { $gt: 0 }
    };

    if (cropType) filter.cropType = new RegExp(cropType, 'i');
    if (riskLevel) filter.riskLevel = riskLevel;
    if (state) filter['landDetails.location.state'] = new RegExp(state, 'i');
    if (minROI) filter.expectedROI = { $gte: Number(minROI) };
    if (maxPrice) filter.unitPrice = { $lte: Number(maxPrice) };

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const contracts = await Contract.find(filter)
      .populate('farmerId', 'username profile verification')
      .sort(sort)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts
    });

  } catch (error) {
    console.error('Get available contracts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching available contracts'
    });
  }
});

module.exports = router;
