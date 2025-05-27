import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import Logo from '../../components/ui/Logo';
import Header from './Header';
import FAQSection from './FAQSection';
import Footer from './Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Invest in Farms,<br />
                <span className="text-primary-600">Harvest Returns</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Join thousands of investors funding sustainable agriculture projects and earning competitive returns while supporting farmers.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button size="lg" variant="primary" rightIcon={<ChevronRight size={18} />}>
                    Start Investing
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-8">
                <div className="flex items-center">
                  <Check size={20} className="text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">No hidden fees</span>
                </div>
                <div className="flex items-center">
                  <Check size={20} className="text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">Transparent investments</span>
                </div>
                <div className="flex items-center">
                  <Check size={20} className="text-primary-600 mr-2" />
                  <span className="text-sm text-gray-600">Secure platform</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg" 
                alt="Agricultural investment" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Invest with Agroww?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes agricultural investments accessible, transparent, and profitable for everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-4">
                <DollarSign size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitive Returns</h3>
              <p className="text-gray-600">
                Earn 8-15% annual returns by investing in vetted agricultural projects with predictable yields.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-4">
                <TrendingUp size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Portfolio Diversification</h3>
              <p className="text-gray-600">
                Diversify your investments beyond traditional stocks and bonds with agricultural assets.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-primary-50 p-3 rounded-lg inline-block mb-4">
                <ShieldCheck size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Transparent</h3>
              <p className="text-gray-600">
                Track your investments in real-time with comprehensive reporting and farm updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your agricultural investment journey in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-lg">
                1
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 ml-4">
                <h3 className="text-xl font-semibold mb-3">Create Your Account</h3>
                <p className="text-gray-600">
                  Sign up in minutes with our simple verification process and set up your investor profile.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-lg">
                2
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 ml-4">
                <h3 className="text-xl font-semibold mb-3">Browse Farm Opportunities</h3>
                <p className="text-gray-600">
                  Explore vetted farming projects with detailed information on expected returns and risk profiles.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 left-0 -ml-4 mt-2 flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-lg">
                3
              </div>
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 ml-4">
                <h3 className="text-xl font-semibold mb-3">Invest & Monitor</h3>
                <p className="text-gray-600">
                  Invest any amount starting from ₹1,000 and track your investment growth through our dashboard.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Farms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Investment Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore some of our current agricultural investment opportunities
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "Organic Mango Farm",
                location: "Maharashtra, India",
                roi: "12.5%",
                duration: "8 months",
                raised: 75,
                image: "https://images.pexels.com/photos/11281577/pexels-photo-11281577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                id: 2,
                title: "Rice Cultivation Project",
                location: "Punjab, India",
                roi: "10.2%",
                duration: "6 months",
                raised: 85,
                image: "https://images.pexels.com/photos/3358070/pexels-photo-3358070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                id: 3,
                title: "Apple Orchard Expansion",
                location: "Himachal Pradesh, India",
                roi: "14.8%",
                duration: "12 months",
                raised: 60,
                image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((farm) => (
              <div key={farm.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all card-hover">
                <img 
                  src={farm.image} 
                  alt={farm.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{farm.title}</h3>
                  <p className="text-gray-600 mb-4">{farm.location}</p>
                  
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Expected ROI</p>
                      <p className="text-primary-600 font-semibold">{farm.roi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{farm.duration}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{farm.raised}% Raised</span>
                      <span>₹{(farm.raised * 10000) / 100}k of ₹10L</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${farm.raised}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link to="/login">
                    <Button variant="primary" fullWidth>
                      Invest Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/login">
              <Button variant="outline" size="lg" rightIcon={<ChevronRight size={18} />}>
                View All Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* CTA Section */}
      <section className="bg-primary-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Grow Your Money?</h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
            Join thousands of investors funding the future of sustainable agriculture while earning attractive returns.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-primary-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;