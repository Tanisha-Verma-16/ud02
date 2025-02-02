import React, { useState } from 'react';
import { Search, Star, Briefcase, Heart, MessageCircle, Award, CheckCircle, Users, TrendingUp, IndianRupee, Gift } from 'lucide-react';
import UdyamSakhiFreeLancer from './UdyamSakhiFreeLancer';

const UdyamSakhi = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [fundingRequests, setFundingRequests] = useState([
    {
      id: 1,
      name: "Meera Devi",
      business: "Handloom Crafts Enterprise",
      story: "Third-generation weaver expanding traditional crafts business",
      amount: 25000,
      raised: 18500,
      supporters: 34,
      daysLeft: 12,
      image: "/api/placeholder/400/200",
      tags: ["Handicrafts", "Traditional", "Women Artisans"]
    },
    {
      id: 2,
      name: "Lakshmi Singh",
      business: "Organic Food Startup",
      story: "Creating healthy snacks using local ingredients",
      amount: 35000,
      raised: 28000,
      supporters: 45,
      daysLeft: 8,
      image: "/api/placeholder/400/200",
      tags: ["Food", "Organic", "Health"]
    },
    {
      id: 3,
      name: "Zara Khan",
      business: "Tech Education Initiative",
      story: "Teaching coding skills to rural women",
      amount: 40000,
      raised: 15000,
      supporters: 28,
      daysLeft: 15,
      image: "/api/placeholder/400/200",
      tags: ["Education", "Technology", "Rural Development"]
    }
  ]);

  const [topContributors, setTopContributors] = useState([
    { name: "Ritu Sharma", amount: 125000, projects: 12 },
    { name: "Anita Desai", amount: 98000, projects: 8 },
    { name: "Priya Mehta", amount: 85000, projects: 10 },
    { name: "Suman Reddy", amount: 76000, projects: 7 },
    { name: "Nina Patel", amount: 65000, projects: 6 }
  ]);

  // Donation amounts preset options
  const donationAmounts = [500, 1000, 2000, 5000];

  // Handle donation through Razorpay
  const handleDonation = (businessId, amount) => {
    const business = fundingRequests.find(req => req.id === businessId);
    
    const options = {
      key: "rzp_test_YOUR_KEY_HERE", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Udyam Sakhi",
      description: `Supporting ${business.business}`,
      handler: function(response) {
        // Update the funding state
        const updatedRequests = fundingRequests.map(req => {
          if (req.id === businessId) {
            return {
              ...req,
              raised: req.raised + amount,
              supporters: req.supporters + 1
            };
          }
          return req;
        });
        setFundingRequests(updatedRequests);

        // Show success message
        alert(`Thank you for your donation of ₹${amount} to ${business.business}! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Supporter Name",
        email: "supporter@example.com",
        contact: "9999999999"
      },
      theme: {
        color: "#2563eb"
      }
    };

    const paymentWindow = new Window();
    paymentWindow.rzp1 = new Razorpay(options);
    paymentWindow.rzp1.open();
  };

  // Custom donation modal
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  const openDonationModal = (business) => {
    setSelectedBusiness(business);
    setShowDonationModal(true);
  };

  const DonationModal = () => {
    if (!showDonationModal || !selectedBusiness) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Support {selectedBusiness.business}</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setShowDonationModal(false);
                  handleDonation(selectedBusiness.id, amount);
                }}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold py-3 rounded-lg"
              >
                ₹{amount}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amount
            </label>
            <div className="flex gap-4">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Enter amount"
                min="100"
              />
              <button
                onClick={() => {
                  if (customAmount >= 100) {
                    setShowDonationModal(false);
                    handleDonation(selectedBusiness.id, Number(customAmount));
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Donate
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setShowDonationModal(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-blue-800">Udyam</span> 
          <span className="text-pink-600">Sakhi</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">Empowering Women Through Business Opportunities</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-blue-100 p-1 rounded-full">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'discover' 
                ? 'bg-blue-600 text-white' 
                : 'text-blue-600 hover:bg-blue-200'
            }`}
          >
            Find Freelancers
          </button>
          <button
            onClick={() => setActiveTab('funding')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeTab === 'funding' 
                ? 'bg-blue-600 text-white' 
                : 'text-blue-600 hover:bg-blue-200'
            }`}
          >
            Support & Fund
          </button>
        </div>
      </div>

      {activeTab === 'discover' ? (
        <UdyamSakhiFreeLancer />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Funding Requests */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-pink-800">Women Owned Business Funding Requests</h2>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
                Create Request
              </button>
            </div>

            <div className="space-y-6">
              {fundingRequests.map(request => (
                <div key={request.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={request.image}
                      alt={request.business}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-blue-600 font-medium">
                      {request.daysLeft} days left
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{request.business}</h3>
                        <p className="text-gray-600">by {request.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">₹{request.raised}</p>
                        <p className="text-gray-500">of ₹{request.amount}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{request.story}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {request.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(request.raised / request.amount) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{request.supporters} supporters</span>
                      <button 
                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        onClick={() => openDonationModal(request)}
                      >
                        Support Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors & Stats */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Top Contributors</h3>
              <div className="space-y-4">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{contributor.name}</p>
                      <p className="text-sm text-gray-500">{contributor.projects} projects supported</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₹{contributor.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <IndianRupee className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">₹12.5L+</p>
                    <p className="text-blue-100">Total Funds Raised</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">250+</p>
                    <p className="text-blue-100">Businesses Supported</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Gift className="w-8 h-8" />
                  <div>
                    <p className="text-2xl font-bold">1,500+</p>
                    <p className="text-blue-100">Active Contributors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      <DonationModal />
    </div>
  );
};

export default UdyamSakhi;