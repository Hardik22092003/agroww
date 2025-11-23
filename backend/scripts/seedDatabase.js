const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Contract = require('../models/Contract');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agroww');
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  console.log('🌱 Seeding users...');

  // Create admin user
  const adminData = {
    username: 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@agroww.com',
    password: process.env.ADMIN_PASSWORD || 'AdminSecure123!',
    role: 'admin',
    profile: {
      firstName: 'Admin',
      lastName: 'User'
    },
    verification: {
      isEmailVerified: true,
      isPhoneVerified: true,
      isDocumentVerified: true,
      verificationStatus: 'verified'
    }
  };

  // Sample farmers
  const farmersData = [
    {
      username: 'farmer_ravi',
      email: 'ravi.sharma@example.com',
      password: 'password123',
      role: 'farmer',
      profile: {
        firstName: 'Ravi',
        lastName: 'Sharma',
        phone: '+91-9876543210',
        address: {
          street: 'Village Khudra',
          city: 'Ludhiana',
          state: 'Punjab',
          pincode: '141001',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'verified',
        isDocumentVerified: true
      }
    },
    {
      username: 'farmer_meena',
      email: 'meena.patel@example.com',
      password: 'password123',
      role: 'farmer',
      profile: {
        firstName: 'Meena',
        lastName: 'Patel',
        phone: '+91-9876543211',
        address: {
          street: 'Village Shirpur',
          city: 'Nashik',
          state: 'Maharashtra',
          pincode: '422001',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'verified',
        isDocumentVerified: true
      }
    },
    {
      username: 'farmer_ankit',
      email: 'ankit.verma@example.com',
      password: 'password123',
      role: 'farmer',
      profile: {
        firstName: 'Ankit',
        lastName: 'Verma',
        phone: '+91-9876543212',
        address: {
          street: 'Village Khandwa',
          city: 'Indore',
          state: 'Madhya Pradesh',
          pincode: '452001',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'pending'
      }
    }
  ];

  // Sample investors
  const investorsData = [
    {
      username: 'investor_sneha',
      email: 'sneha.joshi@example.com',
      password: 'password123',
      role: 'investor',
      profile: {
        firstName: 'Sneha',
        lastName: 'Joshi',
        phone: '+91-9876543213',
        address: {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'verified',
        isDocumentVerified: true
      }
    },
    {
      username: 'investor_rajesh',
      email: 'rajesh.kumar@example.com',
      password: 'password123',
      role: 'investor',
      profile: {
        firstName: 'Rajesh',
        lastName: 'Kumar',
        phone: '+91-9876543214',
        address: {
          city: 'Delhi',
          state: 'Delhi',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'verified',
        isDocumentVerified: true
      }
    },
    {
      username: 'investor_priya',
      email: 'priya.singh@example.com',
      password: 'password123',
      role: 'investor',
      profile: {
        firstName: 'Priya',
        lastName: 'Singh',
        phone: '+91-9876543215',
        address: {
          city: 'Bangalore',
          state: 'Karnataka',
          country: 'India'
        }
      },
      verification: {
        isEmailVerified: true,
        verificationStatus: 'pending'
      }
    }
  ];

  try {
    // Clear existing users
    await User.deleteMany({});

    // Create users
    const allUsers = [adminData, ...farmersData, ...investorsData];
    const createdUsers = await User.create(allUsers);

    console.log(`✅ Created ${createdUsers.length} users`);
    return createdUsers;

  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

const seedContracts = async (users) => {
  console.log('🌱 Seeding contracts...');

  const farmers = users.filter(user => user.role === 'farmer');
  const investors = users.filter(user => user.role === 'investor');

  const contractsData = [
    {
      contractName: 'Premium Wheat Farming - Punjab',
      farmerId: farmers[0]._id,
      farmerName: farmers[0].fullName,
      landDetails: {
        area: 5.5,
        location: {
          address: 'Village Khudra, Ludhiana',
          city: 'Ludhiana',
          state: 'Punjab',
          pincode: '141001',
          coordinates: {
            latitude: 30.9010,
            longitude: 75.8573
          }
        },
        soilType: 'alluvial',
        irrigationType: 'drip',
        documents: [
          {
            type: 'land_registry',
            url: 'https://agroww-storage.com/documents/land_registry_1.pdf'
          }
        ]
      },
      cropType: 'Wheat',
      cropDetails: {
        variety: 'HD-2967',
        expectedYield: 4500,
        marketPrice: 25,
        harvestSeason: 'rabi'
      },
      totalUnits: 100,
      unitPrice: 5000,
      unitsLeft: 80,
      unitsSold: 20,
      expectedROI: 15.5,
      duration: 6,
      riskLevel: 'low',
      status: 'active',
      investments: [
        {
          investorId: investors[0]._id,
          investorName: investors[0].fullName,
          unitsBought: 15,
          totalAmount: 75000,
          investmentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        },
        {
          investorId: investors[1]._id,
          investorName: investors[1].fullName,
          unitsBought: 5,
          totalAmount: 25000,
          investmentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        }
      ]
    },
    {
      contractName: 'Organic Cotton Farm - Maharashtra',
      farmerId: farmers[1]._id,
      farmerName: farmers[1].fullName,
      landDetails: {
        area: 8.0,
        location: {
          address: 'Village Shirpur, Nashik',
          city: 'Nashik',
          state: 'Maharashtra',
          pincode: '422001',
          coordinates: {
            latitude: 20.1809,
            longitude: 73.7785
          }
        },
        soilType: 'black',
        irrigationType: 'sprinkler',
        documents: [
          {
            type: 'land_registry',
            url: 'https://agroww-storage.com/documents/land_registry_2.pdf'
          }
        ]
      },
      cropType: 'Cotton',
      cropDetails: {
        variety: 'Bt Cotton',
        expectedYield: 600,
        marketPrice: 80,
        harvestSeason: 'kharif'
      },
      totalUnits: 160,
      unitPrice: 3200,
      unitsLeft: 130,
      unitsSold: 30,
      expectedROI: 18.2,
      duration: 8,
      riskLevel: 'medium',
      status: 'active',
      investments: [
        {
          investorId: investors[0]._id,
          investorName: investors[0].fullName,
          unitsBought: 20,
          totalAmount: 64000,
          investmentDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          investorId: investors[1]._id,
          investorName: investors[1].fullName,
          unitsBought: 10,
          totalAmount: 32000,
          investmentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        }
      ]
    },
    {
      contractName: 'Soybean Cultivation - MP',
      farmerId: farmers[2]._id,
      farmerName: farmers[2].fullName,
      landDetails: {
        area: 3.5,
        location: {
          address: 'Village Khandwa, Indore',
          city: 'Indore',
          state: 'Madhya Pradesh',
          pincode: '452001',
          coordinates: {
            latitude: 22.7196,
            longitude: 75.8577
          }
        },
        soilType: 'red',
        irrigationType: 'rainfed',
        documents: [
          {
            type: 'land_registry',
            url: 'https://agroww-storage.com/documents/land_registry_3.pdf'
          }
        ]
      },
      cropType: 'Soybean',
      cropDetails: {
        variety: 'JS-335',
        expectedYield: 1200,
        marketPrice: 45,
        harvestSeason: 'kharif'
      },
      totalUnits: 70,
      unitPrice: 4500,
      unitsLeft: 70,
      unitsSold: 0,
      expectedROI: 22.5,
      duration: 4,
      riskLevel: 'high',
      status: 'pending_approval',
      investments: []
    },
    {
      contractName: 'Basmati Rice Premium',
      farmerId: farmers[0]._id,
      farmerName: farmers[0].fullName,
      landDetails: {
        area: 7.2,
        location: {
          address: 'Village Khudra Extension, Ludhiana',
          city: 'Ludhiana',
          state: 'Punjab',
          pincode: '141001',
          coordinates: {
            latitude: 30.9010,
            longitude: 75.8573
          }
        },
        soilType: 'alluvial',
        irrigationType: 'flood',
        documents: [
          {
            type: 'land_registry',
            url: 'https://agroww-storage.com/documents/land_registry_4.pdf'
          }
        ]
      },
      cropType: 'Rice',
      cropDetails: {
        variety: 'Pusa Basmati 1121',
        expectedYield: 5000,
        marketPrice: 35,
        harvestSeason: 'kharif'
      },
      totalUnits: 120,
      unitPrice: 6000,
      unitsLeft: 120,
      unitsSold: 0,
      expectedROI: 20.0,
      duration: 5,
      riskLevel: 'low',
      status: 'approved',
      investments: []
    }
  ];

  try {
    // Clear existing contracts
    await Contract.deleteMany({});

    // Create contracts
    const createdContracts = await Contract.create(contractsData);

    console.log(`✅ Created ${createdContracts.length} contracts`);
    return createdContracts;

  } catch (error) {
    console.error('❌ Error seeding contracts:', error);
    throw error;
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();
    
    const users = await seedUsers();
    const contracts = await seedContracts(users);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`Created ${users.length} users and ${contracts.length} contracts`);
    
    // Display login credentials
    console.log('\n📝 Sample Login Credentials:');
    console.log('Admin: admin@agroww.com / AdminSecure123!');
    console.log('Farmer: ravi.sharma@example.com / password123');
    console.log('Investor: sneha.joshi@example.com / password123');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, seedUsers, seedContracts };
