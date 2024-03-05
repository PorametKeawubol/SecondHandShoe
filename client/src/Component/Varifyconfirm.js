import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Varifyconfirm = ({ setProfile }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [waiter, setWaiter] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showPopupOnLeft, setShowPopupOnLeft] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  axios.defaults.headers.common["Authorization"] =
  `Bearer ${sessionStorage.getItem("authToken")}`;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filteredUser();
  }, [users]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:1337/api/users?populate=*');
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  const handleRequestVerificationAccept = async (userId) => {
    try {
      await axios.put(`http://localhost:1337/api/users/${userId}`, {
        VerificationWaiting: false,
        Verify: true,
      });
      alert('Your verification request has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting verification request:', error);
    } finally {
      fetchData();
    }
  };

  const handleRequestVerificationDecline = async (userId) => {
    try {
      await axios.put(`http://localhost:1337/api/users/${userId}`, {
        VerificationWaiting: false,
        Verify: false,
      });
      alert('Your verification request has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting verification request:', error);
    } finally {
      fetchData();
    }
  };

  const filteredUser = () => {
    const filtered = users.filter((user) => user.VerificationWaiting === true);
    setWaiter(filtered);
  };

  const handleMouseEnter = (userId, event) => {
    setHoveredUser(userId);
    const popupWidth = 200; // Adjust according to your popup content width
    const popupHeight = 200; // Adjust according to your popup content height
    const popupOffset = 10; // Adjust according to your preference
  
    // Calculate left position relative to the card and window width
    let leftPosition = event.pageX + popupOffset;
    if (event.pageX + popupWidth + popupOffset > window.innerWidth) {
      leftPosition = window.innerWidth - popupWidth - popupOffset; // Adjust if the popup would go off the screen
    }
  
    // Calculate top position relative to the card and window height
    let topPosition = event.pageY - popupHeight / 2;
    if (event.clientY - popupHeight / 2 < 0) {
      topPosition = 0; // Ensure the popup does not go off the screen from the top
    } else if (event.clientY + popupHeight / 2 > window.innerHeight) {
      topPosition = window.innerHeight - popupHeight; // Adjust if the popup would go off the screen from the bottom
    }
  
    setPopupPosition({ top: topPosition, left: leftPosition });
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
    setShowPopup(false);
  };

  const Popup = ({ user }) => {
    return (
      <div
        className={`fixed bg-white rounded-lg shadow-md overflow-hidden z-10 ${
          showPopup ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${showPopupOnLeft ? 'left-0' : 'right-0'}`}
        style={{
          top: popupPosition.top,
          left: popupPosition.left,
          maxWidth: "300px", // Adjust the maximum width as needed
          transition: "opacity 0.3s ease-in-out", // Add transition effect
        }}
      >
        <div className="p-4">
          <p>
            <strong>Real Name:</strong> {user.Real_Name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {user.PhoneNum}
          </p>
          <p>
            <strong>Address:</strong> {user.Address}
          </p>
          <p>
            <strong>Bank Accounts:</strong> {user.Bankaccounts}
          </p>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Request Verification</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {waiter.map((user) => (
              <div key={user.id} className="relative">
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 hover:duration-300"
                  onMouseEnter={(e) => handleMouseEnter(user.id, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Default card content */}
                  <img
                    src={`http://localhost:1337${user.Profile_Picture?.url}`}
                    alt={user.username}
                    className="w-24 h-24 object-cover rounded-full mx-auto mb-4 "
                  />
                  <h2 className="text-lg font-semibold text-center">{user.username}</h2>
                  {/* Conditional rendering of buttons */}
                  {hoveredUser === user.id ? (
                    <>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => handleRequestVerificationAccept(user.id)}
                        className="block w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRequestVerificationDecline(user.id)}
                        className="block w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 "
                      >
                        Decline
                      </button>
                    </div>
                    </>
                  ) : (
                    <button
                      className="block w-full mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                    >
                      Request Verification
                    </button>
                  )}
                </div>
                {hoveredUser === user.id && <Popup user={user} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Varifyconfirm;
