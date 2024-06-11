import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './compound/navbar/NavBar';
import Home from './pages/Home/Home';
import Card from './pages/Card/Card';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Dashboard from './compound/DashBoardPatient/Dashboard.jsx';
import LoginPopUp from './compound/LoginPopUp/LoginPopUp';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    navigate('/dashboard');
  };

  return (
    <>
      {showLogin && <LoginPopUp setshowlogin={setShowLogin} onLoginSuccess={handleLoginSuccess} />}
      <div className='app'>
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card' element={<Card />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard userType="doctor" /> : <Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
