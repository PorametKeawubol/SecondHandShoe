import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './AllPage/testHeaderloginpage';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = null
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
