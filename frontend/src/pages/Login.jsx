import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Sign in user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);

        // Redirect based on role
        navigate(`/${role}`);
      } else {
        alert("No role found for this user!");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="profile-icon">👨🏻‍💼</div>
        <h2 className="login-title">Login</h2>

        <input type="email" placeholder="Email ID" className="login-input"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" className="login-input"
          value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin} className="login-btn">LOGIN</button>

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div class="back"><a href="./"><button>❮ Back to Home</button></a></div>
    </div>
  );
}
