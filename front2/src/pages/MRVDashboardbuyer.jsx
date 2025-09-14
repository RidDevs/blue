import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { onAuthStateChanged } from "firebase/auth";

export default function MRVDashboardBuyer() {
  const [availableCredits, setAvailableCredits] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [selectedCredits, setSelectedCredits] = useState([]);
  const [purchaseAmount, setPurchaseAmount] = useState('');

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const projectsRef = collection(db, "projects");
        const q = query(projectsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    } else {
      setProjects([]);
    }
  });

  return () => unsubscribe(); // cleanup
}, []);

  useEffect(() => {
    // Load available credits from all projects and MRV reports
    loadAvailableCredits();
    // Load user's purchase history
    const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    setPurchaseHistory(history);
  }, []);

  const loadAvailableCredits = () => {
    // Get all MRV reports from farmers
    const allReports = JSON.parse(localStorage.getItem('mrvReports') || '[]');
    const allProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    
    // Group credits by project
    const creditsByProject = {};
    allReports.forEach(report => {
      if (report.verificationStatus === 'verified') {
        if (!creditsByProject[report.projectId]) {
          const project = allProjects.find(p => p.id === report.projectId);
          creditsByProject[report.projectId] = {
            projectId: report.projectId,
            projectName: report.projectName,
            projectType: project?.projectType || 'Unknown',
            location: project?.location || 'Unknown',
            totalCredits: 0,
            availableCredits: 0,
            pricePerCredit: 58, // Base price
            reports: []
          };
        }
        creditsByProject[report.projectId].totalCredits += parseFloat(report.carbonSequestered || 0);
        creditsByProject[report.projectId].availableCredits += parseFloat(report.carbonSequestered || 0);
        creditsByProject[report.projectId].reports.push(report);
      }
    });

    // Subtract already purchased credits
    const purchases = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    purchases.forEach(purchase => {
      if (creditsByProject[purchase.projectId]) {
        creditsByProject[purchase.projectId].availableCredits -= purchase.amount;
      }
    });

    setAvailableCredits(Object.values(creditsByProject).filter(credit => credit.availableCredits > 0));
  };

  const handlePurchaseCredits = (projectId, amount) => {
    const creditProject = availableCredits.find(credit => credit.projectId === projectId);
    if (!creditProject || amount > creditProject.availableCredits) {
      alert('Insufficient credits available for purchase');
      return;
    }

    const purchase = {
      id: Date.now(),
      projectId: projectId,
      projectName: creditProject.projectName,
      amount: parseFloat(amount),
      pricePerCredit: creditProject.pricePerCredit,
      totalCost: parseFloat(amount) * creditProject.pricePerCredit,
      purchaseDate: new Date().toISOString(),
      status: 'completed'
    };

    // Save purchase to history
    const existingPurchases = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
    existingPurchases.push(purchase);
    localStorage.setItem('purchaseHistory', JSON.stringify(existingPurchases));

    // Update state
    setPurchaseHistory(existingPurchases);
    loadAvailableCredits(); // Refresh available credits
    
    alert(`Successfully purchased ${amount} tCO2 credits for $${purchase.totalCost.toFixed(2)}`);
  };

  const getTotalPurchasedCredits = () => {
    return purchaseHistory.reduce((total, purchase) => total + purchase.amount, 0);
  };

  const getTotalSpent = () => {
    return purchaseHistory.reduce((total, purchase) => total + purchase.totalCost, 0);
  };

  // Mock carbon credit price data
  const getCarbonCreditPriceData = () => {
    return [
      { month: 'Jan', price: 45 },
      { month: 'Feb', price: 48 },
      { month: 'Mar', price: 52 },
      { month: 'Apr', price: 49 },
      { month: 'May', price: 55 },
      { month: 'Jun', price: 58 },
    ];
  };

  // Get market statistics
  const getMarketStats = () => {
    const totalAvailableCredits = availableCredits.reduce((total, credit) => total + credit.availableCredits, 0);
    const averagePrice = availableCredits.length > 0 
      ? availableCredits.reduce((total, credit) => total + credit.pricePerCredit, 0) / availableCredits.length 
      : 58;
    
    return {
      totalAvailableCredits,
      averagePrice,
      totalProjects: availableCredits.length,
      marketValue: totalAvailableCredits * averagePrice
    };
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🛒 Carbon Credit Marketplace</h1>
        <p className="page-subtitle">Purchase verified carbon credits from blue carbon projects</p>
      </div>

      <div className="mrv-content">
        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          {/* Purchase Summary Container */}
          <div className="mrv-section carbon-credits-section">
            <h3>💰 My Carbon Credit Portfolio</h3>
            <div className="credits-summary">
              <div className="total-credits">
                <h4>Total Credits Purchased</h4>
                <span className="credits-number">{getTotalPurchasedCredits().toFixed(2)} tCO2</span>
              </div>
              <div className="credits-by-project">
                <h4>Total Investment</h4>
                <div className="investment-summary">
                  <span className="investment-amount">${getTotalSpent().toFixed(2)}</span>
                  <span className="investment-label">Total Spent</span>
                </div>
                <div className="recent-purchases">
                  <h5>Recent Purchases</h5>
                  {purchaseHistory.slice(-3).map(purchase => (
                    <div key={purchase.id} className="project-credits">
                      <span className="project-name">{purchase.projectName}</span>
                      <span className="credits-amount">{purchase.amount.toFixed(2)} tCO2</span>
                    </div>
                  ))}
                  {purchaseHistory.length === 0 && (
                    <p className="no-credits">No purchases yet. Browse available credits below.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Carbon Credit Price Graph */}
          <div className="mrv-section price-graph-section">
            <h3>📈 Carbon Credit Price Trends</h3>
            <div className="price-graph">
              <div className="current-price">
                <span className="price-label">Current Price</span>
                <span className="price-value">$58.00 per tCO2</span>
                <span className="price-change positive">+5.5% ↗</span>
              </div>
              <div className="price-chart">
                {getCarbonCreditPriceData().map((data, index) => (
                  <div key={data.month} className="price-bar">
                    <div 
                      className="bar" 
                      style={{ height: `${(data.price / 60) * 100}%` }}
                    ></div>
                    <span className="month-label">{data.month}</span>
                    <span className="price-label">${data.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mrv-section projects-status-section">
          <h3>📊 Market Overview</h3>
          <div className="market-stats-grid">
            <div className="market-stat-card">
              <div className="stat-icon">🌍</div>
              <div className="stat-content">
                <span className="stat-value">{getMarketStats().totalAvailableCredits.toFixed(0)}</span>
                <span className="stat-label">Available Credits (tCO2)</span>
              </div>
            </div>
            <div className="market-stat-card">
              <div className="stat-icon">💵</div>
              <div className="stat-content">
                <span className="stat-value">${getMarketStats().averagePrice.toFixed(2)}</span>
                <span className="stat-label">Average Price per tCO2</span>
              </div>
            </div>
            <div className="market-stat-card">
              <div className="stat-icon">🏗️</div>
              <div className="stat-content">
                <span className="stat-value">{getMarketStats().totalProjects}</span>
                <span className="stat-label">Active Projects</span>
              </div>
            </div>
            <div className="market-stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <span className="stat-value">${getMarketStats().marketValue.toFixed(0)}</span>
                <span className="stat-label">Total Market Value</span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Credits for Purchase */}
        <div className="mrv-section">
          <h3>🛍️ Available Carbon Credits</h3>
          <div className="credits-marketplace">
            {availableCredits.length > 0 ? (
              availableCredits.map(credit => (
                <div key={credit.projectId} className="credit-card">
                  <div className="credit-header">
                    <h4>{credit.projectName}</h4>
                    <span className="project-type">{credit.projectType}</span>
                  </div>
                  <div className="credit-details">
                    <p><strong>Location:</strong> {credit.location}</p>
                    <p><strong>Available Credits:</strong> {credit.availableCredits.toFixed(2)} tCO2</p>
                    <p><strong>Price per Credit:</strong> ${credit.pricePerCredit}</p>
                    <p><strong>Total Value:</strong> ${(credit.availableCredits * credit.pricePerCredit).toFixed(2)}</p>
                  </div>
                  <div className="purchase-section">
                    <input
                      type="number"
                      placeholder="Amount to purchase"
                      max={credit.availableCredits}
                      min="0.1"
                      step="0.1"
                      className="purchase-input"
                      id={`purchase-${credit.projectId}`}
                    />
                    <button
                      className="btn-primary purchase-btn"
                      onClick={() => {
                        const amount = document.getElementById(`purchase-${credit.projectId}`).value;
                        if (amount && parseFloat(amount) > 0) {
                          handlePurchaseCredits(credit.projectId, parseFloat(amount));
                          document.getElementById(`purchase-${credit.projectId}`).value = '';
                        } else {
                          alert('Please enter a valid amount');
                        }
                      }}
                    >
                      Purchase Credits
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-credits-available">
                <p>No verified carbon credits available for purchase at the moment.</p>
                <p>Credits become available once farmer projects are verified.</p>
              </div>
            )}
          </div>
        </div>

        {/* Purchase History */}
        <div className="mrv-section">
          <h3>📋 Purchase History</h3>
          <div className="purchase-history">
            {purchaseHistory.length > 0 ? (
              <div className="history-table">
                <div className="table-header">
                  <span>Date</span>
                  <span>Project</span>
                  <span>Amount</span>
                  <span>Price</span>
                  <span>Total Cost</span>
                  <span>Status</span>
                </div>
                {purchaseHistory.slice().reverse().map(purchase => (
                  <div key={purchase.id} className="table-row">
                    <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                    <span>{purchase.projectName}</span>
                    <span>{purchase.amount.toFixed(2)} tCO2</span>
                    <span>${purchase.pricePerCredit}</span>
                    <span>${purchase.totalCost.toFixed(2)}</span>
                    <span className={`status-badge ${purchase.status}`}>{purchase.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-history">No purchase history yet. Start buying carbon credits to see your transactions here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
