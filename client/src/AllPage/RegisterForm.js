import React, { useState, useEffect, useRef } from 'react';

function RegisterForm({ toggleModal, toggleLoginModal }) {
  const [showModal, setShowModal] = useState(true);
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

  const handleLoginClick = () => {
    toggleLoginModal(); // Call toggleLoginModal to switch back to the login form
    toggleModal(); // Close the registration form
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
          <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
            <form className="w-full">
              <div className="mb-5 flex">
                <div className="w-1/2 pr-2">
                  <label htmlFor="name" className="block text-gray-600">Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" className="mt-1 block w-full px-4 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="lastname" className="block text-gray-600">Last Name</label>
                  <input type="text" id="lastname" name="lastname" placeholder="Enter your last name" className="mt-1 block w-full px-4 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-600">Email address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email address" className="mt-1 block w-full px-4 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block text-gray-600">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" className="mt-1 block w-full px-4 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-900">SIGN UP</button>
            </form>
            <p className="mt-4 text-gray-600">
              Already Have an Account? 
              <button onClick={handleLoginClick} className="text-blue-500 hover:underline ml-1">Back to Login</button>
            </p>
            <button onClick={toggleModal} className="text-blue-500 hover:underline ml-1">Maybe not now</button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterForm;