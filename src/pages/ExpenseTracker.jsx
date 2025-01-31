import React, { useState, useEffect } from 'react';
import { 
  UserCircle, 
  LogIn, 
  Wallet, 
  CreditCard, 
  HandCoins, 
  PlusCircle, 
  FileText,
  Building2,
  Info,
  Globe,
  Target,
  Shield,
  Book,
  MessageCircle
} from 'lucide-react';

const BlockchainBusinessPlatform = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState('connection');
  const [businessRegistered, setBusinessRegistered] = useState(false);
  
  // Expense and Loan State
  const [expenses, setExpenses] = useState([]);
  const [loans, setLoans] = useState([]);
  
  // Business Registration State
  const [businessRegistration, setBusinessRegistration] = useState({
    businessName: '',
    registrationNumber: '',
    businessType: '',
    ownerName: '',
    email: '',
    contactNumber: ''
  });

  // Compliance and Documentation State
  const [complianceDocuments, setComplianceDocuments] = useState([]);
  const [complianceStatus, setComplianceStatus] = useState({
    gstRegistration: false,
    incorporationCertificate: false,
    panCard: false
  });

  // Communication Log State
  const [communicationLogs, setCommunicationLogs] = useState([]);
  const [newCommunication, setNewCommunication] = useState({
    subject: '',
    message: '',
    recipient: ''
  });

  // New Expense and Loan Input States
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: ''
  });

  const [newLoan, setNewLoan] = useState({
    description: '',
    amount: '',
    interestRate: ''
  });

  // Wallet Connection Function
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });

        const address = accounts[0];
        
        setWalletConnected(true);
        setWalletAddress(address);

        // Network switch logic
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }]
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x89',
                  chainName: 'Polygon Mainnet',
                  nativeCurrency: {
                    name: 'MATIC',
                    symbol: 'MATIC',
                    decimals: 18
                  },
                  rpcUrls: ['https://polygon-rpc.com'],
                  blockExplorerUrls: ['https://polygonscan.com/']
                }]
              });
            } catch (addError) {
              console.error('Failed to add network', addError);
            }
          }
        }

        // Account transfer request
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });

        setCurrentPage(businessRegistered ? 'dashboard' : 'business-registration');

      } catch (error) {
        console.error('Wallet connection failed', error);
        alert('Failed to connect wallet. Please try again.');
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask!');
    }
  };

    // Add Expense Function with Improved Tracking
    const addExpense = (e) => {
      e.preventDefault();
      
      const currentTime = new Date();
      const transactionHash = '0x' + Math.random().toString(36).substring(2, 15);
      
      const newExpenseEntry = {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        date: currentTime.toISOString().split('T')[0],
        time: currentTime.toLocaleTimeString(),
        transactionHash: transactionHash,
        status: 'Pending'
      };
  
      // Immediately add pending expense
      setExpenses(prev => [...prev, newExpenseEntry]);
  
      // Simulate blockchain processing
      setTimeout(() => {
        setExpenses(prev => 
          prev.map(exp => 
            exp.transactionHash === transactionHash 
              ? {...exp, status: 'Confirmed'}
              : exp
          )
        );
      }, 3000);
  
      // Reset form
      setNewExpense({ description: '', amount: '' });
    };
  
    // Request Loan Function with Improved Tracking
    const requestLoan = (e) => {
      e.preventDefault();
      
      const currentTime = new Date();
      const transactionHash = '0x' + Math.random().toString(36).substring(2, 15);
      
      const newLoanEntry = {
        id: loans.length + 1,
        description: newLoan.description,
        amount: parseFloat(newLoan.amount),
        interestRate: parseFloat(newLoan.interestRate),
        date: currentTime.toISOString().split('T')[0],
        time: currentTime.toLocaleTimeString(),
        transactionHash: transactionHash,
        status: 'Pending'
      };
  
      // Immediately add pending loan
      setLoans(prev => [...prev, newLoanEntry]);
  
      // Simulate blockchain processing and approval
      setTimeout(() => {
        setLoans(prev => 
          prev.map(loan => 
            loan.transactionHash === transactionHash 
              ? {...loan, status: 'Approved'}
              : loan
          )
        );
      }, 5000);
  
      // Reset form
      setNewLoan({ description: '', amount: '', interestRate: '' });
    };
  

  // Business Registration Handler
  const handleBusinessRegistration = (e) => {
    e.preventDefault();
    
    if (!walletConnected) {
      alert('Please connect wallet first!');
      return;
    }

    const registrationHash = '0x' + Math.random().toString(36).substring(2, 15);
    
    setTimeout(() => {
      setBusinessRegistered(true);
      setCurrentPage('dashboard');
      alert('Business Registered Successfully!');
    }, 2000);
  };

  // Add Compliance Document
  const addComplianceDocument = (documentType) => {
    const newDocument = {
      id: complianceDocuments.length + 1,
      type: documentType,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setComplianceDocuments(prev => [...prev, newDocument]);
    setComplianceStatus(prev => ({
      ...prev,
      [documentType]: true
    }));
  };

  // Add Communication Log
  const addCommunicationLog = (e) => {
    e.preventDefault();

    const newLog = {
      id: communicationLogs.length + 1,
      ...newCommunication,
      timestamp: new Date().toISOString()
    };

    setCommunicationLogs(prev => [...prev, newLog]);
    setNewCommunication({ subject: '', message: '', recipient: '' });
  };

  // Feature Information Component
  const FeatureInfoCards = () => (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      {/* Previous feature info cards */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <Info className="text-blue-600 mb-3" size={40} />
        <h3 className="font-bold mb-2">Blockchain Transparency</h3>
        <p className="text-sm text-gray-600">Secure, transparent financial transactions for small businesses in India.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Globe className="text-green-600 mb-3" size={40} />
        <h3 className="font-bold mb-2">Easy Loan Access</h3>
        <p className="text-sm text-gray-600">Simplified loan application process for MSMEs with reduced paperwork.</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Target className="text-purple-600 mb-3" size={40} />
        <h3 className="font-bold mb-2">Impact on Indian Businesses</h3>
        <p className="text-sm text-gray-600">Empowering small businesses with transparent financial management tools.</p>
      </div>
    </div>
  );

  // Implementation Guide Component
  const ImplementationGuide = () => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {/* Previous implementation guide */}
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Shield className="mr-3 text-blue-600" /> Implementation Guide
      </h2>
      <ol className="list-decimal pl-5 space-y-2 text-sm">
        <li>Connect MetaMask wallet to begin</li>
        <li>Complete business registration process</li>
        <li>Track expenses and manage loans transparently</li>
        <li>Leverage blockchain for secure financial operations</li>
      </ol>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <FeatureInfoCards />
        
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Business Blockchain Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <UserCircle className="w-10 h-10 text-gray-600" />
            <span>{walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 'Not Connected'}</span>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Expenses Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-3 text-green-600" /> 
              Expenses
              <button 
                onClick={() => setCurrentPage('add-expense')}
                className="ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                <PlusCircle size={20} />
              </button>
            </h2>
            {expenses.slice(0, 3).map((expense) => (
              <div key={expense.id} className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-xs text-gray-500">
                      {expense.date} {expense.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-600">₹{expense.amount}</span>
                    <p className={`text-xs font-semibold ${
                      expense.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {expense.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Loans Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <HandCoins className="mr-3 text-purple-600" /> 
              Loans
              <button 
                onClick={() => setCurrentPage('request-loan')}
                className="ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                <PlusCircle size={20} />
              </button>
            </h2>
            {loans.slice(0, 3).map((loan) => (
              <div key={loan.id} className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{loan.description}</p>
                    <p className="text-xs text-gray-500">
                      {loan.date} {loan.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-purple-600">₹{loan.amount}</span>
                    <p className={`text-xs font-semibold ${
                      loan.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {loan.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Compliance Documents Section */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FileText className="mr-3 text-blue-600" /> 
              Compliance
              <button 
                onClick={() => setCurrentPage('compliance-documents')}
                className="ml-auto bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                <PlusCircle size={20} />
              </button>
            </h2>
            {complianceDocuments.slice(0, 3).map((doc) => (
              <div key={doc.id} className="border-b pb-2 last:border-b-0">
                <div className="flex justify-between">
                  <p className="font-medium">{doc.documentName}</p>
                  <span className="text-sm text-gray-500">{doc.documentType}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


  // Compliance Documents Component
  const ComplianceDocumentsPage = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Book className="mr-3 text-blue-600" /> 
          Compliance Documents
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {['gstRegistration', 'incorporationCertificate', 'panCard'].map(doc => (
            <div key={doc} className="border p-4 rounded-lg">
              <h3 className="font-semibold mb-2 capitalize">
                {doc.replace(/([A-Z])/g, ' $1')}
              </h3>
              <button 
                onClick={() => addComplianceDocument(doc)}
                className={`w-full py-2 rounded ${
                  complianceStatus[doc] 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={complianceStatus[doc]}
              >
                {complianceStatus[doc] ? 'Uploaded' : 'Upload'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
          <ul className="space-y-2">
            {complianceDocuments.map(doc => (
              <li key={doc.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                <span className="capitalize">{doc.type.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm text-gray-500">{doc.uploadDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Communication Logs Component
  const CommunicationLogsPage = () => (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <MessageCircle className="mr-3 text-green-600" /> 
          Communication Logs
        </h2>

        <form onSubmit={addCommunicationLog} className="mb-6 space-y-4">
          <input 
            type="text"
            placeholder="Recipient"
            value={newCommunication.recipient}
            onChange={(e) => setNewCommunication({
              ...newCommunication, 
              recipient: e.target.value
            })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <input 
            type="text"
            placeholder="Subject"
            value={newCommunication.subject}
            onChange={(e) => setNewCommunication({
              ...newCommunication, 
              subject: e.target.value
            })}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
          <textarea 
            placeholder="Message"
            value={newCommunication.message}
            onChange={(e) => setNewCommunication({
              ...newCommunication, 
              message: e.target.value
            })}
            className="w-full px-3 py-2 border rounded-lg"
            rows="4"
            required
          />
          <button 
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Send Communication
          </button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-4">Previous Logs</h3>
          <div className="space-y-3">
            {communicationLogs.map(log => (
              <div key={log.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{log.recipient}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <h4 className="font-semibold">{log.subject}</h4>
                <p className="text-gray-700">{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Page Logic
  const renderPage = () => {
    if (!walletConnected) return <ConnectionPage />;
    
    if (!businessRegistered) return <BusinessRegistrationPage />;
    
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'add-expense': return <AddExpensePage />;
      case 'request-loan': return <RequestLoanPage />;
      case 'compliance': return <ComplianceDocumentsPage />;
      case 'communication': return <CommunicationLogsPage />;
      default: return <Dashboard />;
    }
  };

  // Existing ConnectionPage, BusinessRegistrationPage, AddExpensePage, RequestLoanPage components 
  // would be included here with similar implementations as in previous examples
  // ConnectionPage Component
const ConnectionPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
      <Wallet className="mx-auto mb-6 text-blue-600" size={64} />
      
      <h1 className="text-2xl font-bold mb-4">
        Blockchain Business Platform
      </h1>

      <button 
        onClick={connectWallet}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
      >
        <LogIn className="mr-2" /> Connect MetaMask Wallet
      </button>
    </div>
  </div>
);

// BusinessRegistrationPage Component
const BusinessRegistrationPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Building2 className="mr-3 text-blue-600" /> 
        Business Registration
      </h2>
      <form onSubmit={handleBusinessRegistration} className="space-y-4">
        <input 
          type="text"
          placeholder="Business Name"
          value={businessRegistration.businessName}
          onChange={(e) => setBusinessRegistration({
            ...businessRegistration, 
            businessName: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="text"
          placeholder="Registration Number"
          value={businessRegistration.registrationNumber}
          onChange={(e) => setBusinessRegistration({
            ...businessRegistration, 
            registrationNumber: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="text"
          placeholder="Owner Name"
          value={businessRegistration.ownerName}
          onChange={(e) => setBusinessRegistration({
            ...businessRegistration, 
            ownerName: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="email"
          placeholder="Email"
          value={businessRegistration.email}
          onChange={(e) => setBusinessRegistration({
            ...businessRegistration, 
            email: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <select
          value={businessRegistration.businessType}
          onChange={(e) => setBusinessRegistration({
            ...businessRegistration, 
            businessType: e.target.value
          })}
          className="w-full px-3 py-2 border rounded-lg"
          required
        >
          <option value="">Select Business Type</option>
          <option value="sole-proprietorship">Sole Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="llc">Limited Liability Company</option>
          <option value="corporation">Corporation</option>
        </select>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Register Business
        </button>
      </form>
    </div>
  </div>
);

// AddExpensePage Component
const AddExpensePage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-3 text-green-600" /> 
        Add New Expense
      </h2>
      <form onSubmit={addExpense} className="space-y-4">
        <input 
          type="text"
          name="description"
          placeholder="Expense Description"
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Record Expense
        </button>
        <button 
          type="button"
          onClick={() => setCurrentPage('dashboard')}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
);

// RequestLoanPage Component
const RequestLoanPage = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <HandCoins className="mr-3 text-purple-600" /> 
        Request Loan
      </h2>
      <form onSubmit={requestLoan} className="space-y-4">
        <input 
          type="text"
          name="description"
          placeholder="Loan Purpose"
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="number"
          name="amount"
          placeholder="Loan Amount (₹)"
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <input 
          type="number"
          name="interestRate"
          placeholder="Expected Interest Rate (%)"
          className="w-full px-3 py-2 border rounded-lg"
          required 
        />
        <button 
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Submit Loan Request
        </button>
        <button 
          type="button"
          onClick={() => setCurrentPage('dashboard')}
          className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
);

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default BlockchainBusinessPlatform;