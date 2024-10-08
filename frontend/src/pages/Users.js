import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import '../styles/Users.css';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndFriends = async () => {
      const token = localStorage.getItem('token');
      try {
        const resUsers = await axios.get('https://tutedude-2o6n.onrender.com/api/users/all', {
          headers: { Authorization: token },
        });
        setUsers(resUsers.data);

        const resFriends = await axios.get('https://tutedude-2o6n.onrender.com/api/friends', {
          headers: { Authorization: token },
        });
        setFriends(resFriends.data.map(friend => friend._id));
      } catch (err) {
        console.error('Error fetching users or friends:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersAndFriends();
  }, []);

  const addFriend = async (friendId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://tutedude-2o6n.onrender.com/api/friends/request',
        { friendId },
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Friend Request Sent");
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h2>All Users</h2>
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-bar"
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user._id}>
            <span>{user.username}</span>
            <button
              onClick={() => addFriend(user._id)}
              disabled={friends.includes(user._id)}
            >
              {friends.includes(user._id) ? 'Already Friends' : 'Add Friend'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
