import React, { useState } from "react";
import { FaBars, FaUser, FaBook, FaRegBuilding, FaNetworkWired, FaMoneyBillWave, FaInfoCircle, FaUserCircle, FaUserFriends, FaFemale } from "react-icons/fa";
import ProfilePage from './pages/Profile'
import ELearningPlatform from './pages/ExploreCourses'
import Preview from "./pages/UdyamNetwork";
import GovernmentSchemesDashboard from "./pages/GovtSupport"
import UdyamSathiPlatform from './pages/Platform'
import ExpenseTracker from "./pages/ExpenseTracker";
import UdyamSathiHelpdesk from './pages/Helpdesk';
import logo from "./Logo.jpg";
import UdyamSakhi from './pages/UdyamSakhi';
import FinancialLearningHub from './pages/LearnFinance'

const Dashboard = () => <div className="p-6">Dashboard Content</div>;
const AboutUdyam = () => <div className="p-6">About Udyam Saathi Content</div>;
const HelpDesk = () => <div className="p-6"> Help Desk Content</div>;

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("Udyam Sathi");
  const [language, setLanguage] = useState("EN");
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (page) => setCurrentPage(page);
  const toggleLanguage = () => setLanguage((prevLang) => (prevLang === "EN" ? "FR" : "EN"));

  const renderPage = () => {
    switch (currentPage) {
      case "Udyam Sathi": return <UdyamSathiPlatform />;
      case "Udyam Sakhi": return <UdyamSakhi />;
      case "Build Your Profile": return <ProfilePage />;
      case "Learn Finance": return <FinancialLearningHub />;
      case "Government Support": return <GovernmentSchemesDashboard />;
      case "UdyamSaathi Network": return <Preview />;
      case "Expense Management": return <ExpenseTracker />;
      case "Help Desk": return <UdyamSathiHelpdesk />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-blue-500 text-white h-screen left-0 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} overflow-y-auto`}>

        <div className="flex justify-between items-center p-4">
          <button className="text-3xl" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars />
          </button>
        </div>
        <ul className="mt-4 space-y-4 px-4">
          {["Udyam Sathi", "Udyam Sakhi", "Build Your Profile", "Learn Finance", "Government Support", "UdyamSaathi Network", "Expense Management", "Help Desk"].map((page, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(page)}
              className="cursor-pointer hover:bg-blue-600 p-2 rounded flex items-center"
            >
              {page === "Udyam Sathi" && <FaUserFriends className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Udyam Sakhi" && <FaFemale className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Build Your Profile" && <FaUser className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Learn Finance" && <FaBook className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Government Support" && <FaRegBuilding className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "UdyamSaathi Network" && <FaNetworkWired className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Expense Management" && <FaMoneyBillWave className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "About Udyam Saathi" && <FaInfoCircle className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {page === "Help Desk" && <FaUserCircle className={`mr-2 ${isSidebarOpen ? 'text-2xl' : 'text-xl'}`} />}
              {isSidebarOpen && <span>{page}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        {/* Navbar */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
          {/* App Logo and Name */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}  // Replace with your actual logo path
              alt="App Logo"
              className="w-8 h-8"  // Adjust size as necessary
            />
            <h2 className="text-lg font-bold">Udyam Sathi</h2>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={toggleLanguage} className="px-3 py-1 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600">
              {language}
            </button>
            <div className="relative flex items-center cursor-pointer">
              {/* Profile Icon */}
              <FaUserCircle
                className="text-2xl"
                onClick={() => setShowMenu(!showMenu)} // Toggle menu on profile icon click
              />
              <span className="ml-2 text-sm font-medium">Hello, User</span>
              {showMenu && (
                <div className="absolute top-12 right-0 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Update Profile</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Delete Account</div>
                </div>
              )}
            </div>
          </div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}

export default Home;
