import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://travel-story-backend-0vwr.onrender.com/auth/me', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login'); // Redirect if not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch('https://travel-story-backend-0vwr.onrender.com/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      navigate('/login'); // Redirect after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <h2>Welcome, {user.name}</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
