import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


export default function LoginDetails() {
  // login details
  const [users, setUsers] = useState([]);
  const [admins, setAdmin] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchAdmins();
  }, []);

  const fetchUsers = () => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => setUsers(res.data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const fetchAdmins = () => {
    axios
      .get('http://localhost:3000/showAdmin')
      .then((res) => setAdmin(res.data))
      .catch((error) => console.error('Error fetching users:', error));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      const token = response.data.token; //token is for authentication
      const userType = response.data.userType; // user type can be user or admin
      alert('Login successful');
      setEmail('');
      setPassword('');

      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('email', email); //set current user email
      
    
      const mail = localStorage.getItem('email');
      console.log(mail)

      if (response.data.userType === 'admin') {
        navigate('/admindashboardpage');
      } else {

        // navigate('/userprofilepage');
        navigate('/shopcart');
      }
      window.location.reload()
      

    } catch (error) {
      console.log('Login Error:', error);
    }
  };

  return (
    <div className='login-container'>
    
      <div className='forms-container'>
        <form className='login-form' onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>Welcome to Login Page</p>
          <label>Email Address</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <label>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button className='color-red' type='submit'>Login</button>
          
        </form>
        <footer className="home-footer">
        &copy; 2024 Farm-to-Table. All rights reserved.
      </footer>
      </div>
      
    </div>
  );
}
