import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const CreateEmployee = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        //const userToken=
        localStorage.removeItem('userToken');
        navigate('/');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const [duplicateEmailError, setDuplicateEmailError] = useState('');

    const onSubmit = async (data) => {
        try {
        // Check for duplicate email on the server
        const response = await axios.post('http://localhost:8000/api/employees/check-email', {
            email: data.email,
        });

        if (response.data.isDuplicate) {
            setDuplicateEmailError('This email is already in use.');
            return;
        }

        // If no duplicate, submit the form
        setDuplicateEmailError('');
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
              if (key === "image") {
                formData.append(key, data[key][0]); // Append the first file
            } else {
                formData.append(key, data[key]);
            }
        });

        const result = await axios.post('http://localhost:8000/api/create', formData);
        alert('Employee created successfully!');
        reset();
        } catch (error) {
        console.error('Error creating employee:', error);
        alert('Failed to create employee. Please try again.');
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
      <h2 className="text-2xl font-bold">Create Employee</h2>
      <br/>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {/* Name */}
        <div style={styles.formGroup}>
          <label>Name</label> 
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email format',
              },
            })}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email.message}</p>}
          {duplicateEmailError && <p style={styles.error}>{duplicateEmailError}</p>}
        </div>

        {/* Mobile Number */}
        <div style={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="text"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid mobile number',
              },
            })}
            style={styles.input}
          />
          {errors.mobile && <p style={styles.error}>{errors.mobile.message}</p>}
        </div>

        {/* Designation */}
        <div style={styles.formGroup}>
          <label>Designation</label>
          <select
            {...register('designation', { required: 'Designation is required' })}
            style={styles.input}
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && (
            <p style={styles.error}>{errors.designation.message}</p>
          )}
        </div>

        {/* Gender */}
        <div style={styles.formGroup}>
          <label>Gender</label>
          
          <div>
            <input
              type="radio"
              value="Male"
              {...register('gender', { required: 'Gender is required' })}
            />
            Male
            <br/>
            <input
              type="radio"
              value="Female"
              {...register('gender', { required: 'Gender is required' })}
            />
            Female
          </div>
          {errors.gender && <p style={styles.error}>{errors.gender.message}</p>}
        </div>

        {/* Courses */}
        <div style={styles.formGroup}>
          <label>Courses</label>
          <div>
            <input type="checkbox" value="MCA" {...register('course')} /> MCA <br/>
            <input type="checkbox" value="BCA" {...register('course')} /> BCA <br/>
            <input type="checkbox" value="BSC" {...register('course')} /> BSC
          </div>
        </div>

        {/* Image Upload */}
        <div style={styles.formGroup}>
          <label>Image Upload (jpg/png)</label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && <p style={styles.error}>{errors.image.message}</p>}
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

// Inline styles (can be replaced with a CSS file)
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
    width: '50%',
    margin: '0 auto',
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderColor: '#ccc', // Light gray border color
    borderRadius: '5px', // Rounded corners
    borderWidth: '2px', // Border width
    borderStyle: 'solid', 
    
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.7rem',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    fontSize: '0.8rem',
  },
};

export default CreateEmployee;
