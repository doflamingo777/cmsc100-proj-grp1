import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='account-container'>
      <h1>User Profile Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
