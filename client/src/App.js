import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Component/Header'; // Assuming Header.js is in the same directory as App.js
import Loginfrom from './Loginfrom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}></Route>
        <Route path="/login" element={<Loginfrom />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
