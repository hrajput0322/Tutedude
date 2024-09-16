import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FriendRequests.css';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://tutedude-2o6n.onrender.com/api/friends/requests', {
        headers: { Authorization: token },
      });
      setFriendRequests(res.data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      'https://tutedude-2o6n.onrender.com/api/friends/accept',
      { requestId },
      {
        headers: { Authorization: token },
      }
    );
    toast.success('Friend request accepted!');
    setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
  };

  const rejectRequest = async (requestId) => {
    const token = localStorage.getItem('token');
    await axios.post(
      'https://tutedude-2o6n.onrender.com/api/friends/reject',
      { requestId },
      {
        headers: { Authorization: token },
      }
    );
    toast.error('Friend request rejected!');
    setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
  };

  if (loading) {
    return <Loading />;
  }

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
