// src/App.js
import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import HealthCheck from "./pages/HealthCheck/HealthCheck";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

const App = () => {
    const [authData, setAuthData] = useState(null);

    return (
        <Router>
            <AppContent authData={authData} setAuthData={setAuthData} />
        </Router>
    );
};

const AppContent = ({ authData, setAuthData }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuthData(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLogin = (data) => {
        setAuthData(data);
        localStorage.setItem('token', data.token);
        navigate('/');
    };

    return (
        <>
            <Navbar authData={authData} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/health-check" element={<HealthCheck />} />
                <Route path="/login" element={<Login setAuthData={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={authData ? <Profile profile={authData.profile} /> : <Login setAuthData={handleLogin} />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
        </>
    );
};

export default App;