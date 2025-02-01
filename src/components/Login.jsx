import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import CSS file
import storyImage from './images/story1.avif';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Effect to add "no-scroll" class when the login page is loaded
  useEffect(() => {
    document.body.classList.add("no-scroll");

    // Cleanup function to remove the class when the component is unmounted
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("https://travel-story-backend-0vwr.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page-container">
      <img src={storyImage} alt="Story" className="login-image" />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
