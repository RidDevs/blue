import { useState, useEffect } from 'react';

export default function Reports() {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [selectedProject, setSelectedProject] = useState('all');
  const [reportData, setReportData] = useState({});

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockReportData = {
      overview: {
        totalProjects: 45,
        totalUsers: 156,
        totalCredits: 12500,
        totalVolume: 312500,
        averagePrice: 25.00,
        growthRate: 15.2,
        topProjects: [
          { name: 'Mangrove Restoration - Sundarbans', credits: 1500, revenue: 38250 },
          { name: 'Coral Reef Protection Initiative', credits: 2000, revenue: 57500 },
          { name: 'Seagrass Carbon Sequestration', credits: 800, revenue: 23000 },
          { name: 'Blue Carbon Assessment', credits: 600, revenue: 13200 }
        ],
        monthlyTrends: [
          { month: 'Jan', credits: 1200, revenue: 30000 },
          { month: 'Feb', credits: 1500, revenue: 37500 },
          { month: 'Mar', credits: 1800, revenue: 45000 },
          { month: 'Apr', credits: 2100, revenue: 52500 },
          { month: 'May', credits: 1900, revenue: 47500 },
          { month: 'Jun', credits: 2200, revenue: 55000 }
        ]
      },
      financial: {
        totalRevenue: 312500,
        totalExpenses: 45000,
        netProfit: 267500,
        platformFees: 3125,
        transactionFees: 1875,
        operationalCosts: 40000,
        revenueByMonth: [
          { month: 'Jan', revenue: 30000, expenses: 3500 },
          { month: 'Feb', revenue: 37500, expenses: 4000 },
          { month: 'Mar', revenue: 45000, expenses: 4500 },
          { month: 'Apr', revenue: 52500, expenses: 5000 },
          { month: 'May', revenue: 47500, expenses: 4500 },
          { month: 'Jun', revenue: 55000, expenses: 5500 }
        ],
        topEarners: [
          { name: 'Dr. Marina Santos', earnings: 38250, projects: 5 },
          { name: 'Sarah Williams', earnings: 57500, projects: 8 },
          { name: 'Miguel Rodriguez', earnings: 13200, projects: 2 }
        ]
      },
      environmental: {
        totalCarbonSequestration: 12500,
        mangroveCredits: 4500,
        seagrassCredits: 3200,
        coralCredits: 4800,
        averageSequestrationRate: 2.5,
        environmentalImpact: {
          co2Reduction: 12500,
          equivalentTrees: 520833,
          equivalentCars: 2708,
          equivalentFlights: 156
        },
        projectTypes: [
          { type: 'Mangrove Restoration', credits: 4500, percentage: 36 },
          { type: 'Coral Reef Conservation', credits: 4800, percentage: 38.4 },
          { type: 'Seagrass Restoration', credits: 3200, percentage: 25.6 }
        ]
      },
      user: {
        totalUsers: 156,
        activeUsers: 142,
        newUsers: 23,
        userRetention: 91.0,
        usersByRole: [
          { role: 'Farmers', count: 89, percentage: 57.1 },
          { role: 'Buyers', count: 45, percentage: 28.8 },
          { role: 'Admins', count: 22, percentage: 14.1 }
        ],
        userActivity: [
          { period: 'Week 1', active: 120, new: 5 },
          { period: 'Week 2', active: 135, new: 8 },
          { period: 'Week 3', active: 142, new: 6 },
          { period: 'Week 4', active: 138, new: 4 }
        ],
        topActiveUsers: [
          { name: 'Dr. Marina Santos', activity: 95, projects: 5 },
          { name: 'Sarah Williams', activity: 92, projects: 8 },
          { name: 'James Chen', activity: 88, purchases: 12 }
        ]
      }
    };
    setReportData(mockReportData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const renderOverviewReport = () => {
    const data = reportData.overview;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="report-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{data.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-number">{data.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌱</div>
            <div className="stat-content">
              <div className="stat-number">{formatNumber(data.totalCredits)}</div>
              <div className="stat-label">Carbon Credits (tons)</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <div className="stat-number">{formatCurrency(data.totalVolume)}</div>
              <div className="stat-label">Total Volume</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-number">{formatCurrency(data.averagePrice)}</div>
              <div className="stat-label">Avg Price/Ton</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚀</div>
            <div className="stat-content">
              <div className="stat-number">{data.growthRate}%</div>
              <div className="stat-label">Growth Rate</div>
            </div>
          </div>
        </div>

        <div className="report-charts">
          <div className="chart-section">
            <h3>📈 Monthly Trends</h3>
            <div className="chart-container">
              <div className="chart-bars">
                {data.monthlyTrends.map((trend, index) => (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-bar">
                      <div 
                        className="bar credits-bar"
                        style={{ height: `${(trend.credits / 2500) * 100}%` }}
                      ></div>
                    </div>
                    <div className="chart-bar">
                      <div 
                        className="bar revenue-bar"
                        style={{ height: `${(trend.revenue / 60000) * 100}%` }}
                      ></div>
                    </div>
                    <div className="chart-label">{trend.month}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color credits-color"></div>
                  <span>Credits (tons)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color revenue-color"></div>
                  <span>Revenue ($)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <h3>🏆 Top Performing Projects</h3>
            <div className="top-projects-list">
              {data.topProjects.map((project, index) => (
                <div key={index} className="project-item">
                  <div className="project-rank">#{index + 1}</div>
                  <div className="project-info">
                    <h4>{project.name}</h4>
                    <div className="project-stats">
                      <span className="credits">{formatNumber(project.credits)} tons</span>
                      <span className="revenue">{formatCurrency(project.revenue)}</span>
                    </div>
                  </div>
                  <div className="project-chart">
                    <div 
                      className="project-bar"
                      style={{ width: `${(project.credits / 2000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialReport = () => {
    const data = reportData.financial;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="financial-summary">
          <div className="summary-card revenue">
            <h3>💰 Total Revenue</h3>
            <div className="summary-amount">{formatCurrency(data.totalRevenue)}</div>
          </div>
          <div className="summary-card expenses">
            <h3>💸 Total Expenses</h3>
            <div className="summary-amount">{formatCurrency(data.totalExpenses)}</div>
          </div>
          <div className="summary-card profit">
            <h3>📈 Net Profit</h3>
            <div className="summary-amount">{formatCurrency(data.netProfit)}</div>
          </div>
        </div>

        <div className="financial-breakdown">
          <div className="breakdown-section">
            <h3>💳 Revenue Breakdown</h3>
            <div className="breakdown-items">
              <div className="breakdown-item">
                <span className="label">Platform Fees (1%):</span>
                <span className="amount">{formatCurrency(data.platformFees)}</span>
              </div>
              <div className="breakdown-item">
                <span className="label">Transaction Fees:</span>
                <span className="amount">{formatCurrency(data.transactionFees)}</span>
              </div>
              <div className="breakdown-item">
                <span className="label">Operational Costs:</span>
                <span className="amount">{formatCurrency(data.operationalCosts)}</span>
              </div>
            </div>
          </div>

          <div className="breakdown-section">
            <h3>📊 Monthly Revenue vs Expenses</h3>
            <div className="revenue-chart">
              {data.revenueByMonth.map((month, index) => (
                <div key={index} className="month-item">
                  <div className="month-label">{month.month}</div>
                  <div className="month-bars">
                    <div className="revenue-bar">
                      <div 
                        className="bar"
                        style={{ height: `${(month.revenue / 60000) * 100}%` }}
                      ></div>
                      <span className="bar-label">{formatCurrency(month.revenue)}</span>
                    </div>
                    <div className="expense-bar">
                      <div 
                        className="bar"
                        style={{ height: `${(month.expenses / 6000) * 100}%` }}
                      ></div>
                      <span className="bar-label">{formatCurrency(month.expenses)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-section">
            <h3>🏆 Top Earners</h3>
            <div className="earners-list">
              {data.topEarners.map((earner, index) => (
                <div key={index} className="earner-item">
                  <div className="earner-rank">#{index + 1}</div>
                  <div className="earner-info">
                    <h4>{earner.name}</h4>
                    <p>{earner.projects} projects</p>
                  </div>
                  <div className="earner-amount">{formatCurrency(earner.earnings)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderEnvironmentalReport = () => {
    const data = reportData.environmental;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="environmental-impact">
          <h3>🌍 Environmental Impact Summary</h3>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">🌱</div>
              <div className="impact-content">
                <div className="impact-number">{formatNumber(data.environmentalImpact.co2Reduction)}</div>
                <div className="impact-label">Tons CO₂ Sequestered</div>
              </div>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🌳</div>
              <div className="impact-content">
                <div className="impact-number">{formatNumber(data.environmentalImpact.equivalentTrees)}</div>
                <div className="impact-label">Equivalent Trees</div>
              </div>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🚗</div>
              <div className="impact-content">
                <div className="impact-number">{formatNumber(data.environmentalImpact.equivalentCars)}</div>
                <div className="impact-label">Cars Off Road (yearly)</div>
              </div>
            </div>
            <div className="impact-card">
              <div className="impact-icon">✈️</div>
              <div className="impact-content">
                <div className="impact-number">{formatNumber(data.environmentalImpact.equivalentFlights)}</div>
                <div className="impact-label">Flights Offset</div>
              </div>
            </div>
          </div>
        </div>

        <div className="credits-breakdown">
          <div className="breakdown-section">
            <h3>🌊 Credits by Ecosystem Type</h3>
            <div className="ecosystem-chart">
              {data.projectTypes.map((type, index) => (
                <div key={index} className="ecosystem-item">
                  <div className="ecosystem-info">
                    <h4>{type.type}</h4>
                    <div className="ecosystem-stats">
                      <span className="credits">{formatNumber(type.credits)} tons</span>
                      <span className="percentage">{type.percentage}%</span>
                    </div>
                  </div>
                  <div className="ecosystem-bar">
                    <div 
                      className="bar"
                      style={{ width: `${type.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-section">
            <h3>📊 Carbon Sequestration Breakdown</h3>
            <div className="sequestration-grid">
              <div className="seq-item">
                <div className="seq-icon">🌿</div>
                <div className="seq-content">
                  <div className="seq-number">{formatNumber(data.mangroveCredits)}</div>
                  <div className="seq-label">Mangrove Credits</div>
                </div>
              </div>
              <div className="seq-item">
                <div className="seq-icon">🌊</div>
                <div className="seq-content">
                  <div className="seq-number">{formatNumber(data.seagrassCredits)}</div>
                  <div className="seq-label">Seagrass Credits</div>
                </div>
              </div>
              <div className="seq-item">
                <div className="seq-icon">🪸</div>
                <div className="seq-content">
                  <div className="seq-number">{formatNumber(data.coralCredits)}</div>
                  <div className="seq-label">Coral Credits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserReport = () => {
    const data = reportData.user;
    if (!data) return null;

    return (
      <div className="report-content">
        <div className="user-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <div className="stat-number">{data.totalUsers}</div>
              <div className="stat-label">Total Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-number">{data.activeUsers}</div>
              <div className="stat-label">Active Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🆕</div>
            <div className="stat-content">
              <div className="stat-number">{data.newUsers}</div>
              <div className="stat-label">New Users</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <div className="stat-number">{data.userRetention}%</div>
              <div className="stat-label">Retention Rate</div>
            </div>
          </div>
        </div>

        <div className="user-breakdown">
          <div className="breakdown-section">
            <h3>👥 Users by Role</h3>
            <div className="role-chart">
              {data.usersByRole.map((role, index) => (
                <div key={index} className="role-item">
                  <div className="role-info">
                    <h4>{role.role}</h4>
                    <div className="role-stats">
                      <span className="count">{role.count} users</span>
                      <span className="percentage">{role.percentage}%</span>
                    </div>
                  </div>
                  <div className="role-bar">
                    <div 
                      className="bar"
                      style={{ width: `${role.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-section">
            <h3>📊 Weekly User Activity</h3>
            <div className="activity-chart">
              {data.userActivity.map((week, index) => (
                <div key={index} className="week-item">
                  <div className="week-label">{week.period}</div>
                  <div className="week-bars">
                    <div className="active-bar">
                      <div 
                        className="bar"
                        style={{ height: `${(week.active / 150) * 100}%` }}
                      ></div>
                      <span className="bar-label">{week.active} active</span>
                    </div>
                    <div className="new-bar">
                      <div 
                        className="bar"
                        style={{ height: `${(week.new / 10) * 100}%` }}
                      ></div>
                      <span className="bar-label">{week.new} new</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="breakdown-section">
            <h3>🏆 Most Active Users</h3>
            <div className="active-users-list">
              {data.topActiveUsers.map((user, index) => (
                <div key={index} className="user-item">
                  <div className="user-rank">#{index + 1}</div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.projects ? `${user.projects} projects` : `${user.purchases} purchases`}</p>
                  </div>
                  <div className="user-activity">{user.activity}% active</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReport = () => {
    switch (reportType) {
      case 'overview':
        return renderOverviewReport();
      case 'financial':
        return renderFinancialReport();
      case 'environmental':
        return renderEnvironmentalReport();
      case 'user':
        return renderUserReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📊 Reports & Analytics</h1>
        <p className="page-subtitle">
          Comprehensive analytics and reporting for platform performance and environmental impact
        </p>
      </div>

      {/* Report Controls */}
      <div className="report-controls">
        <div className="control-group">
          <label>Report Type:</label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="control-select"
          >
            <option value="overview">📊 Overview</option>
            <option value="financial">💰 Financial</option>
            <option value="environmental">🌍 Environmental</option>
            <option value="user">👥 User Analytics</option>
          </select>
        </div>
        
        <div className="control-group">
          <label>Date Range:</label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="control-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        <div className="control-group">
          <label>Project:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="control-select"
          >
            <option value="all">All Projects</option>
            <option value="mangrove">Mangrove Projects</option>
            <option value="seagrass">Seagrass Projects</option>
            <option value="coral">Coral Projects</option>
          </select>
        </div>

        <div className="control-actions">
          <button className="btn-primary">
            📄 Export PDF
          </button>
          <button className="btn-secondary">
            📊 Export Excel
          </button>
          <button className="btn-secondary">
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="reports-content">
        {renderReport()}
      </div>
    </div>
  );
}
