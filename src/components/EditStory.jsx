import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditStory.css'; // Import the CSS for styling

const EditStory = () => {
  const { id } = useParams(); // Get the story ID from the URL
  const navigate = useNavigate();
  const [story, setStory] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    image: ''
  });
  const [error, setError] = useState('');
  const [file, setFile] = useState(null); // To store the selected file

  useEffect(() => {
    // Fetch story by ID to populate fields
    const fetchStory = async () => {
      try {
        const response = await fetch(`https://travel-story-backend-0vwr.onrender.com/stories/story/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Format the date to "yyyy-MM-dd"
        const formattedDate = new Date(data.date).toISOString().split('T')[0];
        setStory({ ...data, date: formattedDate });
      } catch (error) {
        setError(`Error fetching story: ${error.message}`);
        console.error('Error fetching story:', error);
      }
    };

    fetchStory();
  }, [id]);

  const handleUpdateStory = async () => {
    if (!story.title || !story.description || !story.date || !story.location) {
      setError('Please fill out all fields');
      return;
    }

    // Prepare form data (including image file if provided)
    const formData = new FormData();
    formData.append('title', story.title);
    formData.append('description', story.description);
    formData.append('date', story.date);
    formData.append('location', story.location);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await fetch(`https://travel-story-backend-0vwr.onrender.com/stories/story/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        alert('Story updated successfully!');
        navigate('/'); // Redirect back to the dashboard
      } else {
        setError('Error updating story');
      }
    } catch (error) {
      setError('Error updating story');
      console.error('Error updating story:', error);
    }
  };

  const handleDeleteStory = async () => {
    try {
      const response = await fetch(`https://travel-story-backend-0vwr.onrender.com/stories/story/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Story deleted successfully!');
        navigate('/'); // Redirect back to the dashboard
      } else {
        setError('Error deleting story');
      }
    } catch (error) {
      setError('Error deleting story');
      console.error('Error deleting story:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // Store the selected file
    }
  };

  return (
    <div className="edit-story-container">
      <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>

      <h2>Edit Story</h2>

      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          placeholder="Enter story title"
        />
      </div>

      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={story.date}
          onChange={(e) => setStory({ ...story, date: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Story</label>
        <textarea
          value={story.description}
          onChange={(e) => setStory({ ...story, description: e.target.value })}
          placeholder="Write your story..."
        />
      </div>

      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          value={story.location}
          onChange={(e) => setStory({ ...story, location: e.target.value })}
          placeholder="Enter location"
        />
      </div>

      <div className="form-group">
        <label>Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {story.image && <img src={story.image} alt="Story" className="image-preview" />}
      </div>

      <button onClick={handleUpdateStory}>Update Story</button>
      <button onClick={handleDeleteStory} className="delete-btn">Delete Story</button>
    </div>
  );
};

export default EditStory;
