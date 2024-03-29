import React, { useState, useEffect, useContext } from "react";
import Header from "../Component/Header";
import axios from "axios";
import {
  FaShoppingCart,
  FaTruck,
  FaGift,
  FaStar,
  FaShip,
  FaSuitcase,
  FaReply,
  FaHistory,
  FaStoreAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import ToRate from "../Component/ToRateContent";
import ImageUploadPopup from "../AllPage/SellPage"; // Import the ImageUploadPopup component
import styled from "styled-components";
import conf from "../config/main";
import { ShoeContext } from "../contexts/ShoeContext";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [showToRateModal, setShowToRateModal] = useState(false);
  const [showImageUploadPopup, setShowImageUploadPopup] = useState(false); // State to control the visibility of the ImageUploadPopup
  const [isAdmin, setIsAdmin] = useState("");
  const userProfile = sessionStorage.getItem("Profile_Picture");
  const [isVerified, setIsVerified] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { fetchShoes } = useContext(ShoeContext);

  const handleToRateOpen = () => {
    setShowToRateModal(true);
  };

  const handleToRateClose = () => {
    setShowToRateModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          conf.urlPrefix + "/api/users/me?populate=*",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );

        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
        setBio(userData.Bio);
        setIsAdmin(userData.role.name === "admin");
        setIsVerified(userData.Verify);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePostSellClick = () => {
    if (isVerified === false || isVerified === null) {
      setIsOpen(true);
    } else {
      setShowImageUploadPopup(true); // Open the ImageUploadPopup when the "Post sell" button is clicked
    }
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Header />
      <header
        className="bg-black py-1"
        style={{ backgroundColor: "#4d4336", display: "flex" }}
      ></header>
      <header
        style={{
          backgroundImage: "url('PictureforShow/back.png')",
          height: "200px",
          display: "flex",
          top: "center",
          boxShadow: "0 8px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          className="px-4 lg:px-8 rounded-full"
          style={{ display: "flex", alignItems: "center" }}
        >
          {userProfile !== " " ? (
            <img
              className="object-cover  p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-10"
              src={userProfile}
              alt="User Profile"
              style={{
                width: 140,
                height: 140,
                backgroundColor: "white",
              }}
            />
          ) : (
            <MdAccountCircle className="mr-4" size={100} color="white" />
          )}

          <div>
            <p
              style={{
                fontSize: "30px",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "10px" }}>{username}</span>
              {isAdmin ? (
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaStar
                    color="#edd745"
                    size="20"
                    style={{ marginRight: "5px", marginTop: "5px" }}
                  />
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#edd745",
                      marginTop: "6px",
                    }}
                  >
                    admin
                  </span>
                </span>
              ) : (
                <>
                  {!isVerified && (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaTimes
                        color="#a3a6a2"
                        size="20"
                        style={{ marginRight: "5px", marginTop: "5px" }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#a3a6a2",
                          marginTop: "3px",
                        }}
                      >
                        not verified
                      </span>
                    </span>
                  )}
                  {isVerified && (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <FaCheck
                        color="#79d160"
                        size="20"
                        style={{ marginRight: "5px", marginTop: "5px" }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#79d160",
                          marginTop: "4px",
                        }}
                      >
                        verified
                      </span>
                    </span>
                  )}
                </>
              )}
            </p>
            <p style={{ fontSize: "18px", color: "white" }}>{email}</p>
            {bio && (
              <p
                className="mt-1 mb-1"
                style={{ fontSize: "12px", color: "white" }}
              >
                {" "}
                bio : {bio}
              </p>
            )}

            <button
              className="mt-1"
              style={{
                fontSize: "14px",
                color: "white",
                border: "1px solid white",
                borderRadius: "8px",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                to="/Editprofile"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  class="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="square"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.4 1.6a2 2 0 0 1 0 2.7l-6 6-3.4.7.7-3.4 6-6a2 2 0 0 1 2.7 0Z"
                  />
                </svg>
                <span>Edit Profile</span>
              </Link>
            </button>
          </div>
        </div>
      </header>
      <Link
        to="/Purchases"
        className="ml-4 flex items-center"
        style={{
          marginTop: "20px",
          textDecoration: "none",
          color: "black",
        }}
      >
        <FaHistory size={40} className="mr-2" />
        <h2
          style={{
            fontSize: "24px",
            color: "black",
            marginBottom: 0,
          }}
        >
          Purchase History
        </h2>
      </Link>
      <div className="flex justify-center mt-8">
        <Link
          to="/Purchases"
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-12 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <FaShoppingCart className="mr-2 mt-4" size={50} />
          <p style={{ fontSize: "20px" }}>To pay</p>
        </Link>

        <Link
          to="/Purchases?tab=toShip"
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-12 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <FaGift size={50} className="mt-3 mb-1" />
          <p style={{ fontSize: "20px" }}>To ship</p>
        </Link>

        <Link
          to="/Purchases?tab=toReceive"
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <FaTruck size={50} className="mt-3 mb-1" />
          <p style={{ fontSize: "20px" }}>To receive</p>
        </Link>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-12 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
          onClick={handleToRateOpen}
        >
          <FaStar size={50} className="mt-3 mb-1" />
          <p style={{ fontSize: "20px" }}>To rate</p>
        </button>
        <div
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-12 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
          onClick={handlePostSellClick}
        >
          <FaStoreAlt size={50} className="mt-3 mb-1" />
          <p style={{ fontSize: "20px" }}>Post sell</p>
        </div>
        <Link
          onClick={fetchShoes}
          to="/YourItem"
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            height: "125px",
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          <FaSuitcase size={50} className="mt-3 mb-1" />
          <p style={{ fontSize: "20px" }}>My item</p>
        </Link>
      </div>
      <div className="flex justify-start mb-3 mt-3 ml-4">
        <Link
          to="/"
          className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black flex items-center "
        >
          <FaReply size={20} /> <span className="ml-2">Return</span>
        </Link>
      </div>
      {showToRateModal && <ToRate onClose={handleToRateClose} />}
      {showImageUploadPopup && (
        <ImageUploadPopup onClose={() => setShowImageUploadPopup(false)} />
      )}{" "}
      {/* Render the ImageUploadPopup component */}
      <>
        {isOpen && (
          <PopupContainer>
            <PopupContent>
              <h2 className="mb-5">Please verify your account first.</h2>
              <ButtonContainer>
                <Button onClick={handleOk}>Got it!</Button>
              </ButtonContainer>
            </PopupContent>
          </PopupContainer>
        )}
      </>
    </div>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 400px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 6px 16px;
  background-color: #3aa836;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #66d663;
  }
`;

export default Profile;
