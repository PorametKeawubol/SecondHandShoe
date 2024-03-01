// Example.js
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../AllPage/Loginform";
import RegisterForm from "../AllPage/RegisterForm";
import logo from "../Component/Picture/logoSecondHandShoe.png";
import Nav from "../Component/nav";
import axios from "axios";
import { BsBag } from "react-icons/bs";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from 'react-router-dom';

export let isLoggedInExport; // Declare a variable to hold the export

export default function Example() {
     const [showLoginModal, setShowLoginModal] = useState(false);
     const [showRegisterModal, setShowRegisterModal] = useState(false);
     const [isLoggedIn, setIsLoggedIn] = useState(false);
     const [isActive, setIsActive] = useState(false);
     const { isOpen, setIsOpen } = useContext(SidebarContext);
     const { itemAmount } = useContext(CartContext);
     const navigate = useNavigate()
     const hasSessionStorage = sessionStorage.getItem('authToken') !== null;
     
     useEffect(() => {
          window.addEventListener("scroll", () => {
               window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
          });
     });

     const checkAuthStatus = () => {
          const token = sessionStorage.getItem("authToken");
          const authTokenInHeaders =
               axios.defaults.headers.common["Authorization"];
          if (token && authTokenInHeaders !== null) {
               setIsLoggedIn(true);
          } else {
               setIsLoggedIn(false);
          }
          // Assign the value to the export variable
          isLoggedInExport = isLoggedIn;
         
     };

     useEffect(() => {
          checkAuthStatus();
     }, []);

     const toggleLoginModal = () => {
          setShowLoginModal(!showLoginModal);
     };

     const toggleRegisterModal = () => {
          setShowRegisterModal(!showRegisterModal);
     };

     const handleLogin = () => {
          setIsLoggedIn(true);
          setShowLoginModal(false);
          
     };
 
     const handleLogout = () => {
          setIsLoggedIn(false);

          // Clear the token from localStorage
          sessionStorage.removeItem("authToken");

          // Remove token from Axios headers
          delete axios.defaults.headers.common["Authorization"];

          navigate('/')
          window.location.reload()
     };

     return (
          <header className="top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#355C7D] via-[#6C5B7B] to-[#C06C84] bg-opacity-50" >

               <div className="">
                    <nav

                         className="flex items-center justify-between mx-auto py-4"
                         aria-label="Global"
                    >
                         <div className="flex lg:flex-1">
                              <Link to="/">
                                   <img
                                        className="h-16 w-auto"
                                        src={logo}
                                        alt="Logo"
                                   />
                              </Link>
                         </div>
                         <div className="flex ">
                              <div className="mr-8">
                                   <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex relative">
                                        {isLoggedIn && (
                                             <>
                                                  <BsBag className="h-8 text-2xl" />
                                                  <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                                                       {itemAmount}
                                                  </div>
                                             </>
                                        )}
                                   </div>
                              </div>

                              {hasSessionStorage ? (
                                   <Nav handleLogout={handleLogout} /> // Pass handleLogout to Nav component
                              ) : (
                                   <div>
                                        <button
                                             onClick={toggleLoginModal}
                                             className="font-semibold leading-6 text-black focus:outline-none"
                                        >
                                             Log in {" "}
                                             <span aria-hidden="true">
                                                  &rarr;
                                             </span>
                                        </button>
                                   </div>
                              )}
                         </div>
                    </nav>
               </div >
               {showLoginModal && (
                    <LoginForm
                         toggleModal={toggleLoginModal}
                         toggleRegisterModal={toggleRegisterModal}
                         onLogin={handleLogin}
                         checkAuthStatus={checkAuthStatus}
                    />
               )
               }
               {
                    showRegisterModal && (
                         <RegisterForm
                              toggleModal={toggleRegisterModal}
                              toggleLoginModal={toggleLoginModal}
                              onLogin={handleLogin}
                         />
                    )
               }
          </header >
     );
}
