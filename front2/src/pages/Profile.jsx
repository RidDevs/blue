import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import "../index.css";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    location: "",
    bio: "",
    profileImage: null
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData({ ...docSnap.data(), profileImage: null });
        } else {
          setProfileData(prev => ({ ...prev, email: user.email }));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileData(prev => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) return alert("You must be signed in to save profile.");

      let imageUrl = profileData.profileImageUrl || "";

      // ✅ Safe image upload
      const file = profileData.profileImage;
      if (file instanceof File) {
        const storage = getStorage();
        // Add timestamp to avoid overwriting previous images
        const storageRef = ref(storage, `profiles/${user.uid}_${Date.now()}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Save profile data to Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          ...profileData,
          profileImageUrl: imageUrl,
          profileImage: null, // remove the file blob
          updatedAt: serverTimestamp(),
          email: user.email
        },
        { merge: true } // merge to avoid overwriting other fields
      );

      alert("Profile saved successfully!");
      navigate(`/${profileData.role || "dashboard"}`);
    } catch (err) {
      console.error("Profile save error:", err);
      alert("Error saving profile: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">🔧 Build Your Profile</h1>
        <p className="profile-subtitle">Complete your profile to get the most out of the platform</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleInputChange} required placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleInputChange} required placeholder="Enter your last name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} required placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} placeholder="Enter your phone number" />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="form-section">
          <h3>Professional Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input type="text" id="organization" name="organization" value={profileData.organization} onChange={handleInputChange} placeholder="Company/Organization name" />
            </div>
            <div className="form-group">
              <label htmlFor="role">Role *</label>
              <select id="role" name="role" value={profileData.role} onChange={handleInputChange} required>
                <option value="">Select your role</option>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
                <option value="admin">Admin</option>
                <option value="verifier">Verifier</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={profileData.location} onChange={handleInputChange} placeholder="City, Country" />
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleImageChange} className="file-input" />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} placeholder="Tell us about yourself..." rows="4" />
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-primary">Save Profile</button>
          <button type="button" className="btn-secondary" onClick={() => navigate(`/${profileData.role || "dashboard"}`)}>Skip for Now</button>
        </div>
      </form>
    </div>
  );
}
