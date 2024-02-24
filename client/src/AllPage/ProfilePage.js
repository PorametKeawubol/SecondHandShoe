import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import axios from 'axios';
import { FaShoppingCart, FaTruck, FaGift, FaStar, FaShip, FaSuitcase, FaReply, FaHistory, FaStoreAlt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ToRate from '../Component/ToRateContent';

function Profile() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [showToRateModal, setShowToRateModal] = useState(false);

    const handleToRateOpen = () => {
        setShowToRateModal(true);
    };

    const handleToRateClose = () => {
        setShowToRateModal(false);}

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                const userData = response.data;
                setUsername(userData.username);
                setEmail(userData.email);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <Header />
            <header className="bg-black py-1" style={{ backgroundColor: '#676666', display: 'flex' }}></header>
            <header className="bg-black py-10" style={{ backgroundColor: 'black', display: 'flex', top: 'center' }}>
                <div className="px-4 lg:px-8" style={{ display: 'flex', alignItems: 'center' }}>
                    <MdAccountCircle className="mr-4 mt-20" size={100} color="white"/>
                    <div>
                        <h1 style={{ fontSize: '40px', color: 'white', marginTop: '80px' }}>{username}</h1>
                        <p style={{ fontSize: '20px', color: 'white' }}>{email}</p>
                    </div>
                </div>
            </header>
            <Link to="/Purchases" className="ml-4 flex items-center" style={{ marginTop: '20px', textDecoration: 'none', color: 'black' }}>
                <FaHistory size={40} className="mr-2" />
                <h2 style={{ fontSize: '24px', color: 'black', marginBottom: 0 }}>Purchase History</h2>
            </Link>

            <div className="flex justify-center mt-8">

            <Link to="/Purchases" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }} >
                <FaShoppingCart className="mr-2" size={40} />
                <span>To pay</span>
            </Link>

            <Link to="/Purchases?tab=toShip" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }} >
                < FaGift  size={40} />
                <span>To ship</span>     
            </Link>

            <Link to="/Purchases?tab=toReceive" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
                <FaTruck size={40} />
                <span>To receive</span>     
            </Link>
            </div>
            
            <div className="flex justify-center mt-4">
                <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }} onClick={handleToRateOpen}>
                    <FaStar size={40} />
                    <span>To rate</span>
                </button>
                <Link to="/Sell" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
                    <FaStoreAlt size={40} />
                    <span>Post sell</span>
                </Link>

                <button className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-md mr-8 border border-black" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px' }}>
                    <FaSuitcase size={40} />
                    <span>Your item</span>
                </button>
            </div>

            <div className="flex justify-start mt-20 mb-8 ml-4">
                <Link to="/" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black flex items-center">
                    <FaReply size={20} /> <span className="ml-2">Return</span>
                </Link>
            </div>
            {showToRateModal && <ToRate onClose={handleToRateClose} />}
        </div>
    )
}

export default Profile;
