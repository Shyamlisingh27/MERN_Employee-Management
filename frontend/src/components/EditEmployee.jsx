import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EmployeeEdit = () => {
  const { id } = useParams(); // Fetching employee ID from route params
  const navigate = useNavigate();
  console.log(id);
  

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch employee data on component load
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/${id}`);
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          mobile: response.data.mobile || '',
          designation: response.data.designation || '',
          gender: response.data.gender || '',
          course: response.data.course || [], // Fallback to an empty array
          image: null,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Unable to fetch employee details.');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({ ...prev, course: [...prev.course, value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        course: prev.course.filter((c) => c !== value),
      }));
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Validate and submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name || !formData.email || !formData.mobile || !formData.designation || !formData.gender || formData.course.length === 0) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Invalid email format.');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setError('Mobile number must be 10 digits.');
      return;
    }

    // Submit form data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('mobile', formData.mobile);
    data.append('designation', formData.designation);
    data.append('gender', formData.gender);
    data.append('course', JSON.stringify(formData.course.join(', '))); // Serialize array
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:8000/api/update/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee updated successfully!');
      navigate('/employee-list'); // Redirect to the Employee List page
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
      setError('Failed to update employee. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;

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
        <h2 className="text-2xl font-bold">Edit Employee</h2>
        <br />
        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Designation:</label>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
              style={styles.input}
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label>Gender:</label>
            <div>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
              />
              Male
              <br />
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
              />
              Female
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Course:</label>
            <div>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course.includes('MCA')}
                onChange={handleCheckboxChange}
              />
              MCA
              <br />
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course.includes('BCA')}
                onChange={handleCheckboxChange}
              />
              BCA
              <br />
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes('BSC')}
                onChange={handleCheckboxChange}
              />
              BSC
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label>Image:</label>
            <input type="file" name="image" onChange={handleFileChange} />
          </div>

          <button type="submit" style={styles.button}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline styles (optional)
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
  container: { width: '50%', margin: '0 auto', padding: '20px', textAlign: 'left' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '15px' },
  input: {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderColor: '#ccc', // Light gray border color
    borderRadius: '5px', // Rounded corners
    borderWidth: '2px', // Border width
    borderStyle: 'solid', 
    
  },
  error: { color: 'red' },
  button: { padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', cursor: 'pointer' },
};

export default EmployeeEdit;
