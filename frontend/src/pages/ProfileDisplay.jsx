import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../index.css";

export default function ProfileDisplay() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfileData(docSnap.data());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = () => navigate("/profile-form");

  if (loading) return <p>Loading...</p>;

  if (!profileData) {
    return (
      <div className="profile-display-container">
        <div className="no-profile">
          <h2>No Profile Found</h2>
          <p>Please complete your profile first.</p>
          <button onClick={() => navigate("/profile-form")} className="btn-primary">Create Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-display-container">
      <div className="profile-header-section">
        <div className="profile-cover">
          <div className="profile-avatar">
            {profileData.profileImageUrl ? (
              <img src={profileData.profileImageUrl} alt="Profile" />
            ) : (
              <div className="avatar-placeholder">
                {profileData.firstName?.charAt(0)}{profileData.lastName?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="profile-info">
          <div className="profile-name-section">
            <h1>{profileData.firstName} {profileData.lastName}</h1>
            <p>{profileData.role}</p>
            <p>📍 {profileData.location}</p>
          </div>

          <div className="profile-actions">
            <button onClick={handleEdit} className="btn-edit">✏️ Edit Profile</button>
            <button className="btn-connect">🤝 Connect</button>
            <button className="btn-message">💬 Message</button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h3>About</h3>
          <p>{profileData.bio || "No bio available"}</p>
        </div>

        <div className="profile-card">
          <h3>Contact Information</h3>
          <p>📧 {profileData.email}</p>
          {profileData.phone && <p>📱 {profileData.phone}</p>}
        </div>

        <div className="profile-card">
          <h3>Professional Information</h3>
          <p>🏢 {profileData.organization}</p>
          <p>Role: {profileData.role}</p>
        </div>
      </div>
    </div>
  );
}
