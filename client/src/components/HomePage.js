// client/src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>ברוכים הבאים למעקב הכושר שלכם</h1>
      <p>עקבו אחר ההתקדמות שלכם, הציבו יעדים, והשיגו את מטרות הכושר שלכם</p>
      <div className="cta-buttons">
        <Link to="/login" className="btn btn-primary">התחברות</Link>
        <Link to="/register" className="btn btn-secondary">הרשמה</Link>
      </div>
    </div>
  );
}

export default HomePage;