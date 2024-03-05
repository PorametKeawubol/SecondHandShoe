import React, { useState,useContext } from 'react';
import { useEffect } from 'react';
import Header from "../Component/Header";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Confrimpayment from '../Component/Confrimpayment';
import styled from "styled-components"; // import styled-components
import ToShipContent from '../Component/ToShipContent';
import ToComplete from '../Component/ToComplete';
import { ShoeContext } from '../contexts/ShoeContext';
import Allpayment from '../Component/Allpayment';
import Allpaymenlist from '../Component/Allpaymenlist';
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
        {activeTab === 'PaymentComfirm' && <Confrimpayment />}
        {activeTab === 'Allpayment' && <Allpayment />}
        {activeTab === 'Verify' && <ToComplete />}
      </div>
    </div>
  );
};

const BarPurchases = ({ activeTab, handleTabChange }) => {
  return (
    <StyledNav className="flex justify-evenly bg-gray-200 py-2 mt-0" style={{  position: 'sticky',  }}>
      <StyledButton
        className={`${activeTab === 'PaymentComfirm' ? 'active' : ''}  `}
        onClick={() => handleTabChange('PaymentComfirm')}
      >
        Payment Comfirm
      </StyledButton>
      <StyledButton
        className={`${activeTab === 'Allpayment' ? 'active' : ''}`}
        onClick={() => handleTabChange('Allpayment')}
      >
        Allpayment
      </StyledButton>
      <StyledButton
        className={`${activeTab === 'Verify' ? 'active' : ''}`}
        onClick={() => handleTabChange('Verify')}
      >
        Verify
      </StyledButton>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  .active {
    background-color: rgb(37 99 235);
    border: none;
    color: white;
    padding: 10px 24px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 20px;
    margin: 4px 2px;

    cursor: pointer;
    border-radius: 12px;
  }

  .active:hover {
    background-color: rgb(37 99 235);
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
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #ddd;
  }
`;

const Cart = () => {
 return <Confrimpayment />;
};

export default MyPurchases;
