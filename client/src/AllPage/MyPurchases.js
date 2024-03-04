import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import Header from "../Component/Header";
import { Link } from 'react-router-dom';
import CartContent from '../Component/CartContent'; // Import CartContent component
import { useLocation } from 'react-router-dom';
import ToReceiveContent from '../Component/ToReceiveContent';
import styled from "styled-components"; // import styled-components
import ToShipContent from '../Component/ToShipContent';
import ToComplete from '../Component/ToComplete';
import { ShoeContext } from '../contexts/ShoeContext';
const MyPurchases = () => {
  const [activeTab, setActiveTab] = useState('cart');
  const location = useLocation();
  const {shoes} = useContext(ShoeContext)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      handleTabChange(tab);
    }
  }, [location.search]);


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
        {activeTab === 'toReceive' && <ToReceiveContent />}
        {activeTab === 'toShip' && <ToShipContent />}
        {activeTab === 'completed' && <ToComplete />}
      </div>
    </div>
  );
};

const BarPurchases = ({ activeTab, handleTabChange }) => {
  return (
    <StyledNav className="flex justify-evenly bg-gray-200 py-4 mt-0" style={{  position: 'sticky',  }}>
      <StyledButton
        className={`${activeTab === 'cart' ? 'active' : ''}`}
        onClick={() => handleTabChange('cart')}
      >
        To pay
      </StyledButton>
      <StyledButton
        className={`${activeTab === 'toShip' ? 'active' : ''}`}
        onClick={() => handleTabChange('toShip')}
      >
        To Ship
      </StyledButton>
      <StyledButton
        className={`${activeTab === 'toReceive' ? 'active' : ''}`}
        onClick={() => handleTabChange('toReceive')}
      >
        To Receive
      </StyledButton>
      <StyledButton
        className={`${activeTab === 'completed' ? 'active' : ''}`}
        onClick={() => handleTabChange('completed')}
      >
        Completed
      </StyledButton>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  .active {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    border-radius: 12px;
  }

  .active:hover {
    background-color: #45a049;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
`;

const StyledButton = styled.button`
  background-color: #e7e7e7; /* Green */
  border: none;
  color: black;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #ddd;
  }
`;

const Cart = () => {
 return <CartContent />;
};

const ToReceive = () => {
  return <div>To Receive Content</div>;
};

const ToShip = () => {
  return <div>To Ship Content</div>;
};

const Completed = () => {
  return <div>Completed Content</div>;
};

export default MyPurchases;
