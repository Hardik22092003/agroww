const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const checkAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@agroww.com' });
    
    if (adminUser) {
      console.log('✅ Admin user found:');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Username:', adminUser.username);
      console.log('IsActive:', adminUser.isActive);
      console.log('IsVerified:', adminUser.isVerified);
      
      // Test password
      const isPasswordCorrect = await adminUser.comparePassword('AdminSecure123!');
      console.log('Password Test:', isPasswordCorrect ? '✅ Correct' : '❌ Incorrect');
    } else {
      console.log('❌ Admin user not found');
    }

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

checkAdmin();
