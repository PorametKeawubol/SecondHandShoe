import React from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Create An Account</h1>
        <form>
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
        <Link to="/login" className="block text-blue-500 hover:underline mt-2 text-center">Already Have an Account? Login</Link>
      </div>
    </div>
  );
}

export default RegisterForm;
