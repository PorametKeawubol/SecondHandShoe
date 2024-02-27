import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './AllPage/HomePage';
import axios from 'axios';
import Sidebar from './Component/Sidebar';
import ShoeDetails from './AllPage/ShoeDetails';
import Profile from './AllPage/ProfilePage';
import MyPurchases from './AllPage/MyPurchases';
import Payment from './AllPage/Payment';
import YourItem from './AllPage/YourItem';
import Contact from './AllPage/Contact';
axios.defaults.headers.common['Authorization'] = null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Purchases" element={<MyPurchases />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/shoe/:id" element={<ShoeDetails />} />
        <Route path="/YourItem" element={<YourItem />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
