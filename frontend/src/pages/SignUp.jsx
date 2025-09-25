import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../index.css";
import "./DefaultLanding"

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!role) {
      alert("Please select a role!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true); // start spinner

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Save extra details in Firestore
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role,
        createdAt: new Date()
      });

      alert("Account created successfully!");
      navigate("/login"); // redirect to login
    } catch (error) {
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false); // stop spinner
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="profile-icon">👨🏻‍💼</div>
        <h2 className="login-title">Create Account</h2>

        <input type="text" placeholder="Full Name" className="login-input"
          value={name} onChange={(e) => setName(e.target.value)} />

        <input type="email" placeholder="Email ID" className="login-input"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" className="login-input"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <input type="password" placeholder="Confirm Password" className="login-input"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <div className="role-buttons">
          <button onClick={() => setRole("farmer")} className={role === "farmer" ? "active" : ""}>🌾 Farmer</button>
          <button onClick={() => setRole("buyer")} className={role === "buyer" ? "active" : ""}>🛒 Buyer</button>
          <button onClick={() => setRole("admin")} className={role === "admin" ? "active" : ""}>🛡️ Admin</button>
        </div>

        <button onClick={handleSignUp} className="login-btn" disabled={loading}>
          {loading ? "Creating Account..." : "CREATE ACCOUNT"}
        </button>

        {loading && <div className="spinner"></div>} {/* 🔥 Spinner */}

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
      <div className="back"><a href="./"><button> ❮ Back to Home </button></a></div>
    </div>
  );
}
