import React, { useState } from 'react';
import Header from "../Component/Header";
import { Link } from 'react-router-dom';
import CartContent from '../Component/CartContent'; // Import CartContent component

const MyPurchases = () => {
  const [activeTab, setActiveTab] = useState('cart');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-screen">
    <Header />

      {/* Navigation */}
      <BarPurchases activeTab={activeTab} handleTabChange={handleTabChange} />
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Display content based on activeTab */}
        {activeTab === 'cart' && <Cart />}
        {activeTab === 'toReceive' && <ToReceive />}
        {activeTab === 'toShip' && <ToShip />}
        {activeTab === 'completed' && <completed />}
      </div>
    </div>
  );
};

const BarPurchases = ({ activeTab, handleTabChange }) => {
  return (
    <nav className="flex justify-evenly bg-gray-200 py-2" style={{  position: 'sticky', top: '110px' }}>
      <button
        className={`px-4 py-2 ${activeTab === 'cart' ? 'bg-gray-400 rounded-lg' : ''}`}
        onClick={() => handleTabChange('cart')}
      >
        To pay
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'toShip' ? 'bg-gray-400 rounded-lg' : ''}`}
        onClick={() => handleTabChange('toShip')}
      >
        To Ship
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'toReceive' ? 'bg-gray-400 rounded-lg' : ''}`}
        onClick={() => handleTabChange('toReceive')}
      >
        To Receive
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'completed' ? 'bg-gray-400 rounded-lg' : ''}`}
        onClick={() => handleTabChange('completed')}
      >
        completed
      </button>
    </nav>
  );
};

const Cart = () => {
 return <CartContent />;
};

const ToReceive = () => {
  return <div>To Receive Content</div>;
};

const ToShip = () => {
  return <div>To Ship Content</div>;
};
const completed = () => {
  return <div>To Ship Content</div>;
};

export default MyPurchases;
