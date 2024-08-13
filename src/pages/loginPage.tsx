import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '20px',
    width: '300px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '5px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  text: {
    textAlign: 'center' as const,
    marginTop: '10px',
    color: '#333',
  },
  link: {
    color: '#2196f3',
    textDecoration: 'none',
  },
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
    navigate('/'); // redirect to home
  };

  return (
    <Grid container style={styles.container}>
      <Grid item xs={12} sm={6} md={4}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
          <p style={styles.text}>
            Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
          </p>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
