import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './AllPage/HomePage';
import axios from 'axios';
import Sidebar from './Component/Sidebar';
import ShoeDetails from './AllPage/HomePage';
axios.defaults.headers.common['Authorization'] = null
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/shoe/:id" element={<ShoeDetails />}></Route>
      </Routes>
      <Sidebar />
    </BrowserRouter>
  )
}

export default App;
