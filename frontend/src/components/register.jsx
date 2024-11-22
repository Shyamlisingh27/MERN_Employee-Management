
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        username,
        password,
      });
      
      setMessage(response.data.message);
      navigate("/login")
    } catch (error) {
      setMessage(error.response?.data?.error || 'Registration failed!');
    }
  };

  return (
    <div className="bg-green-100 mt-20 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Register</h2>
      
      <br/>
      <form onSubmit={handleRegister}>
        <div className="w-full flex flex-col">
          <label>Username</label>
          <input
            type="text"
            className="mt-2 px-2 py-2 rounded outline-none border border-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="w-full flex flex-col">
          <label>Password</label>
          <input
            type="password"
            className="mt-2 px-2 py-2 rounded outline-none border border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br/>
        <div className="w-full flex flex-col">
          <button type='submit' className="bg-green-800 font-semibold text-xl text-white rounded py-2">Register</button>
        </div>
      </form>
      <br/>
      {message && <p className='font-bold text-red-800'>{message}</p>}
    </div>
  );
};

export default Register;
