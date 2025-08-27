# Agroww Backend API 🌱

A robust Node.js/Express backend for the Agroww agricultural investment platform. Built with MongoDB, JWT authentication, comprehensive API documentation, and production-ready features.

## 🚀 Features

### Core Features
- **Multi-role Authentication** (Farmers, Investors, Admins)
- **Contract Management** (Create, invest, track contracts)
- **User Verification System** (Document upload & admin approval)
- **Investment Tracking** (Portfolio management for investors)
- **Admin Dashboard** (User management & contract approval)

### Technical Features
- **JWT Authentication** with refresh tokens
- **Role-based Access Control** (RBAC)
- **File Upload Support** (Documents & avatars)
- **Input Validation** with express-validator
- **API Rate Limiting** for security
- **Comprehensive Error Handling**
- **MongoDB with Mongoose ODM**
- **Swagger API Documentation**
- **Security Middleware** (Helmet, CORS, XSS protection)

## 🛠️ Tech Stack

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **File Upload**: Multer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, XSS-Clean, Rate Limiting
- **Environment**: dotenv

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running locally OR MongoDB Atlas account
- Git

### 1. Clone & Navigate
\`\`\`bash
git clone https://github.com/your-username/agroww.git
cd agroww/backend
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Setup
\`\`\`bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your configurations
\`\`\`

Required environment variables:
\`\`\`env
# Database
MONGODB_URI=mongodb://localhost:27017/agroww

# Server
PORT=5000
NODE_ENV=development

# JWT Secrets (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-refresh-token-secret-change-this

# Admin Credentials
ADMIN_EMAIL=admin@agroww.com
ADMIN_PASSWORD=AdminSecure123!

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
\`\`\`

### 4. Database Setup
\`\`\`bash
# Seed database with sample data
npm run seed
\`\`\`

### 5. Start Development Server
\`\`\`bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
\`\`\`

## 🎯 API Endpoints

### Base URL
- **Development**: \`http://localhost:5000/api\`
- **Documentation**: \`http://localhost:5000/api-docs\`

### Authentication Endpoints
\`\`\`
POST   /api/auth/register      # User registration
POST   /api/auth/login         # User login
POST   /api/auth/refresh       # Refresh access token
POST   /api/auth/logout        # User logout
GET    /api/auth/me            # Get current user
PUT    /api/auth/change-password # Change password
\`\`\`

### Contract Endpoints
\`\`\`
GET    /api/contracts          # Get all contracts (with filters)
GET    /api/contracts/:id      # Get contract by ID
POST   /api/contracts          # Create contract (farmers only)
PUT    /api/contracts/:id      # Update contract (farmer only)
DELETE /api/contracts/:id      # Delete contract (farmer only)
POST   /api/contracts/:id/invest # Invest in contract (investors only)
\`\`\`

### User Management
\`\`\`
GET    /api/users/profile      # Get user profile
PUT    /api/users/profile      # Update user profile
\`\`\`

### Farmer Endpoints
\`\`\`
GET    /api/farmers/dashboard  # Farmer dashboard data
GET    /api/farmers/contracts  # Farmer's contracts
\`\`\`

### Investor Endpoints
\`\`\`
GET    /api/investors/dashboard         # Investor dashboard
GET    /api/investors/investments       # User's investments
GET    /api/investors/available-contracts # Available contracts
\`\`\`

### Admin Endpoints
\`\`\`
GET    /api/admin/dashboard     # Admin dashboard statistics
GET    /api/admin/users         # All users (with filters)
PUT    /api/admin/users/:id/verify # Verify/reject user
GET    /api/admin/contracts     # All contracts for review
PUT    /api/admin/contracts/:id/approve # Approve/reject contract
\`\`\`

### File Upload
\`\`\`
POST   /api/upload/document     # Upload verification documents
POST   /api/upload/avatar       # Upload profile picture
POST   /api/upload/contract-documents # Upload contract documents
\`\`\`

## 👤 Sample User Accounts

After running \`npm run seed\`, you can use these accounts:

### Admin
- **Email**: admin@agroww.com
- **Password**: AdminSecure123!

### Farmer
- **Email**: ravi.sharma@example.com
- **Password**: password123

### Investor
- **Email**: sneha.joshi@example.com
- **Password**: password123

## 📊 Data Models

### User Model
\`\`\`javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: ['farmer', 'investor', 'admin'],
  profile: {
    firstName, lastName, phone, address, avatar
  },
  verification: {
    status, documents, verifiedBy, verifiedAt
  }
}
\`\`\`

### Contract Model
\`\`\`javascript
{
  contractName: String,
  farmerId: ObjectId,
  landDetails: {
    area, location, soilType, irrigationType, documents
  },
  cropType: String,
  totalUnits: Number,
  unitPrice: Number,
  expectedROI: Number,
  duration: Number,
  riskLevel: ['low', 'medium', 'high'],
  status: ['draft', 'pending_approval', 'approved', 'active', 'completed'],
  investments: [
    {
      investorId, unitsBought, totalAmount, investmentDate
    }
  ]
}
\`\`\`

## 🔐 Authentication Flow

1. **Registration**: User registers with email/password
2. **Login**: Returns access token (7 days) + refresh token (30 days)
3. **Protected Routes**: Include \`Authorization: Bearer <token>\` header
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Clears refresh token from database

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Access & refresh token pattern
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs validated and sanitized
- **XSS Protection**: Prevents cross-site scripting
- **NoSQL Injection Protection**: MongoDB sanitization
- **CORS**: Configured for specific origins
- **Helmet**: Security headers

## 📝 API Documentation

Interactive API documentation available at:
- **Local**: \`http://localhost:5000/api-docs\`
- **Swagger UI**: Complete endpoint documentation with examples

## 🧪 Testing

\`\`\`bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 🚀 Production Deployment

### Environment Variables for Production
\`\`\`env
NODE_ENV=production
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/agroww
JWT_SECRET=your-production-secret-key
FRONTEND_URL_PROD=https://your-domain.com
\`\`\`

### Docker Deployment
\`\`\`bash
# Build Docker image
docker build -t agroww-backend .

# Run container
docker run -p 5000:5000 --env-file .env agroww-backend
\`\`\`

### Cloud Deployment Options
- **Heroku**: Ready for Heroku deployment
- **AWS**: Can be deployed on EC2, Lambda, or ECS
- **DigitalOcean**: App Platform compatible
- **Railway**: One-click deployment

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

## 📋 Development Guidelines

- Follow REST API conventions
- Use async/await for asynchronous code
- Implement proper error handling
- Add JSDoc comments for functions
- Validate all inputs
- Write tests for new features

## 🎯 Future Enhancements

- [ ] Email notifications (Nodemailer)
- [ ] SMS notifications (Twilio)
- [ ] Payment gateway integration
- [ ] Real-time notifications (Socket.io)
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app API support
- [ ] Blockchain integration for transparency

## 📞 Support

- **Email**: support@agroww.com
- **Documentation**: [API Docs](http://localhost:5000/api-docs)
- **Issues**: [GitHub Issues](https://github.com/your-username/agroww/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for Indian Agriculture** 🇮🇳
