// client/src/components/Register.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });
      alert('ההרשמה הושלמה בהצלחה');
      history.push('/login');
    } catch (error) {
      alert('ההרשמה נכשלה');
    }
  };

  return (
    <div>
      <h2>הרשמה</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="שם משתמש" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="סיסמה" required />
        <button type="submit">הירשם</button>
      </form>
      <p>כבר יש לך חשבון? <Link to="/login">התחבר כאן</Link></p>
    </div>
  );
}

export default Register;