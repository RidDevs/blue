import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Marketplace() {
  const [userProjects, setUserProjects] = useState([]);
  const [marketListings, setMarketListings] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [listingData, setListingData] = useState({
    creditsToSell: "",
    pricePerCredit: "",
    description: "",
    availableFrom: "",
    expiryDate: ""
  });

  useEffect(() => {
    // Load user projects and market listings
    const projects = JSON.parse(localStorage.getItem('userProjects') || '[]');
    const listings = JSON.parse(localStorage.getItem('marketListings') || '[]');
    setUserProjects(projects.filter(p => p.status === 'verified'));
    setMarketListings(listings);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!selectedProject) {
      alert('Please select a project first');
      return;
    }

    const newListing = {
      ...listingData,
      id: Date.now(),
      projectId: selectedProject.id,
      projectName: selectedProject.projectName,
      projectType: selectedProject.projectType,
      location: selectedProject.location,
      sellerId: localStorage.getItem('userEmail'),
      status: 'active',
      createdAt: new Date().toISOString()
    };

    const existingListings = JSON.parse(localStorage.getItem('marketListings') || '[]');
    existingListings.push(newListing);
    localStorage.setItem('marketListings', JSON.stringify(existingListings));
    setMarketListings(existingListings);

    alert('Listing created successfully!');
    // Reset form
    setListingData({
      creditsToSell: "",
      pricePerCredit: "",
      description: "",
      availableFrom: "",
      expiryDate: ""
    });
    setSelectedProject(null);
  };

  const getUserListings = () => {
    const userEmail = localStorage.getItem('userEmail');
    return marketListings.filter(listing => listing.sellerId === userEmail);
  };

  const getOtherListings = () => {
    const userEmail = localStorage.getItem('userEmail');
    return marketListings.filter(listing => listing.sellerId !== userEmail && listing.status === 'active');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">💰 Carbon Credit Marketplace</h1>
        <p className="page-subtitle">Sell your verified carbon credits and discover opportunities</p>
      </div>

      <div className="marketplace-content">
        {/* Create New Listing */}
        <div className="marketplace-section">
          <h3>🏷️ Create New Listing</h3>
          
          {/* Project Selection */}
          <div className="project-selection">
            <h4>Select Verified Project</h4>
            <div className="project-grid">
              {userProjects.length > 0 ? (
                userProjects.map(project => (
                  <div 
                    key={project.id} 
                    className={`project-card ${selectedProject?.id === project.id ? 'selected' : ''}`}
                    onClick={() => setSelectedProject(project)}
                  >
                    <h5>{project.projectName}</h5>
                    <p><strong>Type:</strong> {project.projectType}</p>
                    <p><strong>Location:</strong> {project.location}</p>
                    <p><strong>Expected Credits:</strong> {project.expectedCredits}</p>
                    <span className="status-badge verified">Verified</span>
                  </div>
                ))
              ) : (
                <div className="no-projects">
                  <p>No verified projects available. <Link to="/add-project">Add a project</Link> and complete verification first.</p>
                </div>
              )}
            </div>
          </div>

          {/* Listing Form */}
          {selectedProject && (
            <form className="listing-form" onSubmit={handleCreateListing}>
              <h4>Create Listing for: {selectedProject.projectName}</h4>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="creditsToSell">Credits to Sell *</label>
                  <input
                    type="number"
                    id="creditsToSell"
                    name="creditsToSell"
                    value={listingData.creditsToSell}
                    onChange={handleInputChange}
                    required
                    placeholder="Number of credits"
                    max={selectedProject.expectedCredits}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pricePerCredit">Price per Credit ($) *</label>
                  <input
                    type="number"
                    id="pricePerCredit"
                    name="pricePerCredit"
                    value={listingData.pricePerCredit}
                    onChange={handleInputChange}
                    required
                    placeholder="Price in USD"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="availableFrom">Available From *</label>
                  <input
                    type="date"
                    id="availableFrom"
                    name="availableFrom"
                    value={listingData.availableFrom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="expiryDate">Listing Expiry</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={listingData.expiryDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={listingData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your carbon credits, project benefits, and any additional information..."
                  rows="3"
                />
              </div>

              <button type="submit" className="btn-primary">
                Create Listing
              </button>
            </form>
          )}
        </div>

        {/* Your Active Listings */}
        <div className="marketplace-section">
          <h3>📋 Your Active Listings</h3>
          <div className="listings-grid">
            {getUserListings().map(listing => (
              <div key={listing.id} className="listing-card own-listing">
                <div className="listing-header">
                  <h4>{listing.projectName}</h4>
                  <span className={`status-badge ${listing.status}`}>{listing.status}</span>
                </div>
                <div className="listing-details">
                  <p><strong>Credits:</strong> {listing.creditsToSell}</p>
                  <p><strong>Price:</strong> ${listing.pricePerCredit}/credit</p>
                  <p><strong>Total Value:</strong> ${(listing.creditsToSell * listing.pricePerCredit).toFixed(2)}</p>
                  <p><strong>Type:</strong> {listing.projectType}</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                </div>
                <div className="listing-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Remove</button>
                </div>
              </div>
            ))}
            {getUserListings().length === 0 && (
              <p className="no-listings">You haven't created any listings yet.</p>
            )}
          </div>
        </div>

        {/* Browse Market */}
        <div className="marketplace-section">
          <h3>🛒 Browse Available Credits</h3>
          <div className="listings-grid">
            {getOtherListings().map(listing => (
              <div key={listing.id} className="listing-card market-listing">
                <div className="listing-header">
                  <h4>{listing.projectName}</h4>
                  <span className="project-type">{listing.projectType}</span>
                </div>
                <div className="listing-details">
                  <p><strong>Credits Available:</strong> {listing.creditsToSell}</p>
                  <p><strong>Price:</strong> ${listing.pricePerCredit}/credit</p>
                  <p><strong>Location:</strong> {listing.location}</p>
                  <p><strong>Available From:</strong> {new Date(listing.availableFrom).toLocaleDateString()}</p>
                  {listing.description && <p><strong>Description:</strong> {listing.description}</p>}
                </div>
                <div className="listing-actions">
                  <button className="btn-primary">Contact Seller</button>
                  <button className="btn-secondary">View Details</button>
                </div>
              </div>
            ))}
            {getOtherListings().length === 0 && (
              <p className="no-listings">No credits available in the marketplace currently.</p>
            )}
          </div>
        </div>

        {/* Market Statistics */}
        <div className="marketplace-section">
          <h3>📊 Market Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{marketListings.length}</div>
              <div className="stat-label">Total Listings</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {marketListings.reduce((sum, listing) => sum + parseInt(listing.creditsToSell || 0), 0)}
              </div>
              <div className="stat-label">Credits Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                ₹{marketListings.length > 0 ? 
                  (marketListings.reduce((sum, listing) => sum + parseFloat(listing.pricePerCredit || 0), 0) / marketListings.length).toFixed(2) 
                  : '0.00'}
              </div>
              <div className="stat-label">Avg. Price/Credit</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{getUserListings().length}</div>
              <div className="stat-label">Your Listings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
