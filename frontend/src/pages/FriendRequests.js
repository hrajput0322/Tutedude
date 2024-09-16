import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FriendRequests.css';
import { toast } from 'react-toastify';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/friends/requests', {
          headers: { Authorization: token },
        });
        setFriendRequests(res.data);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      }
    };
    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/friends/accept',
        { requestId },
        {
          headers: { Authorization: token },
        }
      );
      toast.success('Friend request accepted!');
      setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error('Error accepting friend request:', err);
    }
  };

  const rejectRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/friends/reject',
        { requestId },
        {
          headers: { Authorization: token },
        }
      );
      toast.error('Friend request rejected!');
      setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
    } catch (err) {
      console.error('Error rejecting friend request:', err);
    }
  };

  return (
    <div className="friend-requests-container">
      <h2>Friend Requests</h2>
      <ul>
        {friendRequests.map((request) => (
          <li key={request._id}>
            <span>{request.sender.username}</span>
            <div>
              <button onClick={() => acceptRequest(request._id)}>Accept</button>
              <button onClick={() => rejectRequest(request._id)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequests;
