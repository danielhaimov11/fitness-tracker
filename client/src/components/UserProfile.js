// client/src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    height: '',
    weight: '',
    goal: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('שגיאה בטעינת הפרופיל:', error);
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('הפרופיל עודכן בהצלחה');
    } catch (error) {
      console.error('שגיאה בעדכון הפרופיל:', error);
      alert('שגיאה בעדכון הפרופיל');
    }
  };

  return (
    <div className="user-profile">
      <h2>הפרופיל שלי</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={profile.username} onChange={handleInputChange} placeholder="שם משתמש" disabled />
        <input type="email" name="email" value={profile.email} onChange={handleInputChange} placeholder="אימייל" />
        <input type="number" name="height" value={profile.height} onChange={handleInputChange} placeholder='גובה (בס"מ)' />
        <input type="number" name="weight" value={profile.weight} onChange={handleInputChange} placeholder='משקל (בק"ג)' />
        <textarea name="goal" value={profile.goal} onChange={handleInputChange} placeholder="היעד שלי"></textarea>
        <button type="submit">עדכן פרופיל</button>
      </form>
    </div>
  );
}

export default UserProfile;
