import { useState, useEffect } from 'react';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockTransactions = [
      {
        id: 'TXN-001',
        type: 'credit_purchase',
        buyer: 'James Chen',
        seller: 'Dr. Marina Santos',
        project: 'Mangrove Restoration - Sundarbans',
        amount: 500,
        pricePerTon: 25.50,
        totalAmount: 12750.00,
        currency: 'USD',
        status: 'completed',
        date: '2024-01-20',
        timestamp: '2024-01-20T14:30:00Z',
        paymentMethod: 'Bank Transfer',
        transactionHash: '0x742d35cc6cd8f9a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'verified',
        notes: 'Carbon credit purchase for corporate sustainability goals'
      },
      {
        id: 'TXN-002',
        type: 'credit_sale',
        buyer: 'Lisa Thompson',
        seller: 'Sarah Williams',
        project: 'Coral Reef Protection Initiative',
        amount: 300,
        pricePerTon: 28.75,
        totalAmount: 8625.00,
        currency: 'USD',
        status: 'pending',
        date: '2024-01-19',
        timestamp: '2024-01-19T16:45:00Z',
        paymentMethod: 'Credit Card',
        transactionHash: '0x923c45dd7de8f0a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'pending',
        notes: 'Partial payment received, awaiting full confirmation'
      },
      {
        id: 'TXN-003',
        type: 'credit_purchase',
        buyer: 'Green Investment Corp',
        seller: 'Miguel Rodriguez',
        project: 'Blue Carbon Assessment',
        amount: 800,
        pricePerTon: 22.00,
        totalAmount: 17600.00,
        currency: 'USD',
        status: 'completed',
        date: '2024-01-18',
        timestamp: '2024-01-18T11:20:00Z',
        paymentMethod: 'Wire Transfer',
        transactionHash: '0x456e78ff9ef0a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7',
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'verified',
        notes: 'Bulk purchase for portfolio diversification'
      },
      {
        id: 'TXN-004',
        type: 'credit_sale',
        buyer: 'Eco Investment Partners',
        seller: 'Dr. Marina Santos',
        project: 'Mangrove Restoration - Sundarbans',
        amount: 200,
        pricePerTon: 26.25,
        totalAmount: 5250.00,
        currency: 'USD',
        status: 'failed',
        date: '2024-01-17',
        timestamp: '2024-01-17T09:15:00Z',
        paymentMethod: 'Bank Transfer',
        transactionHash: null,
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'failed',
        notes: 'Transaction failed due to insufficient funds'
      },
      {
        id: 'TXN-005',
        type: 'credit_purchase',
        buyer: 'James Chen',
        seller: 'Sarah Williams',
        project: 'Coral Reef Protection Initiative',
        amount: 150,
        pricePerTon: 30.00,
        totalAmount: 4500.00,
        currency: 'USD',
        status: 'processing',
        date: '2024-01-16',
        timestamp: '2024-01-16T13:45:00Z',
        paymentMethod: 'Cryptocurrency',
        transactionHash: '0x789f01aa0bf1a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8',
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'processing',
        notes: 'Cryptocurrency payment in progress'
      },
      {
        id: 'TXN-006',
        type: 'platform_fee',
        buyer: 'Platform',
        seller: 'Dr. Marina Santos',
        project: 'Mangrove Restoration - Sundarbans',
        amount: 0,
        pricePerTon: 0,
        totalAmount: 127.50,
        currency: 'USD',
        status: 'completed',
        date: '2024-01-20',
        timestamp: '2024-01-20T14:30:00Z',
        paymentMethod: 'Automatic',
        transactionHash: '0x123a45bb1cf2a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9',
        blockchainNetwork: 'Ethereum',
        verificationStatus: 'verified',
        notes: 'Platform fee (1% of transaction value)'
      }
    ];
    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
  }, []);

  // Filter transactions based on search and filters
  useEffect(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(txn => 
        txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.project.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(txn => txn.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(txn => txn.status === filterStatus);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(txn => new Date(txn.date) >= filterDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType, filterStatus, dateRange]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'credit_purchase':
        return 'type-badge purchase';
      case 'credit_sale':
        return 'type-badge sale';
      case 'platform_fee':
        return 'type-badge fee';
      default:
        return 'type-badge default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge verified';
      case 'pending':
        return 'status-badge pending';
      case 'processing':
        return 'status-badge active';
      case 'failed':
        return 'status-badge rejected';
      default:
        return 'status-badge no-reports';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'credit_purchase':
        return '🛒';
      case 'credit_sale':
        return '💰';
      case 'platform_fee':
        return '🏛️';
      default:
        return '📄';
    }
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const transactionStats = {
    total: filteredTransactions.length,
    completed: filteredTransactions.filter(t => t.status === 'completed').length,
    pending: filteredTransactions.filter(t => t.status === 'pending').length,
    processing: filteredTransactions.filter(t => t.status === 'processing').length,
    failed: filteredTransactions.filter(t => t.status === 'failed').length,
    totalVolume: filteredTransactions.reduce((sum, t) => sum + t.totalAmount, 0),
    totalCredits: filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">💳 Transactions</h1>
        <p className="page-subtitle">
          Track all carbon credit transactions, payments, and financial records
        </p>
      </div>

      {/* Transaction Statistics */}
      <div className="transaction-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-number">{transactionStats.total}</div>
            <div className="stat-label">Total Transactions</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{transactionStats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{transactionStats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-number">{formatCurrency(transactionStats.totalVolume, 'USD')}</div>
            <div className="stat-label">Total Volume</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌱</div>
          <div className="stat-content">
            <div className="stat-number">{transactionStats.totalCredits.toLocaleString()}</div>
            <div className="stat-label">Credits Traded (tons)</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-number">
              {transactionStats.total > 0 ? 
                formatCurrency(transactionStats.totalVolume / transactionStats.totalCredits, 'USD') : 
                '$0.00'
              }
            </div>
            <div className="stat-label">Avg Price/Ton</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="transaction-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="credit_purchase">Credit Purchase</option>
            <option value="credit_sale">Credit Sale</option>
            <option value="platform_fee">Platform Fee</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <button className="btn-primary">
          📊 Export Report
        </button>
      </div>

      {/* Transactions List */}
      <div className="transactions-content">
        <div className="transactions-list">
          <div className="list-header">
            <h3>💳 Transaction History ({filteredTransactions.length})</h3>
          </div>
          
          <div className="transactions-table">
            <div className="table-header">
              <div className="col-id">ID</div>
              <div className="col-type">Type</div>
              <div className="col-parties">Parties</div>
              <div className="col-project">Project</div>
              <div className="col-amount">Amount</div>
              <div className="col-price">Price/Ton</div>
              <div className="col-total">Total</div>
              <div className="col-status">Status</div>
              <div className="col-date">Date</div>
              <div className="col-actions">Actions</div>
            </div>
            
            <div className="table-body">
              {filteredTransactions.map(transaction => (
                <div 
                  key={transaction.id} 
                  className={`table-row ${selectedTransaction?.id === transaction.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="col-id">
                    <span className="transaction-id">{transaction.id}</span>
                  </div>
                  <div className="col-type">
                    <span className={`type-badge ${getTypeColor(transaction.type)}`}>
                      {getTypeIcon(transaction.type)} {transaction.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="col-parties">
                    <div className="parties-info">
                      <span className="buyer">👤 {transaction.buyer}</span>
                      <span className="seller">👤 {transaction.seller}</span>
                    </div>
                  </div>
                  <div className="col-project">
                    <span className="project-name">{transaction.project}</span>
                  </div>
                  <div className="col-amount">
                    <span className="amount">{transaction.amount.toLocaleString()} tons</span>
                  </div>
                  <div className="col-price">
                    <span className="price">{formatCurrency(transaction.pricePerTon, transaction.currency)}</span>
                  </div>
                  <div className="col-total">
                    <span className="total">{formatCurrency(transaction.totalAmount, transaction.currency)}</span>
                  </div>
                  <div className="col-status">
                    <span className={getStatusColor(transaction.status)}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                  <div className="col-date">
                    <span className="date">{formatDate(transaction.date)}</span>
                  </div>
                  <div className="col-actions">
                    <button 
                      className="btn-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTransaction(transaction);
                      }}
                    >
                      👁️ View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction Details Panel */}
        {selectedTransaction && (
          <div className="transaction-details-panel">
            <div className="panel-header">
              <h3>💳 Transaction Details</h3>
              <span className="transaction-id">{selectedTransaction.id}</span>
            </div>

            <div className="transaction-details">
              <div className="detail-section">
                <h4>📋 Basic Information</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Transaction ID:</label>
                    <span>{selectedTransaction.id}</span>
                  </div>
                  <div className="detail-item">
                    <label>Type:</label>
                    <span className={getTypeColor(selectedTransaction.type)}>
                      {getTypeIcon(selectedTransaction.type)} {selectedTransaction.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={getStatusColor(selectedTransaction.status)}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Date:</label>
                    <span>{formatDateTime(selectedTransaction.timestamp)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Buyer:</label>
                    <span>{selectedTransaction.buyer}</span>
                  </div>
                  <div className="detail-item">
                    <label>Seller:</label>
                    <span>{selectedTransaction.seller}</span>
                  </div>
                  <div className="detail-item">
                    <label>Project:</label>
                    <span>{selectedTransaction.project}</span>
                  </div>
                  <div className="detail-item">
                    <label>Payment Method:</label>
                    <span>{selectedTransaction.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>💰 Financial Details</h4>
                <div className="financial-grid">
                  <div className="financial-item">
                    <label>Credits Amount:</label>
                    <span className="amount">{selectedTransaction.amount.toLocaleString()} tons CO₂</span>
                  </div>
                  <div className="financial-item">
                    <label>Price per Ton:</label>
                    <span className="price">{formatCurrency(selectedTransaction.pricePerTon, selectedTransaction.currency)}</span>
                  </div>
                  <div className="financial-item">
                    <label>Total Amount:</label>
                    <span className="total">{formatCurrency(selectedTransaction.totalAmount, selectedTransaction.currency)}</span>
                  </div>
                  <div className="financial-item">
                    <label>Currency:</label>
                    <span>{selectedTransaction.currency}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>🔗 Blockchain Information</h4>
                <div className="blockchain-info">
                  <div className="blockchain-item">
                    <label>Network:</label>
                    <span>{selectedTransaction.blockchainNetwork}</span>
                  </div>
                  <div className="blockchain-item">
                    <label>Transaction Hash:</label>
                    <span className="hash">
                      {selectedTransaction.transactionHash ? 
                        `${selectedTransaction.transactionHash.substring(0, 20)}...` : 
                        'Not available'
                      }
                    </span>
                  </div>
                  <div className="blockchain-item">
                    <label>Verification Status:</label>
                    <span className={getStatusColor(selectedTransaction.verificationStatus)}>
                      {selectedTransaction.verificationStatus.charAt(0).toUpperCase() + selectedTransaction.verificationStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>📝 Notes</h4>
                <div className="notes-content">
                  <p>{selectedTransaction.notes}</p>
                </div>
              </div>

              <div className="transaction-actions">
                <button className="btn-primary">
                  📧 Contact Parties
                </button>
                <button className="btn-secondary">
                  🔗 View on Blockchain
                </button>
                <button className="btn-secondary">
                  📄 Download Receipt
                </button>
                {selectedTransaction.status === 'pending' && (
                  <button className="btn-danger">
                    ❌ Cancel Transaction
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
