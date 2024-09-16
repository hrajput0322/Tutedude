import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Friends.css';
import Loading from '../components/Loading';

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://tutedude-2o6n.onrender.com/api/friends', {
        headers: { Authorization: token },
      });
      setFriends(res.data);
      setLoading(false);
    };
    fetchFriends();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="friends-container">
      <h2>My Friends</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
