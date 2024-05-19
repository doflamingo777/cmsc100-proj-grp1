import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function RegisterDetails() {
  // Register details
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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
      .then((res) => setAdmins(res.data))
      .catch((error) => console.error('Error fetching admins:', error));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      // Check if email exists in users or admins
      const existingUser = users.find(user => user.email === email);
      const existingAdmin = admins.find(admin => admin.email === email);

      if (existingUser || existingAdmin) {
        alert('Existing Email');
        return;
      }

      // Proceed with registration if email does not exist
      await axios.post('http://localhost:3000/register', { firstname, lastname, middlename, username, phone, email, password });
      alert('Registration Successful');
      setFirstname('');
      setMiddlename('');
      setLastname('');
      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
      fetchUsers();
      navigate('/login');
    } catch (error) {
      console.log('Unable to register:', error);
    }
  };
  
  const handleBack = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='register-wrapper'>
      <div className="background-image"></div>
      <div className='register-container'>
        <button className='Back' onClick={handleBack}>Back</button>
        <h1>Register</h1>
        <div className='register-form-container'>
          <form className='register-form' onSubmit={handleRegister}>
            <input
              type="text"
              id='fname'
              name='firstname'
              placeholder='First Name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            /><br/>
            <input
              type="text"
              id='mname'
              name='middlename'
              placeholder='Middle Name'
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            /><br/>
            <input
              type="text"
              id='lname'
              name='lastname'
              placeholder='Last Name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            /><br/>
            <input
              type="text"
              id='uname'
              name='username'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /><br/>
            <input
              type="tel"
              id='phone'
              name='phone'
              placeholder='Mobile Number'
              pattern="09[0-9]{9}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /><br/>
            <input
              type="email"
              id='email'
              name='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /><br/>
            <input
              type="password"
              id='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /><br/>
            <button type='submit'>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
