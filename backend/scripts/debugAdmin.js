const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const debugAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find admin user with password
    const adminUser = await User.findOne({ email: 'admin@agroww.com' }).select('+password');
    
    if (adminUser) {
      console.log('📝 Admin user details:');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Username:', adminUser.username);
      console.log('IsActive:', adminUser.isActive);
      console.log('IsVerified:', adminUser.isVerified);
      console.log('Password exists:', !!adminUser.password);
      console.log('Password length:', adminUser.password ? adminUser.password.length : 0);
      
      // Test manual bcrypt comparison
      const testPassword = 'AdminSecure123!';
      console.log('\n🧪 Testing password comparison:');
      console.log('Test password:', testPassword);
      
      // Direct bcrypt comparison
      if (adminUser.password) {
        const directCompare = await bcrypt.compare(testPassword, adminUser.password);
        console.log('Direct bcrypt.compare:', directCompare ? '✅ Success' : '❌ Failed');
      }
      
      // Model method comparison
      const modelCompare = await adminUser.comparePassword(testPassword);
      console.log('Model comparePassword:', modelCompare ? '✅ Success' : '❌ Failed');
      
      // Try to manually hash and compare
      console.log('\n🔧 Manual hash test:');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(testPassword, salt);
      console.log('New hash created, length:', hashedPassword.length);
      
      const manualTest = await bcrypt.compare(testPassword, hashedPassword);
      console.log('Manual hash test:', manualTest ? '✅ Success' : '❌ Failed');
      
    } else {
      console.log('❌ Admin user not found');
    }

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
  }
};

debugAdmin();
