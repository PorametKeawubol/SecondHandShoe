import React, { useState, useEffect, useRef } from 'react';
import Header from "../Component/Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ setProfile }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userProfile, setUserProfile] = useState(""); 
  const inputRef = useRef(null); 
  const [userId, setUserId] = useState(""); // Add userId state
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [token, setToken] = useState(""); // Add token state
  const [isAdmin, setIsAdmin] = useState("");
  const [isVerify, setIsVerify] = useState("");
  const [telNum, setTelNum] = useState("");
  const [realName, setRealName] = useState("");
  const [isWaiting, setIsWaiting] = useState("");
  const [setisUserUpdated, setSetisUserUpdated] = useState(""); // Add setisUserUpdated state
  const [errorMessage, setErrorMessage] = useState("")
  axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("authToken")}`
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/users/me?populate=Profile_Picture");
      const getRole = await axios.get("http://localhost:1337/api/users/me?populate=*")

      const user = getRole.data;
      const userData = response.data;
      console.log("🚀 ~ fetchUserData ~ userData:", userData)

      setUsername(userData.username);
      setEmail(userData.email);
      setFirstName(userData.First_Name);
      setLastName(userData.Last_Name);
      setAddress(userData.Address);
      setBio(userData.Bio);
      setRealName(userData.Real_Name);
      setTelNum(userData.PhoneNum);
      setIsWaiting(userData.VerificationWaiting);

      setIsAdmin(user.role.name === "admin");
      setIsVerify(user.Verify === true);
      if (isAdmin) {
        setIsVerify(true);
      }
      
      if (userData.Profile_Picture && userData.Profile_Picture.url) {
        setUserProfile("http://localhost:1337" + userData.Profile_Picture.url);
      } else {
        setUserProfile(""); // Set userProfile to an empty string or a default image URL
      }
      
      setUserId(userData.id);
      setToken(sessionStorage.getItem("authToken")); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
  const handleImageDelete = async () => {
    try {
      //Asset ID
      const response = await axios.get("http://localhost:1337/api/users/me?populate=Profile_Picture");
      const userData = response.data;
      const profilePicture = userData.Profile_Picture;
      const assetId = profilePicture && profilePicture.id;
  
      if (assetId) {
        await axios.delete(`http://localhost:1337/api/upload/files/${assetId}`);
        fetchUserData(); // Refresh user data after deletion
        console.log("Image deleted successfully");
      } else {
        console.log("No profile picture found to delete");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };
  
  

  const handleImageChange = async () => {
    // Check if there is any file selected
    if (inputRef.current.files.length === 0) {
        return; // No file selected, exit function
    }
    
    const image = inputRef.current.files[0];
    try {
      const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
        username: username,
        email: email,
      });
  
      // Check if there is a previous image
      if (userProfile) {
        // Call handleDelete to delete the previous image
        await handleImageDelete();
      }
  
      if (image) {
        const formData = new FormData();
        formData.append("field", "Profile_Picture");
        formData.append("ref", "plugin::users-permissions.user");
        formData.append("refId", userId);
        formData.append("files", image);
  
        axios.post(`http://localhost:1337/api/upload`, formData)
          .then((response) => {
            console.log(response);
            const imageUrl = `http://localhost:1337${response.data[0].url}`;
            setUserProfile(imageUrl); // Update userProfile directly with the new image URL
            sessionStorage.setItem("Profile_Picture", imageUrl); // Update sessionStorage with the new image URL
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  
  
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
        username: username,
        email: email,
        First_Name: firstName,
        Last_Name: lastName,
        Bio: bio,
      });
      console.log("Edit successful:", response.data);
      //pop up success
      navigate('/Profile');
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };
  
  const handleCancle = () => {
    navigate('/Profile');
  }

  const handleVerify = async () => {
    if (realName === null || address === null || telNum === null /*|| other === ""*/) {
      setErrorMessage("Please fill in all fields")
      console.log('verify error')
    } else {
      try {
        const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
          Real_Name: realName,
          Address: address,
          PhoneNum: telNum,
          VerificationWaiting: true,
        });
        console.log("Wait for verifying..", response.data);
      } catch (error) {
        console.error("Error editing profile:", error);
      }
      setIsWaiting(true);
      //admin verify ให้ set waiting เป็น false และ set verify เป็น true
    }
  };

  

  return (
    <>
      <Header />
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 className="text-2xl font-bold sm:text-xl">Edit your profile</h2>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500" src={userProfile} alt="Profile" />
                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <button type="button" onClick={() => inputRef.current.click()} className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                      Change picture
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      ref={inputRef}
                    />

                    <button type="button" onClick={handleImageDelete} className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                      Delete picture
                    </button>
                  </div>
                </div>
                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label htmlFor="first_name" className="block text-sm font-medium text-indigo-900 dark:text-white"></label>
                      <p className='mb-3'>First Name</p>
                      <input type="text"
                      id="first_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required />
                    </div>
                    <div className="w-full">
                      <label htmlFor="last_name" className="block text-sm font-medium text-indigo-900 dark:text-white"></label>
                      <p className='mb-3'>Last Name</p>
                      <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} defaultValue="" required />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"></label>
                    <p className='mb-3'>Email Address</p>
                    <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="your.email@mail.com" required />
                  </div>
                  <div className="mb-6">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"></label>
                  <p className='mb-3'>Profile bio</p>
                  <textarea id="message" rows="2" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 " 
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                  placeholder="Add your bio"
                  style={{ resize: "none" }}></textarea>
                  </div>
                  
                  <div className="flex justify mt-8">
                      <button type="button" onClick={handleSubmit} className="text-white bg-indigo-700 mr-80 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                      <button 
                      type="button" 
                      onClick={handleCancle} 
                      className="text-white bg-red-700 ml-20 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {!isAdmin && !isVerify && !isWaiting && (
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="text-2xl font-bold sm:text-xl">For verify your account</h2>
            <div className="mb-6 mt-8">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"></label>
              <p className='mb-3'>Real Name</p>
                  <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Enter your real name Ex. Mrs.Supanee Thidasan"
                  defaultValue={realName}
                  onChange={(e) => setRealName(e.target.value)} />
                <label htmlFor="message" className="block mb-5 text-sm font-medium text-indigo-900 dark:text-white"></label>
              <p className='mb-3'>Address</p>
              <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 " 
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter your address"></textarea>
            </div>
              <label htmlFor="first_name" className="block text-sm font-medium text-indigo-900 dark:text-white"></label>
              <p className='mb-3'>Phone Number</p>
                  <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Enter your phone number"
                  defaultValue={telNum}
                  onChange={(e) => setTelNum(e.target.value)}/>
              {/* ใส่ input เพิ่มได้ตรงนี้ */}
              {/* <label htmlFor="message" className="block mb-5 text-sm font-medium text-indigo-900 dark:text-white"></label>
              <p className='mb-3'>Other</p>
                  <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Other..."
                  value={}
                  onChange={(e) => set(e.target.value)} defaultValue=""
                  /> */}
                  {errorMessage && (
                    <p className='mt-5 text-red-500'>{errorMessage}.</p>
                  )}
                  <div className="mt-7 flex justify">
                  <button
                  type="button"
                  onClick={handleVerify} 
                  className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700">
                      Verify your account
                    </button>
                  </div>
            </div>)}
          </div>
          {isWaiting && (
          <div className="flex justify-center items-center bg-yellow-500 text-white py-2 fixed bottom-0 left-0 right-0 z-50">
            <p>Your account is waiting for verification.</p>
          </div>
        )}
        </main>
      </div>
    </>
  );
};

export default EditProfile;