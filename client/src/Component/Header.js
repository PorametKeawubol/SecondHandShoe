import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Singin from "../AllPage/Singin";
import Register from "../AllPage/Register";
import logo from "../Component/Picture/logoSecondHandShoe.png";
import Nav from "../Component/nav";
import axios from "axios";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoeContext } from "../contexts/ShoeContext";
import conf from "../config/main";

export default function Header() {
  const { setShoes } = useContext(ShoeContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const navigate = useNavigate();

  const hasSessionStorage = sessionStorage.getItem("authToken") !== null;

  const handleFetchShoes = async () => {
    try {
      const response = await axios.get(conf.apiUrlPrefix + "/shoes?populate=*");
      if (Array.isArray(response.data.data)) {
        // Check if response.data is an array
        const shoeData = response.data.data.map((shoe) => {
          const { id, attributes } = shoe;
          const {
            products_name,
            price,
            details,
            location,
            picture,
            brand,
            color,
            gender,
            status,
            seller,
            size,
            payment,
          } = attributes;
          const image =
            picture && picture.data && picture.data.length > 0
              ? picture.data.map((img) => conf.urlPrefix + img.attributes.url)
              : [];

          const brandType = brand?.data?.attributes.name;
          const colorType = color?.data?.attributes.name;
          const genderType = gender?.data?.attributes.name;
          const Seller = seller?.data?.attributes.username;
          const sellerid = seller?.data?.id;
          //const product_color = color.data.products_name
          //const category = attributes.categories?.data.map(cat => cat.attributes.name) || ['uncategorized'];;
          return {
            id,
            products_name,
            price,
            details,
            location,
            image,
            brandType,
            colorType,
            genderType,
            status,
            Seller,
            sellerid,
            size,
            payment,
          };
        });
        setShoes(shoeData);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const checkAuthStatus = () => {
    const token = sessionStorage.getItem("authToken");
    const authTokenInHeaders = axios.defaults.headers.common["Authorization"];
    if (token || authTokenInHeaders !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // Assign the value to the export variable
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
    sessionStorage.removeItem("Profile_Picture");
    sessionStorage.removeItem("role");

    // Remove token from Axios headers
    delete axios.defaults.headers.common["Authorization"];

    navigate("/");
    window.location.reload();
  };

  return (
    <header className="top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] bg-opacity-50">
      <div className="">
        <nav
          className="flex items-center justify-between mx-auto py-4 mr-5"
          aria-label="Global"
        >
          <div
            className="flex lg:flex-1"
            onClick={() => {
              handleFetchShoes();
            }}
          >
            <Link to="/">
              <img
                className="h-16 w-auto ml-5 transition ease-in-out delay-150 hover:scale-110 hover:duration-300 ..."
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="flex ">
            <div className="mr-8">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex relative"
              >
                {isLoggedIn && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 mt-2 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>

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
                  className="font-semibold leading-6 text-white focus:outline-none"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {showLoginModal && (
        <Singin
          toggleModal={toggleLoginModal}
          toggleRegisterModal={toggleRegisterModal}
          onLogin={handleLogin}
          checkAuthStatus={checkAuthStatus}
        />
      )}
      {showRegisterModal && (
        <Register
          toggleModal={toggleRegisterModal}
          toggleLoginModal={toggleLoginModal}
          onLogin={handleLogin}
        />
      )}
    </header>
  );
}
