import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios"

const login = () => {
  
  const navigate=useNavigate();

  const [Values,setValues]=useState({username:"",password:""});
  const [message, setMessage] = useState('');

  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post(
        "http://localhost:8000/api/login",
        Values,
        {withCredentials:true}
      )
      localStorage.setItem('token', response.data.token);
      setMessage("login successful!");
      navigate("/homepage")
    }
    catch(error){
      alert('Login failed!');
      setMessage(error.response?.data?.error || 'Login failed!');
    }
  }
  return (
    <div className="bg-green-100 mt-20 w-full flex flex-col  items-center justify-center">
      
      <h2 className="text-2xl font-bold">Login</h2>
      
      <br/>
      
      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col">
          <label>Username</label>
          <input
            type='text'
            className="mt-2 px-2 py-2 rounded outline-none border border-black"
            name='username'
            required
            value={Values.username}
            onChange={change}/>
        </div>

        <div className="w-full flex flex-col">
          <label>Password</label>
          <input
            type='password'
            className="mt-2 px-2 py-2 rounded outline-none border border-black"
            name='password'
            required
            value={Values.password}
            onChange={change}/>
        </div>
        <br/>
        <div className="w-full flex flex-col">
          <button type='submit' className="bg-green-800 font-semibold text-xl text-white rounded py-2">Login</button>
        </div>
        <br/>
        
        
        <div className="mt-4 w-full flex flex-col">
            <p className="text-center">
              Don't have an account?{" "}
              <Link 
                to="/register"
                className="font-semibold hover:text-blue-700">
                Register</Link>
            </p>
          </div>
          
      </form>
      <br/>
      {message && <p className='font-bold text-red-800'>{message}</p>}
    </div>
  )
}

export default login
