const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Generate refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

// @route   GET /auth/google
// @desc    Authenticate with Google
// @access  Public
router.get('/google', (req, res, next) => {
  // Get intended role from query parameter
  const intendedRole = req.query.role;
  if (intendedRole && ['farmer', 'investor'].includes(intendedRole)) {
    req.session.intendedRole = intendedRole;
  }
  
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
});

// @route   GET /auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const intendedRole = req.session.intendedRole;
      
      // If user role is pending and we have an intended role, set it
      if (user.role === 'pending' && intendedRole) {
        user.role = intendedRole;
        await user.save();
      }
      
      // If user role is still pending, redirect to role selection
      if (user.role === 'pending') {
        const tempToken = jwt.sign(
          { id: user._id, tempAuth: true },
          process.env.JWT_SECRET,
          { expiresIn: '10m' }
        );
        return res.redirect(`${process.env.FRONTEND_URL}/select-role?token=${tempToken}`);
      }
      
      // Generate tokens
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      
      // Update user's refresh token
      user.refreshToken = refreshToken;
      await user.save();
      
      // Clear intended role from session
      delete req.session.intendedRole;
      
      // Redirect to appropriate dashboard based on user role
      const dashboardUrl = user.role === 'farmer' 
        ? `${process.env.FRONTEND_URL}/farmer/dashboard`
        : `${process.env.FRONTEND_URL}/investor/dashboard`;
      
      res.redirect(`${dashboardUrl}?token=${token}&refreshToken=${refreshToken}`);
    } catch (error) {
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }
  }
);

// @route   GET /auth/github
// @desc    Authenticate with GitHub
// @access  Public
router.get('/github', (req, res, next) => {
  // Get intended role from query parameter
  const intendedRole = req.query.role;
  if (intendedRole && ['farmer', 'investor'].includes(intendedRole)) {
    req.session.intendedRole = intendedRole;
  }
  
  passport.authenticate('github', { 
    scope: ['user:email'] 
  })(req, res, next);
});

// @route   GET /auth/github/callback
// @desc    GitHub OAuth callback
// @access  Public
router.get('/github/callback',
  passport.authenticate('github', { session: false }),
  async (req, res) => {
    try {
      const user = req.user;
      const intendedRole = req.session.intendedRole;
      
      // If user role is pending and we have an intended role, set it
      if (user.role === 'pending' && intendedRole) {
        user.role = intendedRole;
        await user.save();
      }
      
      // If user role is still pending, redirect to role selection
      if (user.role === 'pending') {
        const tempToken = jwt.sign(
          { id: user._id, tempAuth: true },
          process.env.JWT_SECRET,
          { expiresIn: '10m' }
        );
        return res.redirect(`${process.env.FRONTEND_URL}/select-role?token=${tempToken}`);
      }
      
      // Generate tokens
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      
      // Update user's refresh token
      user.refreshToken = refreshToken;
      await user.save();
      
      // Clear intended role from session
      delete req.session.intendedRole;
      
      // Redirect to appropriate dashboard based on user role
      const dashboardUrl = user.role === 'farmer' 
        ? `${process.env.FRONTEND_URL}/farmer/dashboard`
        : `${process.env.FRONTEND_URL}/investor/dashboard`;
      
      res.redirect(`${dashboardUrl}?token=${token}&refreshToken=${refreshToken}`);
    } catch (error) {
      console.error('GitHub OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }
  }
);

// @route   POST /auth/select-role
// @desc    Set user role after OAuth
// @access  Private (temp token)
router.post('/select-role', async (req, res) => {
  try {
    const { token, role } = req.body;
    
    if (!token || !role) {
      return res.status(400).json({
        success: false,
        message: 'Token and role are required'
      });
    }
    
    if (!['farmer', 'investor'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be farmer or investor'
      });
    }
    
    // Verify temporary token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.tempAuth) {
      return res.status(401).json({
        success: false,
        message: 'Invalid temporary token'
      });
    }
    
    // Update user role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.role = role;
    await user.save();
    
    // Generate final tokens
    const finalToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Update user's refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Role selected successfully',
      data: {
        token: finalToken,
        refreshToken: refreshToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture
        }
      }
    });
  } catch (error) {
    console.error('Role selection error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to select role'
    });
  }
});

// @route   GET /auth/success
// @desc    OAuth success handler
// @access  Public
router.get('/success', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'OAuth authentication successful'
  });
});

module.exports = router;
