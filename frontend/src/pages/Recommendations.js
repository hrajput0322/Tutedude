import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import '../styles/Recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem('token');
      try {
        const resRecommendations = await axios.get('https://tutedude-2o6n.onrender.com/api/friends/friendsOfFriends', {
          headers: { Authorization: token },
        });
        setRecommendations(resRecommendations.data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendations();
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
      alert('Friend request sent!');
    } catch (err) {
      console.error('Error sending friend request:', err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="recommendations-container">
      <h2>Friend Recommendations</h2>
      <ul>
        {recommendations.map((rec) => (
          <li key={rec._id}>
            <span>{rec.username}</span>
            <button onClick={() => addFriend(rec._id)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
