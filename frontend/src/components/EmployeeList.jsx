import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        //const userToken=
        localStorage.removeItem('userToken');
        navigate('/');
    };
  const [employees, setEmployees] = useState([]);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch employee data from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      
      try {
        const response = await axios.get('http://localhost:8000/api/');
        setEmployees(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  // Sort employees based on the selected field
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);

    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setEmployees(sortedEmployees);
  };

  // Filter employees based on the search query
  const filteredEmployees = Array.isArray(employees)
    ? employees.filter((employee) =>
        Object.values(employee)
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];
    
  // Handle delete action
  const handleDelete = async (id) => {
    console.log('Deleting employee with id:', id);
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee. Please try again.');
    }
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
    <div style={styles.container}>
      <h2>Employee List</h2>

      {/* Search Bar */}
      <div style={styles.searchBar}>
        <input
          type="text"
          placeholder="Enter search keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Employee Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('_id')}>ID {sortField === 'id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Image</th>
            <th onClick={() => handleSort('name')}>Name {sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th onClick={() => handleSort('email')}>Email {sortField === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort('createdAt')}>Create Date {sortField === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          
          {filteredEmployees.map((employee,index) => (
            <tr key={employee._id}>
              <td>{index}</td>
              <td>
                <img src={`/uploads/${employee.image}`} alt={employee.name} style={styles.image} />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit-employee/${employee._id}`} style={styles.actionButton} >
                  Edit
                </Link>
                <button style={styles.actionButton} onClick={() => handleDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
            
          ))
          }
        </tbody>
      </table>
    </div>
    </div>
  );
};

// Inline styles 
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
  container: {
    width: '90%',
    margin: '0 auto',
    textAlign: 'left',
  },
  searchBar: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  image: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  actionButton: {
    margin: '0 5px',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
    backgroundColor: 'orange'
  },
};

export default EmployeeList;
