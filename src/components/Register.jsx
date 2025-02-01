import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file
import storyImage from './images/story1.avif';

function Register() {
  const [name, setName] = useState(""); // Corrected the state hook for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("https://recipe-sharing-platform-yjed.onrender.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }), // Include name in the body
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registered successful!");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page-container">
      <img src={storyImage} alt="Story" className="login-image" />
      <div className="login-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="login-form">
          <input
            type="text" // Changed type to text since it's for name
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name instead of email
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Don't have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
