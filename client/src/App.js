import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Component/Header'; // ถ้ามี
import Loginfrom from './Loginfrom';
import RegisterForm from './RegisterForm'; // นำเข้า RegisterForm มาก่อนใช้งาน

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/login" element={<Loginfrom />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route> {/* ใช้งาน RegisterForm ที่นี่ */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
