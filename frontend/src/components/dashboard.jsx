import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //const userToken=
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.logo}>Employee Management</h1>
        <nav style={styles.nav}>
          <Link to="/employee-list" style={styles.link}>Employee List</Link>
          <Link to="/create-employee" style={styles.link}>Create Employee</Link>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </nav>
      </header>

      {/* Welcome Section */}
      <main style={styles.main}>
        <h2>Welcome Admin Panel</h2>
        <p>Use the navigation links above to manage employees.</p>
      </main>
    </div>
  );
};

// Inline styling 
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  main: {
    textAlign: 'center',
    marginTop: '2rem',
  },
};

export default Dashboard;
