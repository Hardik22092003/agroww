const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const fixAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@agroww.com' });
    
    if (adminUser) {
      console.log('📝 Updating admin user...');
      
      // Update admin user properties
      adminUser.password = 'AdminSecure123!'; // This will trigger the pre-save hash
      adminUser.isActive = true;
      adminUser.isVerified = true;
      adminUser.role = 'admin';
      
      // Save the user (this will trigger password hashing)
      await adminUser.save();
      
      console.log('✅ Admin user updated successfully');
      
      // Test the login again
      const updatedAdmin = await User.findOne({ email: 'admin@agroww.com' }).select('+password');
      const isPasswordCorrect = await updatedAdmin.comparePassword('AdminSecure123!');
      console.log('Password Test:', isPasswordCorrect ? '✅ Correct' : '❌ Still Incorrect');
      
    } else {
      console.log('❌ Admin user not found');
    }

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

fixAdmin();
