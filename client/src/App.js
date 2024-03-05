import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./AllPage/HomePage";
import axios from "axios";
import Sidebar from "./Component/Sidebar";
import ShoeDetails from "./AllPage/ShoeDetails";
import Profile from "./AllPage/ProfilePage";
import MyPurchases from "./AllPage/MyPurchases";
import Payment from "./AllPage/Payment";
import YourItem from "./AllPage/YourItem";
import Contact from "./AllPage/Contact";
import Message from "./Component/Message";
import Admin from "./AllPage/Adminpage";
import NotFound from "./AllPage/Notfound";
import EditProfile from "./AllPage/Editprofile"; // Changed component name to EditProfile
import ToReceive from "./Component/ToReceiveContent";
import Status from "./Component/status"; // Changed component name to Status
import ShopReviewPage from "./AllPage/ShopReview";
import ToShipContent from "./Component/ToShipContent";
import Confrimpayment from "./Component/Confrimpayment";
import MessageDashbord from "./Component/MessageDashbord";
import Allpayment from "./Component/Allpayment";
import Varifyconfirm from "./Component/Varifyconfirm";
import Singin from "./AllPage/Singin";
import Register from "./AllPage/Register";
axios.defaults.headers.common["Authorization"] = null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Singin" element={<Singin />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Editprofile" element={<EditProfile />} />{" "}
        {/* Changed component name to EditProfile */}
        <Route path="/Purchases" element={<MyPurchases />} />
        <Route path="/status" element={<Status />} />{" "}
        {/* Changed component name to Status */}
        <Route path="/ToShipContent" element={<ToShipContent />} />
        <Route path="/Confrimpayment" element={<Confrimpayment />} />
        <Route path="/Allpayment" element={<Allpayment />} />
        <Route path="/Payment/:id" element={<Payment />} />
        <Route path="/Varifyconfirm" element={<Varifyconfirm />} />
        <Route path="/shoe/:id" element={<ShoeDetails />} />
        <Route path="/YourItem" element={<YourItem />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/message/:id" element={<Message />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/ToReceive" element={<ToReceive />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/ShopReview/:sellerName/:sellerId"
          element={<ShopReviewPage />}
        />
        <Route path="/message" element={<MessageDashbord />} />
      </Routes>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
