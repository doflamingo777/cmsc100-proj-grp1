import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterDetails() {
  // register details
  const [user, setUsers] = useState([])
  const [firstname, setFirstname] = useState([''])
  const [lastname, setLastname] = useState([''])
  const [phone, setPhone] = useState([''])
  const [email, setEmail] = useState([''])
  const [username, setUsername] = useState([''])
  const [password, setPassword] = useState([''])
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = () =>{
    axios
    .get('http://localhost:3000/users')
    .then((res) => 
      console.log(res.data))
    .catch((error) => console.error('Error fetching users:', error));
  }

  
  const handleRegister = (event) => {
    event.preventDefault();
    axios
    .post('http://localhost:3000/register', { firstname, lastname, username, phone, email, password})
    .then(() => {
      alert('Registration Successful')
      setFirstname('')
      setLastname('')
      setUsername('')
      setPhone('')
      setEmail('')
      setPassword('')
      fetchUsers()
      navigate('/login')
    })
    .catch((error) => {
        console.log('Unable to register')
    })
  }

  return (
    <div className='login-container'>
      <h1>Register</h1>
      <p>Welcome to Register Page</p>
      <div className='forms-container'>
        <form className='login-form' onSubmit={handleRegister}>
            <input type="text" id='fname' name='firstname' placeholder='First Name' value={firstname} onChange={(e) => setFirstname(e.target.value)}/><br/>
            <input type="text" id='lname' name='lastname' placeholder='Last Name' value={lastname} onChange={(e) => setLastname(e.target.value)}/><br/>
            <input type="text" id='uname' name='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/><br/>
            <input type="tel" id='phone' name='phone' placeholder='Mobile Number' pattern="09[0-9]{9}" required value={phone} onChange={(e) => setPhone(e.target.value)}/><br/>
            <input type="email" id='email' name='email' placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)}/><br/>
            <input type="password" id='password' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
            <button type='submit'>Register</button>
        </form>

      </div>
    </div>
  )
}