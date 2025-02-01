import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css'; // Import the CSS

const Navigation = () => {
  const navigate = useNavigate();

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
    <div className="navbar">
      <h2 className='title'>Travel Story</h2>
      {/* Add more items to your navbar if needed */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navigation;
