import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
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
    borderRadius: '5px',
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
};

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(username, password);
    if (success) {
      navigate('/login'); // redirect to login after successful registration
    }
  };

  return (
    <Grid container style={styles.container}>
      <Grid item xs={12} sm={6} md={4}>
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Register</h2>
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
              Register
            </button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
