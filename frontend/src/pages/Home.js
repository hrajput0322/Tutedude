import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import '../styles/Home.css';
import { toast } from 'react-toastify';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.warning("LogOut Successful");
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Social App</h1>
      {isLoggedIn ? (
        <div className="button-container">
          <button onClick={() => navigate('/users')}>View All Users</button>
          <button onClick={() => navigate('/recommendations')}>Friend Recommendations</button>
          <button onClick={() => navigate('/friend-requests')}>Friend Requests</button>
          <button onClick={() => navigate('/friends')}>My Friends</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="button-container">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      )}
    </div>
  );
};

export default Home;
