import React, { useState, useEffect, useRef } from 'react';
import Header from "../Component/Header";
import axios from "axios";

const EditProfile = ({ setProfile }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userProfile, setUserProfile] = useState(""); 
  const inputRef = useRef(null); 
  const [userId, setUserId] = useState(""); // Add userId state
 
  const [token, setToken] = useState(""); // Add token state
  const [setisUserUpdated, setSetisUserUpdated] = useState(""); // Add setisUserUpdated state
  axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("authToken")}`
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/users/me?populate=Profile_Picture",);

      const userData = response.data;
      console.log("🚀 ~ fetchUserData ~ userData:", userData)
      
      setUsername(userData.username);
      setEmail(userData.email);
      setUserProfile("http://localhost:1337"+userData.Profile_Picture.url);
      setUserId(userData.id); // Set userId state
      setToken(sessionStorage.getItem("authToken")); // Set token state
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleImageDelete = async () => {
    try {
      await axios.delete(`http://localhost:1337/api/upload/${userId}`, {
        username: username,
        email: email,
        
      });
      fetchUserData(); // Refresh user data after deletion
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleImageChange = async () => {
    const image = inputRef.current.files[0];
    try {
      const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
        username: username,
        email: email,
      });

      if (image) {
        const formData = new FormData();
        formData.append("field", "Profile_Picture");
        formData.append("ref", "plugin::users-permissions.user");
        formData.append("refId", userId);
        formData.append("files", image);

        axios.post(`http://localhost:1337/api/upload`, formData)
          .then((response) => {
            console.log(response);
            sessionStorage.setItem("Profile_Picture", `http://localhost:1337${response.data[0].url}`);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      const imageUrl = "http://localhost:1337" + response.data[0].url;
      fetchUserData(); // Refresh user data after image change
      setUserProfile(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async () => {
    // Your submit logic here
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
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
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
                      <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your first name</label>
                      <input type="text" id="first_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Your first name" defaultValue="" required />
                    </div>
                    <div className="w-full">
                      <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your last name</label>
                      <input type="text" id="last_name" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="Your last name" defaultValue="" required />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " placeholder="your.email@mail.com" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Address</label>
                    <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 " placeholder="Write your bio here..."></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={handleSubmit} className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
