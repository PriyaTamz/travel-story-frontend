import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation
import './CreateStory.css';

const CreateStory = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // to redirect to dashboard

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);

    try {
      const response = await axios.post('https://travel-story-backend-0vwr.onrender.com/stories/story', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log('Story created:', response.data);
      navigate('/dashboard'); // Redirect after submission
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleClose = () => {
    navigate('/dashboard'); // Navigate back to the dashboard
  };

  return (
    <div className="create-story-container">
      <div className="close-btn" onClick={handleClose}>X</div>
      <h1>Create Your Story</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Story</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit">Create Story</button>
      </form>
    </div>
  );
};

export default CreateStory;
