const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       required:
 *         - contractName
 *         - farmerId
 *         - landDetails
 *         - cropType
 *         - totalUnits
 *         - unitPrice
 *         - expectedROI
 *         - duration
 *       properties:
 *         contractName:
 *           type: string
 *           description: Name/title of the farming contract
 *         farmerId:
 *           type: string
 *           description: ID of the farmer creating the contract
 *         landDetails:
 *           type: object
 *           properties:
 *             area:
 *               type: number
 *               description: Land area in acres
 *             location:
 *               type: object
 *               properties:
 *                 address:
 *                   type: string
 *                 city:
 *                   type: string
 *                 state:
 *                   type: string
 *                 pincode:
 *                   type: string
 *                 coordinates:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *             soilType:
 *               type: string
 *               enum: [alluvial, black, red, laterite, desert, mountain]
 *             irrigationType:
 *               type: string
 *               enum: [drip, sprinkler, flood, rainfed]
 *             documents:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [land_registry, soil_certificate, survey_number]
 *                   url:
 *                     type: string
 *         cropType:
 *           type: string
 *           description: Type of crop to be grown
 *         totalUnits:
 *           type: number
 *           description: Total investment units available
 *         unitPrice:
 *           type: number
 *           description: Price per investment unit in INR
 *         unitsLeft:
 *           type: number
 *           description: Remaining units available for investment
 *         unitsSold:
 *           type: number
 *           description: Units already sold to investors
 *         expectedROI:
 *           type: number
 *           description: Expected Return on Investment percentage
 *         duration:
 *           type: number
 *           description: Contract duration in months
 *         riskLevel:
 *           type: string
 *           enum: [low, medium, high]
 *         status:
 *           type: string
 *           enum: [draft, pending_approval, approved, active, completed, cancelled]
 *         investments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               investorId:
 *                 type: string
 *               unitsBought:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               investmentDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, completed, withdrawn]
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const contractSchema = new mongoose.Schema({
  contractName: {
    type: String,
    required: [true, 'Contract name is required'],
    trim: true,
    maxlength: [100, 'Contract name cannot exceed 100 characters']
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Farmer ID is required']
  },
  farmerName: {
    type: String,
    required: true
  },
  landDetails: {
    area: {
      type: Number,
      required: [true, 'Land area is required'],
      min: [0.1, 'Land area must be at least 0.1 acres']
    },
    location: {
      address: {
        type: String,
        required: [true, 'Land address is required']
      },
      city: {
        type: String,
        required: [true, 'City is required']
      },
      state: {
        type: String,
        required: [true, 'State is required']
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        match: [/^\d{6}$/, 'Please provide a valid 6-digit pincode']
      },
      coordinates: {
        latitude: {
          type: Number,
          min: [-90, 'Invalid latitude'],
          max: [90, 'Invalid latitude']
        },
        longitude: {
          type: Number,
          min: [-180, 'Invalid longitude'],
          max: [180, 'Invalid longitude']
        }
      }
    },
    soilType: {
      type: String,
      enum: ['alluvial', 'black', 'red', 'laterite', 'desert', 'mountain'],
      required: [true, 'Soil type is required']
    },
    irrigationType: {
      type: String,
      enum: ['drip', 'sprinkler', 'flood', 'rainfed'],
      required: [true, 'Irrigation type is required']
    },
    documents: [{
      type: {
        type: String,
        enum: ['land_registry', 'soil_certificate', 'survey_number', 'water_rights'],
        required: true
      },
      url: {
        type: String,
        required: true
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    trim: true
  },
  cropDetails: {
    variety: String,
    seedSource: String,
    expectedYield: Number, // kg per acre
    marketPrice: Number, // per kg
    harvestSeason: {
      type: String,
      enum: ['kharif', 'rabi', 'summer']
    }
  },
  totalUnits: {
    type: Number,
    required: [true, 'Total units is required'],
    min: [1, 'Total units must be at least 1']
  },
  unitPrice: {
    type: Number,
    required: [true, 'Unit price is required'],
    min: [100, 'Unit price must be at least ₹100']
  },
  unitsLeft: {
    type: Number,
    default: function() {
      return this.totalUnits;
    }
  },
  unitsSold: {
    type: Number,
    default: 0
  },
  expectedROI: {
    type: Number,
    required: [true, 'Expected ROI is required'],
    min: [0, 'ROI cannot be negative'],
    max: [100, 'ROI cannot exceed 100%']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 month'],
    max: [60, 'Duration cannot exceed 60 months']
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: [true, 'Risk level is required']
  },
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'approved', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  investments: [{
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    investorName: {
      type: String,
      required: true
    },
    unitsBought: {
      type: Number,
      required: true,
      min: [1, 'Must buy at least 1 unit']
    },
    totalAmount: {
      type: Number,
      required: true
    },
    investmentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'withdrawn'],
      default: 'active'
    },
    returnAmount: {
      type: Number,
      default: 0
    },
    actualROI: {
      type: Number,
      default: 0
    }
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    default: function() {
      const start = this.startDate || new Date();
      return new Date(start.getTime() + (this.duration * 30 * 24 * 60 * 60 * 1000));
    }
  },
  actualProfit: {
    type: Number,
    default: 0
  },
  actualROI: {
    type: Number,
    default: 0
  },
  milestones: [{
    title: String,
    description: String,
    targetDate: Date,
    completedDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'delayed'],
      default: 'pending'
    },
    images: [String],
    notes: String
  }],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: Date,
  rejectionReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
contractSchema.index({ farmerId: 1 });
contractSchema.index({ status: 1 });
contractSchema.index({ cropType: 1 });
contractSchema.index({ riskLevel: 1 });
contractSchema.index({ 'landDetails.location.state': 1 });
contractSchema.index({ 'landDetails.location.city': 1 });
contractSchema.index({ unitPrice: 1 });
contractSchema.index({ expectedROI: 1 });

// Virtual for total investment amount
contractSchema.virtual('totalInvestment').get(function() {
  return this.totalUnits * this.unitPrice;
});

// Virtual for funding percentage
contractSchema.virtual('fundingPercentage').get(function() {
  return (this.unitsSold / this.totalUnits) * 100;
});

// Virtual for remaining amount needed
contractSchema.virtual('remainingAmount').get(function() {
  return this.unitsLeft * this.unitPrice;
});

// Pre-save middleware to update units
contractSchema.pre('save', function(next) {
  if (this.isModified('investments')) {
    this.unitsSold = this.investments.reduce((total, investment) => 
      total + investment.unitsBought, 0);
    this.unitsLeft = this.totalUnits - this.unitsSold;
  }
  next();
});

// Static method to find active contracts
contractSchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

// Static method to find contracts by location
contractSchema.statics.findByLocation = function(state, city) {
  const query = { 'landDetails.location.state': state };
  if (city) {
    query['landDetails.location.city'] = city;
  }
  return this.find(query);
};

// Static method to find contracts by crop type
contractSchema.statics.findByCrop = function(cropType) {
  return this.find({ cropType: new RegExp(cropType, 'i') });
};

// Instance method to add investment
contractSchema.methods.addInvestment = function(investorId, investorName, unitsBought) {
  if (unitsBought > this.unitsLeft) {
    throw new Error('Not enough units available');
  }

  const investment = {
    investorId,
    investorName,
    unitsBought,
    totalAmount: unitsBought * this.unitPrice
  };

  this.investments.push(investment);
  return this.save();
};

// Instance method to check if fully funded
contractSchema.methods.isFullyFunded = function() {
  return this.unitsLeft === 0;
};

module.exports = mongoose.model('Contract', contractSchema);
