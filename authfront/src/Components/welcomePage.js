// UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Avatar, Button, IconButton } from '@mui/material';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  const expirationTime = JSON.parse(atob(token.split('.')[1])).exp * 1000;
  return Date.now() >= expirationTime;
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      if (isTokenExpired()) {
        navigate('/');
      }
    };
    checkSession();
  }, [navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        if (response.status === 200) {
          setUserProfile(data);
        } else {
          console.error('Error fetching user data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchUserProfile();
  }, []);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = userProfile.userId;
      await axios.post(
        'http://localhost:3000/logout',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };
  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching user profile
  }

  return (
    <div style={{ backgroundImage: 'url("back.jpg")', height: '100vh', backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <div className="d-flex">
        <div className="container mt-5">
        <Card style={{ width: '500px', height: '225px'}}>
        <CardContent style={{ textAlign: 'center', background: 'linear-gradient(to right, #3498db, #8e44ad)', color: '#fff' }}>
              <Avatar alt={userProfile.username}  />  
              <Typography
              sx ={{
                color : 'white'
              }}
              level="h1"
              noWrap={false}
              variant="plain"
                >
              UserProfile
            </Typography>
              <Typography variant="body2" color="text.secondary">
                Welcome, {userProfile.username}!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {userProfile.email}
              </Typography>

              {/* Include the UserPortfolio component */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout
              </Button>
            </CardContent>
          </Card>
          <Box component="footer" sx={{ py: 1 }}>
            <Typography level="body-xs" textAlign="center" color = "black">
              © Skar {new Date().getFullYear()}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
