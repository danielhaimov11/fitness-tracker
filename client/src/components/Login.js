import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      history.push('/dashboard');
    } catch (error) {
      alert('פרטי התחברות שגויים');
    }
  };

  return (
    <div>
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="שם משתמש" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="סיסמה" required />
        <button type="submit">התחבר</button>
      </form>
      <p>אין לך חשבון? <Link to="/register">הירשם כאן</Link></p>
    </div>
  );
}

export default Login;