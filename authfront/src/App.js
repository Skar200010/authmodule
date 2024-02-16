import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import WelcomePage from './Components/welcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<WelcomePage/>} />


        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
