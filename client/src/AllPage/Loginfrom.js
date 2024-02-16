import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function LoginForm({ toggleModal, toggleRegisterModal, onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                toggleModal();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, toggleModal]);

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
          const response = await axios.post('http://localhost:1337/api/auth/local', {
              identifier: email,
              password: password,
          });
  
          // Assuming your server returns a token upon successful login
          const token = response.data.jwt;
  
          // Save the token to localStorage
          localStorage.setItem('authToken', token);
  
          // Set token to Axios headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
          console.log('Login successful');
          console.log(response.data); // You can handle the response accordingly
  
          // Close the login pop-up
          toggleModal();
          onLogin();
      } catch (error) {
          console.error('Error:', error);
          if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message[0].messages[0].message);
          } else {
            setError('An error occurred while logging in.');
          }
      }
  };
  
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4 text-center">LOGIN</h2>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="mt-1 block w-full rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 block w-full rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-900">SIGN IN</button>
                </form>
                <p className="mt-4 text-gray-600">
                    Don't Have Account ?
                    <button onClick={toggleRegisterModal} className="text-blue-500 hover:underline ml-1">Register Now</button>
                </p>
                <button onClick={toggleModal} className="text-blue-500 hover:underline ml-1">Maybe not now</button>
            </div>
        </div>
    );
}

export default LoginForm;