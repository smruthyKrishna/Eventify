// src/components/Login/Login.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();                   // ⬅️ programmatic nav

  const handleLogin = async () => {
    if (!password.trim()) {
      alert('Password cannot be empty');
      return;
    }

    // ────────────────────────────────
    // ⚙️  ADMIN SHORT-CIRCUIT
    // ────────────────────────────────
    if (username === 'admin' && password === '123') {
      localStorage.setItem('loginStatus', 'true');
      localStorage.setItem('user', 'admin');
      alert('Welcome admin');
      navigate('/');                                // ⬅️ send to home
      return;
    }

    // ────────────────────────────────
    // ⚙️  NORMAL USER LOGIN
    // ────────────────────────────────
    try {
      const { data, status } = await Axios.get(
        `https://eventhub-t514.onrender.com/eventRoute/check-user/${username}`
      );

      if (status !== 200 || !data) {
        alert('Incorrect username or password');
        return;
      }

      if (data.password !== password) {
        alert('Incorrect username or password');
        return;
      }

      // ✅ success
      localStorage.setItem('loginStatus', 'true');
      localStorage.setItem('user', username);
      localStorage.setItem('userID', data._id);
      navigate('/');                                // ⬅️ redirect after login
    } catch (err) {
      console.error('Login API error:', err);
      alert('Login failed – please try again.');
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* button only – no nested anchor */}
      <button className="btnn" type="button" onClick={handleLogin}>
        Login
      </button>

      <p className="link">
        Don&apos;t have an account?&nbsp;
        <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
