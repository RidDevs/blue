import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'farmer',
    organization: '',
    phone: '',
    location: ''
  });

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Dr. Marina Santos',
        email: 'marina.santos@ocean.org',
        role: 'farmer',
        organization: 'Ocean Conservation Institute',
        phone: '+1-555-0123',
        location: 'Miami, Florida',
        joinDate: '2023-06-15',
        status: 'active',
        projects: 5,
        credits: 1500,
        lastActive: '2024-01-20',
        avatar: '👩‍🔬'
      },
      {
        id: 2,
        name: 'James Chen',
        email: 'james.chen@bluecarbon.com',
        role: 'buyer',
        organization: 'Green Investment Corp',
        phone: '+1-555-0456',
        location: 'San Francisco, CA',
        joinDate: '2023-08-22',
        status: 'active',
        projects: 0,
        credits: 0,
        purchases: 3200,
        lastActive: '2024-01-19',
        avatar: '👨‍💼'
      },
      {
        id: 3,
        name: 'Sarah Williams',
        email: 'sarah.williams@reef.org',
        role: 'farmer',
        organization: 'Coral Reef Foundation',
        phone: '+1-555-0789',
        location: 'Honolulu, Hawaii',
        joinDate: '2023-04-10',
        status: 'active',
        projects: 8,
        credits: 2400,
        lastActive: '2024-01-18',
        avatar: '👩‍🌾'
      },
      {
        id: 4,
        name: 'Admin User',
        email: 'admin@bluecarbon.org',
        role: 'admin',
        organization: 'Blue Carbon Registry',
        phone: '+1-555-0000',
        location: 'New York, NY',
        joinDate: '2023-01-01',
        status: 'active',
        projects: 0,
        credits: 0,
        lastActive: '2024-01-20',
        avatar: '👨‍💻'
      },
      {
        id: 5,
        name: 'Miguel Rodriguez',
        email: 'miguel.rodriguez@mangrove.org',
        role: 'farmer',
        organization: 'Mangrove Restoration Society',
        phone: '+1-555-0321',
        location: 'Tampa, Florida',
        joinDate: '2023-09-05',
        status: 'pending',
        projects: 2,
        credits: 600,
        lastActive: '2024-01-15',
        avatar: '👨‍🔬'
      },
      {
        id: 6,
        name: 'Lisa Thompson',
        email: 'lisa.thompson@ecoinvest.com',
        role: 'buyer',
        organization: 'Eco Investment Partners',
        phone: '+1-555-0654',
        location: 'Seattle, WA',
        joinDate: '2023-11-12',
        status: 'active',
        projects: 0,
        credits: 0,
        purchases: 1800,
        lastActive: '2024-01-17',
        avatar: '👩‍💼'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.organization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'role-badge admin';
      case 'farmer':
        return 'role-badge farmer';
      case 'buyer':
        return 'role-badge buyer';
      default:
        return 'role-badge default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'status-badge verified';
      case 'pending':
        return 'status-badge pending';
      case 'suspended':
        return 'status-badge rejected';
      default:
        return 'status-badge no-reports';
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      projects: 0,
      credits: 0,
      lastActive: new Date().toISOString().split('T')[0],
      avatar: newUser.role === 'farmer' ? '👩‍🌾' : newUser.role === 'buyer' ? '👨‍💼' : '👨‍💻'
    };
    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      role: 'farmer',
      organization: '',
      phone: '',
      location: ''
    });
    setShowAddUser(false);
  };

  const userStats = {
    total: users.length,
    farmers: users.filter(u => u.role === 'farmer').length,
    buyers: users.filter(u => u.role === 'buyer').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">👥 User Management</h1>
        <p className="page-subtitle">
          Manage user accounts, roles, and permissions across the platform
        </p>
      </div>

      {/* User Statistics */}
      <div className="user-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.total}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👩‍🌾</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.farmers}</div>
            <div className="stat-label">Farmers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.buyers}</div>
            <div className="stat-label">Buyers</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍💻</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.admins}</div>
            <div className="stat-label">Admins</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.active}</div>
            <div className="stat-label">Active</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-number">{userStats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="user-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Roles</option>
            <option value="farmer">Farmers</option>
            <option value="buyer">Buyers</option>
            <option value="admin">Admins</option>
          </select>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowAddUser(true)}
        >
          ➕ Add New User
        </button>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddUser(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Organization</label>
                  <input
                    type="text"
                    value={newUser.organization}
                    onChange={(e) => setNewUser({...newUser, organization: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={newUser.location}
                    onChange={(e) => setNewUser({...newUser, location: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowAddUser(false)}
              >
                Cancel
              </button>
              <button 
                className="btn-primary"
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="users-content">
        <div className="users-list">
          <div className="list-header">
            <h3>👥 All Users ({filteredUsers.length})</h3>
          </div>
          
          <div className="users-grid">
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className={`user-card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <div className="user-header">
                  <div className="user-avatar">
                    <span className="avatar-icon">{user.avatar}</span>
                  </div>
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p className="user-email">{user.email}</p>
                  </div>
                  <div className="user-badges">
                    <span className={getRoleColor(user.role)}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="user-details">
                  <p><strong>Organization:</strong> {user.organization}</p>
                  <p><strong>Location:</strong> {user.location}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Joined:</strong> {user.joinDate}</p>
                  <p><strong>Last Active:</strong> {user.lastActive}</p>
                </div>

                <div className="user-stats">
                  {user.role === 'farmer' && (
                    <>
                      <div className="stat">
                        <span className="stat-label">Projects:</span>
                        <span className="stat-value">{user.projects}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Credits:</span>
                        <span className="stat-value">{user.credits} tons</span>
                      </div>
                    </>
                  )}
                  {user.role === 'buyer' && (
                    <>
                      <div className="stat">
                        <span className="stat-label">Purchases:</span>
                        <span className="stat-value">{user.purchases || 0} tons</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Details Panel */}
        {selectedUser && (
          <div className="user-details-panel">
            <div className="panel-header">
              <h3>👤 User Details</h3>
              <span className="user-name">{selectedUser.name}</span>
            </div>

            <div className="user-profile">
              <div className="profile-section">
                <h4>📋 Basic Information</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Role:</label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => handleRoleChange(selectedUser.id, e.target.value)}
                      className="role-select"
                    >
                      <option value="farmer">Farmer</option>
                      <option value="buyer">Buyer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="info-item">
                    <label>Status:</label>
                    <select
                      value={selectedUser.status}
                      onChange={(e) => handleStatusChange(selectedUser.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="info-item">
                    <label>Organization:</label>
                    <span>{selectedUser.organization}</span>
                  </div>
                  <div className="info-item">
                    <label>Location:</label>
                    <span>{selectedUser.location}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone:</label>
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Join Date:</label>
                    <span>{selectedUser.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h4>📊 Activity Summary</h4>
                <div className="activity-stats">
                  {selectedUser.role === 'farmer' && (
                    <>
                      <div className="activity-item">
                        <span className="activity-label">Projects Submitted:</span>
                        <span className="activity-value">{selectedUser.projects}</span>
                      </div>
                      <div className="activity-item">
                        <span className="activity-label">Carbon Credits Generated:</span>
                        <span className="activity-value">{selectedUser.credits} tons CO₂</span>
                      </div>
                    </>
                  )}
                  {selectedUser.role === 'buyer' && (
                    <>
                      <div className="activity-item">
                        <span className="activity-label">Credits Purchased:</span>
                        <span className="activity-value">{selectedUser.purchases || 0} tons CO₂</span>
                      </div>
                    </>
                  )}
                  <div className="activity-item">
                    <span className="activity-label">Last Active:</span>
                    <span className="activity-value">{selectedUser.lastActive}</span>
                  </div>
                </div>
              </div>

              <div className="profile-actions">
                <button className="btn-primary">
                  📧 Send Message
                </button>
                <button className="btn-secondary">
                  📊 View Activity
                </button>
                <button className="btn-danger">
                  🚫 Suspend User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
