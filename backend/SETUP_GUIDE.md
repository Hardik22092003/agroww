# 🚀 Agroww Backend Setup Guide

## Current Status: ✅ Ready for Development

Your `.env` file is now configured with working demo credentials for immediate testing.

## Quick Start (Current Setup)
1. Backend server should start successfully with current demo MongoDB
2. All authentication features will work
3. File uploads are disabled (optional for testing)
4. Email notifications are disabled (optional for testing)

## For Production Setup - Replace These:

### 1. MongoDB Atlas (Database)
- Go to https://www.mongodb.com/cloud/atlas
- Create free account and cluster
- Replace MONGODB_URI with your connection string
- Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/agroww`

### 2. JWT Secrets (Security)
- Generate strong random strings (32+ characters)
- Keep them secret and unique

### 3. Email Configuration (Optional)
- Use Gmail with App Password
- Enable 2FA on Gmail, then generate App Password
- Replace EMAIL_USER and EMAIL_PASS

### 4. Cloudinary (Image Uploads - Optional)
- Go to https://cloudinary.com (free tier available)
- Get your cloud name, API key, and secret
- Replace CLOUDINARY_* variables

## Environment Variables Explained:

**Essential (Must Configure):**
- MONGODB_URI: Database connection
- JWT_SECRET: Token encryption
- PORT: Server port (5000)

**Optional (For Full Features):**
- EMAIL_*: For password reset/notifications
- CLOUDINARY_*: For image uploads
- ADMIN_*: Default admin credentials

## Testing Your Setup:

1. Start backend: `npm run dev`
2. Test health: http://localhost:5000/health
3. Test API: http://localhost:5000/api

## Current Demo Limitations:
- Database is shared (demo only)
- No email functionality
- No image uploads
- For portfolio/testing only

## Next Steps:
1. Test with current demo setup
2. Create your own MongoDB Atlas cluster
3. Add email/image upload when needed
4. Deploy to production platform

Your application is ready to run! 🎉
