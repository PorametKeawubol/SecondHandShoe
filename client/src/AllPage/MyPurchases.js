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
      </div>
    </div>
  );
};

const BarPurchases = ({ activeTab, handleTabChange }) => {
  return (
    <nav className="flex justify-evenly bg-gray-200 py-2" style={{ zIndex: 100, position: 'sticky', top: '110px' }}>
      <button
        className={`px-4 py-2 ${activeTab === 'cart' ? 'bg-gray-400' : ''}`}
        onClick={() => handleTabChange('cart')}
      >
        Cart
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'toReceive' ? 'bg-gray-400' : ''}`}
        onClick={() => handleTabChange('toReceive')}
      >
        To Receive
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'toShip' ? 'bg-gray-400' : ''}`}
        onClick={() => handleTabChange('toShip')}
      >
        To Ship
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

export default MyPurchases;
