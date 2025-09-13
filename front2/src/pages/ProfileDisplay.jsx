import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function ProfileDisplay() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    // Redirect to profile form for editing
    window.location.href = '/profile-form';
  };

  if (!profileData) {
    return (
      <div className="profile-display-container">
        <div className="no-profile">
          <h2>No Profile Found</h2>
          <p>Please complete your profile first.</p>
          <Link to="/profile-form" className="btn-primary">
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-display-container">
      {/* Profile Header Section */}
      <div className="profile-header-section">
        <div className="profile-cover">
          <div className="profile-avatar">
            {profileData.profileImage ? (
              <img src={URL.createObjectURL(profileData.profileImage)} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-info">
          <div className="profile-name-section">
            <h1 className="profile-name">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="profile-role">{profileData.role}</p>
            <p className="profile-location">📍 {profileData.location}</p>
          </div>
          
          <div className="profile-actions">
            <button onClick={handleEdit} className="btn-edit">
              ✏️ Edit Profile
            </button>
            <button className="btn-connect">
              🤝 Connect
            </button>
            <button className="btn-message">
              💬 Message
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* About Section */}
        <div className="profile-card">
          <div className="card-header">
            <h3>About</h3>
          </div>
          <div className="card-content">
            <p className="profile-bio">
              {profileData.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Contact Information</h3>
          </div>
          <div className="card-content">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <span className="contact-value">{profileData.email}</span>
              </div>
            </div>
            {profileData.phone && (
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <div className="contact-details">
                  <span className="contact-label">Phone</span>
                  <span className="contact-value">{profileData.phone}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Professional Information */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Professional Information</h3>
          </div>
          <div className="card-content">
            <div className="professional-item">
              <div className="professional-icon">🏢</div>
              <div className="professional-details">
                <h4>Current Role</h4>
                <p className="role-title">{profileData.role}</p>
                {profileData.organization && (
                  <p className="organization">{profileData.organization}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="card-content">
            <div className="activity-item">
              <div className="activity-icon">🌱</div>
              <div className="activity-content">
                <p><strong>Joined Blue Carbon Platform</strong></p>
                <span className="activity-time">Recently</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p><strong>Profile Completed</strong></p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Skills & Interests</h3>
          </div>
          <div className="card-content">
            <div className="skills-grid">
              <span className="skill-tag">Blue Carbon</span>
              <span className="skill-tag">Sustainability</span>
              <span className="skill-tag">Environmental Science</span>
              <span className="skill-tag">Carbon Credits</span>
              <span className="skill-tag">Climate Action</span>
              <span className="skill-tag">Marine Conservation</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Platform Statistics</h3>
          </div>
          <div className="card-content">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Credits Earned</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1</div>
                <div className="stat-label">Connections</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">0</div>
                <div className="stat-label">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
