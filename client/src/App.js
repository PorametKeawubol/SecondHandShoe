import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginfrom from './Loginfrom';
import RegisterForm from './RegisterForm'; // นำเข้า RegisterForm มาก่อนใช้งาน
import HomePage from './HomePage';
import Loading from './Component/Loading';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<HomePage />}></Route>
        <Route path="/login" element={<Loginfrom />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>{/* ใช้งาน RegisterForm ที่นี่ */}
        <Route path="/Loading" element={<Loading />}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App;
