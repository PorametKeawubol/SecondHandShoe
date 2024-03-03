import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ShoeProvider from "./contexts/ShoeContext";
import CartProvider from "./contexts/CartContext";
import SidebarProvider from "./contexts/SidebarContext";
import ReviewProvider from "./contexts/ShopRatingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ShoeProvider>
        <ReviewProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ReviewProvider>
      </ShoeProvider>
    </CartProvider>
  </SidebarProvider>
);
