const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const FriendRequest = require('../models/FriendRequest');
const auth = require('../middleware/auth');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, 'yourJWTSecret');
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user).populate('friends');
        res.json(user.friends);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/request', authMiddleware, async (req, res) => {
    try {
      const { friendId } = req.body;
  
      if (!friendId) {
        return res.status(400).json({ msg: 'Friend ID is required' });
      }
  
      const user = await User.findById(req.user);
  
      if (friendId === req.user) {
        return res.status(400).json({ msg: 'You cannot add yourself as a friend' });
      }
  
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ msg: 'You are already friends with this user' });
      }
  
      const existingRequest = await FriendRequest.findOne({
        sender: req.user,
        receiver: friendId,
        status: 'pending',
      });
  
      if (existingRequest) {
        return res.status(400).json({ msg: 'Friend request already sent' });
      }
  
      const newRequest = new FriendRequest({
        sender: req.user,
        receiver: friendId,
      });
  
      await newRequest.save();
      res.status(200).json({ msg: 'Friend request sent successfully' });
    } catch (err) {
      console.error('Error sending friend request:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  });  

router.get('/requests', authMiddleware, async (req, res) => {
    try {
      const friendRequests = await FriendRequest.find({ receiver: req.user }).populate('sender', 'username');
      res.json(friendRequests);
    } catch (err) {
      console.error('Error fetching friend requests:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  router.post('/accept', authMiddleware, async (req, res) => {
    try {
      const { requestId } = req.body;
      const request = await FriendRequest.findById(requestId);
      if (!request || request.receiver.toString() !== req.user) {
        return res.status(400).json({ msg: 'Friend request not found or unauthorized' });
      }
  
      const user = await User.findById(req.user);
      const friend = await User.findById(request.sender);
  
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      
      await user.save();
      await friend.save();
      await FriendRequest.findByIdAndDelete(requestId);
  
      res.json({ msg: 'Friend request accepted' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
  
  router.post('/reject', authMiddleware, async (req, res) => {
    try {
      const { requestId } = req.body;
      const request = await FriendRequest.findById(requestId);
      if (!request || request.receiver.toString() !== req.user) {
        return res.status(400).json({ msg: 'Friend request not found or unauthorized' });
      }
  
      await FriendRequest.findByIdAndDelete(requestId);
      res.json({ msg: 'Friend request rejected' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });  

  router.get('/friendsOfFriends', authMiddleware, async (req, res) => {
    try {
      const currentUser = await User.findById(req.user).populate('friends');
  
      const currentUserFriendIds = new Set(currentUser.friends.map(f => f._id.toString()));
      currentUserFriendIds.add(currentUser._id.toString());
  
      let friendsOfFriends = new Set();
  
      for (let friend of currentUser.friends) {
        const friendData = await User.findById(friend._id).populate('friends');
  
        for (let friendOfFriend of friendData.friends) {
          const friendOfFriendId = friendOfFriend._id.toString();
  
          if (!currentUserFriendIds.has(friendOfFriendId)) {
            friendsOfFriends.add(friendOfFriendId);
          }
        }
      }

      const friendsOfFriendsList = await User.find({ _id: { $in: Array.from(friendsOfFriends) } });
  
      res.json(friendsOfFriendsList);
    } catch (err) {
      console.error('Error fetching friends of friends:', err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
