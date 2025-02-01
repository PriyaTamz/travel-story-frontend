import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import defaultImage from './images/download.jpg';
import Navigation from './Navigation';
import './Dashboard.css';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null); // Store user profile data
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://travel-story-backend-0vwr.onrender.com/auth/me', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://travel-story-backend-0vwr.onrender.com/stories/story');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="dashboard-container">
       <Navigation />
      {/* Add Story Button */}
      <button className="add-story-btn" onClick={() => navigate('/create-story')}>
        +
      </button>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Stories Section */}
      <div className="stories-container">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story._id}
              className="story-card"
              onClick={() => navigate(`/edit-story/${story._id}`)}
            >
              <img src={defaultImage} alt="default" />
              <h3>{story.title}</h3>
              <small>{new Date(story.date).toLocaleDateString()}</small>
              <p>{story.description}</p>
              <p><strong>Location:</strong> {story.location}</p>
            </div>
          ))
        ) : (
          <div className="dashboard-header">
            <h1>Start creating your first story</h1>
            <p>Click the button below to add your thoughts and get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
