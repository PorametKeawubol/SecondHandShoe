import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../AllPage/Loginfrom';
import RegisterForm from '../AllPage/RegisterForm'; // Assuming the file path to RegisterForm.js
import logo from '../Component/Picture/logoSecondHandShoe.png';

export default function Example() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  return (
    <header className="bg-black">
      <div className="px-4 lg:px-8">
        <nav className="flex items-center justify-between mx-auto py-4" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/">
              <img className="h-20 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>
          <div>
            <button onClick={toggleLoginModal} className="font-semibold leading-6 text-white focus:outline-none">
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </nav>
      </div>
      {showLoginModal && <LoginForm toggleModal={toggleLoginModal} toggleRegisterModal={toggleRegisterModal} />}
      {showRegisterModal && <RegisterForm toggleModal={toggleRegisterModal} toggleLoginModal={toggleLoginModal} />}
    </header>
  );
}