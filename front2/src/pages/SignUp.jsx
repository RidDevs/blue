import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
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
    // Here you would typically handle the signup logic
    alert("Account created successfully!");
    navigate(`/${role}`);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Profile Icon */}
        <div className="profile-icon">👨🏻‍💼</div>

        <h2 className="login-title">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="login-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email ID"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="login-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Role Selection */}
        <div className="role-buttons">
          <button
            onClick={() => setRole("farmer")}
            className={role === "farmer" ? "active" : ""}
          >
            🌾 Farmer
          </button>
          <button
            onClick={() => setRole("buyer")}
            className={role === "buyer" ? "active" : ""}
          >
            🛒 Buyer
          </button>
          <button
            onClick={() => setRole("admin")}
            className={role === "admin" ? "active" : ""}
          >
            🛡️ Admin
          </button>
        </div>

        <button onClick={handleSignUp} className="login-btn">
          CREATE ACCOUNT
        </button>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
