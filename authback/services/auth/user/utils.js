const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../../../models/user')
const mongoose = require('mongoose');

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  };
  
  const generateToken = async (userId, username ) => {
    const payload = { id: userId, username  };
    return jwt.sign(payload,`${process.env.TOKEN_SECRET}`, { expiresIn: 3600 });
    
  };

  const checkUserExists = async (username, email) => {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    return !!user;
  };
  
  const createUser = async (username, email, password) => {
    const newUser = new User({ username, email, password });
  
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    return newUser.save();
  };
  const fetchUserProfile = async (userId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId))
       {
        console.log(userId)
        throw new Error('Invalid user ID');
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const userProfile = {
        username: user.username,
        email: user.email,
        userId : user._id
      };
  
      return userProfile;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      throw new Error('Error fetching user profile');
    }
  };
  function isCredentialsValid(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    return emailRegex.test(email) && passwordRegex.test(password);
  }
  
 
  
  module.exports = {
    comparePassword,
    generateToken,
    checkUserExists,
    createUser,
    fetchUserProfile,
    isCredentialsValid,
    
  };