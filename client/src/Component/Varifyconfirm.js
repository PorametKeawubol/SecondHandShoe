import React, { useState, useEffect, useRef } from 'react';
import Header from "../Component/Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Varifyconfirm = ({ setProfile }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [waiter,setWaiter] = useState([])
  console.log("🚀 ~ Varifyconfirm ~ waiter:", waiter)
  axios.defaults.headers.common["Authorization"] =`Bearer ${sessionStorage.getItem("authToken")}`;
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    filteredUser()
  },[users])
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/users?populate=*");
      setUsers(response.data);
      console.log("fffff",response.data)
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  };
  const handleRequestVerification = async (userId) => {
    try {
      await axios.put(`http://localhost:1337/api/users/${userId}`, {
        VerificationWaiting: false
      });
      alert("Your verification request has been submitted successfully!");
      ; // Redirect to homepage after submitting verification request
    } catch (error) {
      console.error("Error submitting verification request:", error);
    }finally{
        fetchData()
    }
  };
  const filteredUser =()=>{
    const filtered = users.filter((user)=>{
        
        return user.VerificationWaiting === true
    })
    setWaiter(filtered)
  } 

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Request Verification</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {waiter.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={`http://localhost:1337${user.Profile_Picture?.url}`}
                  alt={user.username}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold text-center">{user.username}</h2>
                <button
                  onClick={() => handleRequestVerification(user.id)} 
                  className="block w-full mt-4 py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Request Verification
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Varifyconfirm;
