const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/jpg,application/pdf').split(',');
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and PDF files are allowed.'), false);
    }
  }
});

/**
 * @swagger
 * /api/upload/document:
 *   post:
 *     summary: Upload document (for verification)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *               documentType:
 *                 type: string
 *                 enum: [aadhar, pan, bank_statement, land_document, farmer_id]
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid file or missing parameters
 */
router.post('/document', protect, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { documentType } = req.body;

    if (!documentType || !['aadhar', 'pan', 'bank_statement', 'land_document', 'farmer_id'].includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: 'Valid document type is required'
      });
    }

    // In a real application, you would upload to cloud storage (Cloudinary, AWS S3, etc.)
    // For now, we'll simulate a successful upload
    const mockUrl = `https://agroww-storage.com/documents/${req.user._id}/${documentType}-${Date.now()}.${req.file.originalname.split('.').pop()}`;

    // Add document to user's verification documents
    const documentData = {
      type: documentType,
      url: mockUrl,
      uploadedAt: new Date(),
      status: 'pending'
    };

    // Remove existing document of same type if exists
    req.user.verification.documents = req.user.verification.documents.filter(
      doc => doc.type !== documentType
    );

    // Add new document
    req.user.verification.documents.push(documentData);
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        documentType,
        url: mockUrl,
        status: 'pending'
      }
    });

  } catch (error) {
    console.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading document'
    });
  }
});

/**
 * @swagger
 * /api/upload/avatar:
 *   post:
 *     summary: Upload profile avatar
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 */
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    // Check if file is an image
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file'
      });
    }

    // Simulate cloud upload
    const avatarUrl = `https://agroww-storage.com/avatars/${req.user._id}/avatar-${Date.now()}.${req.file.originalname.split('.').pop()}`;

    // Update user's avatar
    req.user.profile.avatar = avatarUrl;
    await req.user.save();

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      data: {
        avatarUrl
      }
    });

  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading avatar'
    });
  }
});

/**
 * @swagger
 * /api/upload/contract-documents:
 *   post:
 *     summary: Upload contract-related documents
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               documentTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [land_registry, soil_certificate, survey_number, water_rights]
 *     responses:
 *       200:
 *         description: Documents uploaded successfully
 */
router.post('/contract-documents', protect, upload.array('documents', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const { documentTypes } = req.body;
    const parsedDocumentTypes = Array.isArray(documentTypes) ? documentTypes : JSON.parse(documentTypes || '[]');

    if (req.files.length !== parsedDocumentTypes.length) {
      return res.status(400).json({
        success: false,
        message: 'Number of files must match number of document types'
      });
    }

    const uploadedDocuments = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const docType = parsedDocumentTypes[i];

      if (!['land_registry', 'soil_certificate', 'survey_number', 'water_rights'].includes(docType)) {
        return res.status(400).json({
          success: false,
          message: `Invalid document type: ${docType}`
        });
      }

      // Simulate cloud upload
      const documentUrl = `https://agroww-storage.com/contracts/${req.user._id}/${docType}-${Date.now()}.${file.originalname.split('.').pop()}`;

      uploadedDocuments.push({
        type: docType,
        url: documentUrl,
        uploadedAt: new Date()
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contract documents uploaded successfully',
      data: uploadedDocuments
    });

  } catch (error) {
    console.error('Upload contract documents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while uploading documents'
    });
  }
});

module.exports = router;
