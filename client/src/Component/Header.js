import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../AllPage/Loginfrom';
import RegisterForm from '../AllPage/RegisterForm'; 
import logo from '../Component/Picture/logoSecondHandShoe.png';
import Nav from '../Component/nav';
import axios from 'axios';

export default function Example() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const authTokenInHeaders = axios.defaults.headers.common['Authorization'];
    if (token && authTokenInHeaders !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear the token from localStorage
    localStorage.removeItem('authToken');

    // Remove token from Axios headers
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <header className="bg-black fixed top-0 left-0 right-0 z-50">
      <div className="px-4 lg:px-8">
        <nav className="flex items-center justify-between mx-auto py-4" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/">
              <img className="h-20 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>
          {isLoggedIn ? (
            <Nav handleLogout={handleLogout} /> // Pass handleLogout to Nav component
          ) : (
            <div>
              <button onClick={toggleLoginModal} className="font-semibold leading-6 text-white focus:outline-none">
                Log in → <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          )}
        </nav>
      </div>
      {showLoginModal && <LoginForm toggleModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} onLogin={handleLogin} />}
      {showRegisterModal && <RegisterForm toggleModal={toggleRegisterModal} toggleLoginModal={toggleLoginModal} onLogin={handleLogin} />}
    </header>
  );
}
