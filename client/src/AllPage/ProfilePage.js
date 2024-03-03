import React, { useState, useEffect } from "react";
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
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import ToRate from "../Component/ToRateContent";
import ImageUploadPopup from "../AllPage/SellPage"; // Import the ImageUploadPopup component

function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showToRateModal, setShowToRateModal] = useState(false);
    const [showImageUploadPopup, setShowImageUploadPopup] = useState(false); // State to control the visibility of the ImageUploadPopup
    const userProfile = sessionStorage.getItem("Profile_Picture");
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
                    "http://localhost:1337/api/users/me",
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                        },
                    }
                );

                const userData = response.data;
                setUsername(userData.username);
                setEmail(userData.email);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handlePostSellClick = () => {
        setShowImageUploadPopup(true); // Open the ImageUploadPopup when the "Post sell" button is clicked
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
                    backgroundImage: "url('PictureforShow/ิback.png')",
                    height: "150px",
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
                            className="mr-4 rounded-full"
                            src={userProfile}
                            alt="User Profile"
                            style={{
                                width: 100,
                                height: 100,
                                backgroundColor: "white",
                            }}
                        />
                    ) : (
                        <MdAccountCircle
                            className="mr-4"
                            size={100}
                            color="white"
                        />
                    )}

                    <div>
                        <p style={{ fontSize: "32px", color: "white" }}>
                            {username}
                        </p>
                        <p style={{ fontSize: "18px", color: "white" }}>
                            {email}
                        </p>
                        <button className="mt-1" style={{ fontSize: "12px", color: "white", border: "1px solid white", borderRadius: "8px", padding: "8px 16px"}}>
                            <Link to="/Editprofile" style={{ color: "white" }}>Edit Profile 🔧</Link>
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
                    <p style={{fontSize:"20px"}}>To pay</p>
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
                    <p style={{fontSize:"20px"}}>To ship</p>
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
                    <FaTruck size={50} className="mt-3 mb-1"/>
                    <p style={{fontSize:"20px"}}>To receive</p>
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
                    <p style={{fontSize:"20px"}}>To rate</p>
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
                    <p style={{fontSize:"20px"}}>Post sell</p>
                </div>

                <Link
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
                    <p style={{fontSize:"20px"}}>Your item</p>
                </Link>
            </div>
            <div className="flex justify-start mb-3 ml-4 mt-8" >
                <Link
                    to="/"
                    className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black flex items-center "
                >
                    <FaReply size={20} /> <span className="ml-2">Return</span>
                </Link>
            </div>

            {showToRateModal && <ToRate onClose={handleToRateClose} />}
            {showImageUploadPopup && (
                <ImageUploadPopup
                    onClose={() => setShowImageUploadPopup(false)}
                />
            )}{" "}
            {/* Render the ImageUploadPopup component */}
        </div>
    );
}

export default Profile;
