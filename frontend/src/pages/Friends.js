import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Friends.css';

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/friends', {
          headers: { Authorization: token },
        });
        setFriends(res.data);
      } catch (err) {
        console.error('Error fetching friends:', err);
      }
    };
    fetchFriends();
  }, []);

  return (
    <div className="friends-container">
      <h2>My Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
