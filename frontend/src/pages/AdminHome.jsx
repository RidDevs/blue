import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import "../index.css";
import adminImg from '../assets/admin.png';


export default function AdminHome() {
  const [stats, setStats] = useState({
    activeProjects: 0,           // verified projects
    pendingProjects: 0,
    totalCreditsGenerated: 0,
    totalFarmers: 0,
    totalBuyers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projectsRef = collection(db, "projects");
        const usersRef = collection(db, "users");

        // Verified projects count
        const verifiedSnap = await getDocs(
          query(projectsRef, where("status", "==", "verified"))
        );

        // Pending projects count
        const pendingSnap = await getDocs(
          query(projectsRef, where("status", "==", "pending"))
        );

        // Total credits generated across all projects
        let totalCredits = 0;
        const allProjectsSnap = await getDocs(projectsRef);
        allProjectsSnap.forEach((doc) => {
          const data = doc.data();
          totalCredits += parseFloat(data.creditsGenerated || 0);
        });

        // Farmers & buyers
        const farmerSnap = await getDocs(query(usersRef, where("role", "==", "farmer")));
        const buyerSnap = await getDocs(query(usersRef, where("role", "==", "buyer")));

        setStats({
          activeProjects: verifiedSnap.size,
          pendingProjects: pendingSnap.size,
          totalCreditsGenerated: totalCredits,
          totalFarmers: farmerSnap.size,
          totalBuyers: buyerSnap.size,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div
          className="hero-section hero-admin"
          style={{
            height: "50vh",
            minHeight: "50vh",
            maxHeight: "50vh",
            backgroundImage: `url(${adminImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div className="admin-admin">
            <h1>Welcome to the Admin Site.</h1>
          </div>
          <div className="hero-content">
            <div className="hero-actions">
              <Link to="/project-verification" className="btn-hero-primary">
                Review Projects
              </Link>

               {/* 
               <Link to="/platform-analytics" className="btn-hero-secondary">
                View Analytics
              </Link>  
              */}

            </div>
          </div>
        </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">✅</div>
          <h3>Project Verification</h3>
          <p>Review and approve carbon credit projects</p>
          <Link to="/project-verification" className="card-button">
            Review Projects
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Platform Analytics</h3>
          <p>Monitor platform performance and transactions</p>
          <Link to="/platform-analytics" className="card-button">
            View Analytics
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">⚙️</div>
          <h3>System Settings</h3>
          <p>Configure platform settings and parameters</p>
          <Link to="/system-settings" className="card-button">
            Settings
          </Link>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="admin-stats">
        <h2>Platform Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.activeProjects}</div>
            <div className="stat-label">Verified Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalFarmers}</div>
            <div className="stat-label">Registered Farmers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalBuyers}</div>
            <div className="stat-label">Active Buyers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalCreditsGenerated}</div>
            <div className="stat-label">Credits Generated</div>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      <div className="pending-actions">
        <h2>Pending Actions</h2>
        <div className="action-list">
          <div className={`action-item ${stats.pendingProjects > 0 ? "urgent" : ""}`}>
            <span className="action-icon">⚠️</span>
            <span>{stats.pendingProjects} projects awaiting verification</span>
            <Link to="/project-verification" className="action-link">Review</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
