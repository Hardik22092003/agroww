const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Contract = require('../models/Contract');
const User = require('../models/User');
const { protect, authorize, requireVerification } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/contracts:
 *   get:
 *     summary: Get all contracts (with filters)
 *     tags: [Contracts]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, pending_approval, approved, active, completed, cancelled]
 *         description: Filter by contract status
 *       - in: query
 *         name: cropType
 *         schema:
 *           type: string
 *         description: Filter by crop type
 *       - in: query
 *         name: riskLevel
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filter by risk level
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filter by state
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum unit price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum unit price
 *       - in: query
 *         name: minROI
 *         schema:
 *           type: number
 *         description: Minimum expected ROI
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, unitPrice, expectedROI, duration]
 *         description: Sort field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Number of contracts per page
 *     responses:
 *       200:
 *         description: List of contracts retrieved successfully
 */
router.get('/', async (req, res) => {
  try {
    const {
      status,
      cropType,
      riskLevel,
      state,
      city,
      minPrice,
      maxPrice,
      minROI,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;
    if (cropType) filter.cropType = new RegExp(cropType, 'i');
    if (riskLevel) filter.riskLevel = riskLevel;
    if (state) filter['landDetails.location.state'] = new RegExp(state, 'i');
    if (city) filter['landDetails.location.city'] = new RegExp(city, 'i');
    
    if (minPrice || maxPrice) {
      filter.unitPrice = {};
      if (minPrice) filter.unitPrice.$gte = Number(minPrice);
      if (maxPrice) filter.unitPrice.$lte = Number(maxPrice);
    }
    
    if (minROI) filter.expectedROI = { $gte: Number(minROI) };

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const contracts = await Contract.find(filter)
      .populate('farmerId', 'username profile.firstName profile.lastName')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
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
 * /api/contracts/{id}:
 *   get:
 *     summary: Get contract by ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract retrieved successfully
 *       404:
 *         description: Contract not found
 */
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('farmerId', 'username profile verification')
      .populate('investments.investorId', 'username profile');

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    res.status(200).json({
      success: true,
      data: contract
    });

  } catch (error) {
    console.error('Get contract error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching contract'
    });
  }
});

/**
 * @swagger
 * /api/contracts:
 *   post:
 *     summary: Create a new contract (farmers only)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contractName
 *               - landDetails
 *               - cropType
 *               - totalUnits
 *               - unitPrice
 *               - expectedROI
 *               - duration
 *               - riskLevel
 *             properties:
 *               contractName:
 *                 type: string
 *               landDetails:
 *                 type: object
 *               cropType:
 *                 type: string
 *               totalUnits:
 *                 type: number
 *               unitPrice:
 *                 type: number
 *               expectedROI:
 *                 type: number
 *               duration:
 *                 type: number
 *               riskLevel:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Contract created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Access denied
 */
router.post('/', protect, authorize('farmer'), requireVerification, [
  body('contractName')
    .notEmpty()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Contract name is required and must be less than 100 characters'),
  body('landDetails.area')
    .isFloat({ min: 0.1 })
    .withMessage('Land area must be at least 0.1 acres'),
  body('landDetails.location.address')
    .notEmpty()
    .withMessage('Land address is required'),
  body('landDetails.location.city')
    .notEmpty()
    .withMessage('City is required'),
  body('landDetails.location.state')
    .notEmpty()
    .withMessage('State is required'),
  body('landDetails.location.pincode')
    .matches(/^\d{6}$/)
    .withMessage('Please provide a valid 6-digit pincode'),
  body('landDetails.soilType')
    .isIn(['alluvial', 'black', 'red', 'laterite', 'desert', 'mountain'])
    .withMessage('Please provide a valid soil type'),
  body('landDetails.irrigationType')
    .isIn(['drip', 'sprinkler', 'flood', 'rainfed'])
    .withMessage('Please provide a valid irrigation type'),
  body('cropType')
    .notEmpty()
    .trim()
    .withMessage('Crop type is required'),
  body('totalUnits')
    .isInt({ min: 1 })
    .withMessage('Total units must be at least 1'),
  body('unitPrice')
    .isFloat({ min: 100 })
    .withMessage('Unit price must be at least ₹100'),
  body('expectedROI')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Expected ROI must be between 0 and 100%'),
  body('duration')
    .isInt({ min: 1, max: 60 })
    .withMessage('Duration must be between 1 and 60 months'),
  body('riskLevel')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Risk level must be low, medium, or high')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contractData = {
      ...req.body,
      farmerId: req.user._id,
      farmerName: req.user.fullName || req.user.username
    };

    const contract = await Contract.create(contractData);

    // Populate farmer details
    await contract.populate('farmerId', 'username profile');

    res.status(201).json({
      success: true,
      message: 'Contract created successfully',
      data: contract
    });

  } catch (error) {
    console.error('Create contract error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating contract'
    });
  }
});

/**
 * @swagger
 * /api/contracts/{id}/invest:
 *   post:
 *     summary: Invest in a contract (investors only)
 *     tags: [Contracts]
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
 *               - unitsBought
 *             properties:
 *               unitsBought:
 *                 type: number
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Investment successful
 *       400:
 *         description: Invalid investment or insufficient units
 *       404:
 *         description: Contract not found
 */
router.post('/:id/invest', protect, authorize('investor'), requireVerification, [
  body('unitsBought')
    .isInt({ min: 1 })
    .withMessage('Units bought must be at least 1')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { unitsBought } = req.body;
    const contractId = req.params.id;

    // Find contract
    const contract = await Contract.findById(contractId);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    // Check if contract is available for investment
    if (contract.status !== 'approved' && contract.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Contract is not available for investment'
      });
    }

    // Check if enough units are available
    if (unitsBought > contract.unitsLeft) {
      return res.status(400).json({
        success: false,
        message: `Only ${contract.unitsLeft} units available`
      });
    }

    // Check if user has already invested (optional - you can allow multiple investments)
    const existingInvestment = contract.investments.find(
      inv => inv.investorId.toString() === req.user._id.toString()
    );

    if (existingInvestment) {
      // Update existing investment
      existingInvestment.unitsBought += unitsBought;
      existingInvestment.totalAmount += unitsBought * contract.unitPrice;
    } else {
      // Create new investment
      const investment = {
        investorId: req.user._id,
        investorName: req.user.fullName || req.user.username,
        unitsBought,
        totalAmount: unitsBought * contract.unitPrice
      };
      contract.investments.push(investment);
    }

    // Update contract status to active if it's the first investment
    if (contract.status === 'approved') {
      contract.status = 'active';
    }

    await contract.save();

    res.status(200).json({
      success: true,
      message: 'Investment successful',
      data: {
        contract: contract._id,
        unitsBought,
        totalAmount: unitsBought * contract.unitPrice,
        remainingUnits: contract.unitsLeft
      }
    });

  } catch (error) {
    console.error('Investment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing investment'
    });
  }
});

/**
 * @swagger
 * /api/contracts/{id}:
 *   put:
 *     summary: Update contract (farmer only, own contracts)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract updated successfully
 *       403:
 *         description: Not authorized to update this contract
 *       404:
 *         description: Contract not found
 */
router.put('/:id', protect, authorize('farmer'), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    // Check if user owns this contract
    if (contract.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this contract'
      });
    }

    // Don't allow updates if contract has investments
    if (contract.investments.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update contract with existing investments'
      });
    }

    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('farmerId', 'username profile');

    res.status(200).json({
      success: true,
      message: 'Contract updated successfully',
      data: updatedContract
    });

  } catch (error) {
    console.error('Update contract error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating contract'
    });
  }
});

/**
 * @swagger
 * /api/contracts/{id}:
 *   delete:
 *     summary: Delete contract (farmer only, own contracts)
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contract ID
 *     responses:
 *       200:
 *         description: Contract deleted successfully
 *       403:
 *         description: Not authorized to delete this contract
 *       404:
 *         description: Contract not found
 */
router.delete('/:id', protect, authorize('farmer'), async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found'
      });
    }

    // Check if user owns this contract
    if (contract.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this contract'
      });
    }

    // Don't allow deletion if contract has investments
    if (contract.investments.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete contract with existing investments'
      });
    }

    await Contract.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contract deleted successfully'
    });

  } catch (error) {
    console.error('Delete contract error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting contract'
    });
  }
});

/**
 * @swagger
 * /api/contracts/farmer/{farmerId}:
 *   get:
 *     summary: Get contracts by farmer ID
 *     tags: [Contracts]
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Farmer ID
 *     responses:
 *       200:
 *         description: Farmer contracts retrieved successfully
 */
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const contracts = await Contract.find({ farmerId: req.params.farmerId })
      .populate('farmerId', 'username profile')
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
      message: 'Server error while fetching farmer contracts'
    });
  }
});

/**
 * @swagger
 * /api/contracts/investor/my-investments:
 *   get:
 *     summary: Get current user's investments
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User investments retrieved successfully
 */
router.get('/investor/my-investments', protect, authorize('investor'), async (req, res) => {
  try {
    const contracts = await Contract.find({
      'investments.investorId': req.user._id
    }).populate('farmerId', 'username profile');

    // Filter and format the data to show only user's investments
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
          endDate: contract.endDate
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
    console.error('Get user investments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching investments'
    });
  }
});

module.exports = router;
