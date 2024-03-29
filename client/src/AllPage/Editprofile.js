import React, { useState, useEffect, useRef, version } from "react";
import Header from "../Component/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaSleigh, FaStreetView } from "react-icons/fa";
import conf from "../config/main";

const EditProfile = ({ setProfile }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userProfile, setUserProfile] = useState("");
    const inputRef = useRef(null);
    const [userId, setUserId] = useState(""); // Add userId state
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [Bank_account, setbankaccout] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");
    const [token, setToken] = useState(""); // Add token state
    const [isAdmin, setIsAdmin] = useState("");
    const [isVerify, setIsVerify] = useState("");
    const [telNum, setTelNum] = useState("");
    const [realName, setRealName] = useState("");
    const [isWaiting, setIsWaiting] = useState("");
    const [setisUserUpdated, setSetisUserUpdated] = useState(""); // Add setisUserUpdated state
    const [errorMessage, setErrorMessage] = useState("");
    const [isDelete, setIsDelete] = useState("");
    const [isSubmitOpen, setIsSubmitOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [isCancleOpen, setIsCancleOpen] = useState(false);
    const [isWaitingOpen, setIsWaitingOpen] = useState(false);
    axios.defaults.headers.common["Authorization"] =
        `Bearer ${sessionStorage.getItem("authToken")}`;
    useEffect(() => {
        fetchUserData();
    }, []);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                conf.urlPrefix+"/api/users/me?populate=Profile_Picture"
            );
            const getRole = await axios.get(
                conf.urlPrefix+"/api/users/me?populate=*"
            );

            const user = getRole.data;
            const userData = response.data;
            console.log("🚀 ~ fetchUserData ~ userData:", userData);

            setUsername(userData.username);
            setEmail(userData.email);
            setFirstName(userData.First_Name);
            setLastName(userData.Last_Name);
            setAddress(userData.Address);
            setBio(userData.Bio);
            setRealName(userData.Real_Name);
            setTelNum(userData.PhoneNum);
            setIsWaiting(userData.VerificationWaiting);
            setbankaccout(userData.Bankaccounts);
            setIsAdmin(user.role.name === "admin");
            setIsVerify(user.Verify);
            if (isAdmin) {
                setIsVerify(true);
            }
            console.log("Verify", isVerify);

            if (userData.Profile_Picture && userData.Profile_Picture.url) {
                setUserProfile(
                    conf.urlPrefix + userData.Profile_Picture.url
                );
            } else {
                setUserProfile(""); // Set userProfile to an empty string or a default image URL
            }

            setUserId(userData.id);
            setToken(sessionStorage.getItem("authToken"));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleImageDelete = () => {
        setIsDelete(true);
    };

    const handleDelete = async () => {
        setIsDelete(false);
        try {
            //Asset ID
            const response = await axios.get(
                conf.urlPrefix+"/api/users/me?populate=Profile_Picture"
            );
            const userData = response.data;
            const profilePicture = userData.Profile_Picture;
            const assetId = profilePicture && profilePicture.id;

            if (assetId) {
                await axios.delete(
                    `${conf.urlPrefix}/api/upload/files/${assetId}`
                );
                fetchUserData(); // Refresh user data after deletion
                console.log("Image deleted successfully");
            } else {
                console.log("No profile picture found to delete");
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    const handleNotDelete = () => {
        setIsDelete(false);
    };

    const handleImageChange = async () => {
        // Check if there is any file selected
        if (inputRef.current.files.length === 0) {
            return; // No file selected, exit function
        }

        const image = inputRef.current.files[0];
        try {
            const response = await axios.put(
                `${conf.urlPrefix}/api/users/${userId}`,
                {
                    username: username,
                    email: email,
                }
            );

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

                axios
                    .post(`${conf.urlPrefix}/api/upload`, formData)
                    .then((response) => {
                        console.log(response);
                        const imageUrl = `${conf.urlPrefix}${response.data[0].url}`;
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

    const handleSubmit = () => {
        setIsSubmitOpen(true);
    };

    const handleAcceptSubmit = async () => {
        try {
            const response = await axios.put(
                `${conf.urlPrefix}/api/users/${userId}`,
                {
                    username: username,
                    email: email,
                    First_Name: firstName,
                    Last_Name: lastName,
                    Bio: bio,
                }
            );
            console.log("Edit successful:", response.data);
            setIsSubmitOpen(false);
            setSuccessOpen(true);
        } catch (error) {
            console.error("Error editing profile:", error);
        }
        setSuccessOpen(true);
    };

    const handleOk = () => {
        navigate("/profile");
    };
    const handleOk2 = () => {
        setIsWaitingOpen(false);
    };

    const handleDenySubmit = () => {
        setIsSubmitOpen(false);
    };

    const handleCancle = () => {
        setIsCancleOpen(true);
    };

    const handleAcceptCancle = async () => {
        try {
            await fetchUserData();
            console.log("Changes cancelled");
            setIsCancleOpen(false);
            navigate("/profile");
        } catch (error) {
            console.error("Error cancelling changes:", error);
        }
    };

    const handleDenyCancle = () => {
        setIsCancleOpen(false);
    };

    const handleVerify = async () => {
        if (
            realName === "" ||
            realName === null ||
            address === "" ||
            address === null ||
            telNum === "" ||
            telNum === null ||
            Bank_account === "" ||
            Bank_account === null /*|| other === ""*/
        ) {
            setErrorMessage("Please fill in all fields");
            console.log("verify error");
            setIsWaiting(false);
        } else {
            setIsWaitingOpen(true);
            try {
                const response = await axios.put(
                    `${conf.urlPrefix}/api/users/${userId}`,
                    {
                        Real_Name: realName,
                        Address: address,
                        PhoneNum: telNum,
                        Bankaccounts: Bank_account,
                        VerificationWaiting: true,
                        Verify: null,
                    }
                );
                console.log("Wait for verifying..", response.data);
            } catch (error) {
                console.error("Error editing profile:", error);
            }
            setIsVerify(null);
            setIsWaiting(true);
        }
    };

    return (
        <>
            <Header />
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12"></div>
                </aside>
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="p-2 md:p-4">
                        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                            <h2 className="text-2xl font-bold sm:text-xl">
                                Edit your profile
                            </h2>
                            <div className="grid max-w-2xl mx-auto mt-8">
                                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                    <img
                                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                        src={userProfile}
                                        alt="Profile"
                                    />
                                    <div className="flex flex-col space-y-5 sm:ml-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                inputRef.current.click()
                                            }
                                            className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                                        >
                                            Change picture
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            style={{ display: "none" }}
                                            ref={inputRef}
                                        />

                                        <button
                                            type="button"
                                            onClick={handleImageDelete}
                                            className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                                        >
                                            Delete picture
                                        </button>
                                    </div>
                                </div>
                                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                        <div className="w-full">
                                            <label
                                                htmlFor="first_name"
                                                className="block text-sm font-medium text-indigo-900 dark:text-white"
                                            ></label>
                                            <p className="mb-3">First Name</p>
                                            <input
                                                type="text"
                                                id="first_name"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="Your first name"
                                                value={firstName}
                                                onChange={(e) =>
                                                    setFirstName(e.target.value)
                                                }
                                                required
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label
                                                htmlFor="last_name"
                                                className="block text-sm font-medium text-indigo-900 dark:text-white"
                                            ></label>
                                            <p className="mb-3">Last Name</p>
                                            <input
                                                type="text"
                                                id="last_name"
                                                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                                placeholder="Your last name"
                                                value={lastName}
                                                onChange={(e) =>
                                                    setLastName(e.target.value)
                                                }
                                                defaultValue=""
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        ></label>
                                        <p className="mb-3">Username</p>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                            value={username}
                                            placeholder="username"
                                            required
                                        />
                                    </div>
                                    <div className="mb-2 sm:mb-6">
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        ></label>
                                        <p className="mb-3">Email Address</p>
                                        <input
                                            type="email"
                                            id="email"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            value={email}
                                            placeholder="your.email@mail.com"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                        ></label>
                                        <p className="mb-3">Profile bio</p>
                                        <textarea
                                            id="message"
                                            rows="2"
                                            className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                            onChange={(e) =>
                                                setBio(e.target.value)
                                            }
                                            value={bio}
                                            placeholder="Add your bio"
                                            style={{ resize: "none" }}
                                        ></textarea>
                                    </div>

                                    <div className="flex justify mt-8">
                                        <button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="text-white bg-indigo-700 mr-80 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                        >
                                            Save
                                        </button>
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
                                <h2 className="text-2xl font-bold sm:text-xl">
                                    For verify your account
                                </h2>
                                <div className="mb-6 mt-8">
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                                    ></label>
                                    <p className="mb-2">Real Name</p>
                                    <input
                                        type="text"
                                        id="last_name"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="Enter your real name Ex. Mr.Hello Neptune"
                                        defaultValue={realName}
                                        onChange={(e) =>
                                            setRealName(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor="message"
                                        className="block mb-5 text-sm font-medium text-indigo-900 dark:text-white"
                                    ></label>
                                    <p className="mb-2">Address</p>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        value={address}
                                        placeholder="Enter your address"
                                    ></textarea>
                                </div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium text-indigo-900 dark:text-white"
                                ></label>
                                <p className="mb-2">Phone Number</p>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                    placeholder="Enter your phone number"
                                    defaultValue={telNum}
                                    onChange={(e) => setTelNum(e.target.value)}
                                />
                                <p className="mb-2 mt-3">Bank Accounts</p>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                    placeholder="Enter name and number of your bank account"
                                    defaultValue={Bank_account}
                                    onChange={(e) =>
                                        setbankaccout(e.target.value)
                                    }
                                />
                                {errorMessage && (
                                    <p className="mt-5 text-red-500">
                                        {errorMessage}.
                                    </p>
                                )}

                                <div className="mt-8 flex justify">
                                    <button
                                        type="button"
                                        onClick={handleVerify}
                                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                                    >
                                        Verify your account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {isWaiting && !isVerify && (
                        <div className="flex justify-center items-center bg-yellow-500 text-white py-2 fixed bottom-0 left-0 right-0 z-50">
                            <p>Your account is waiting for verification.</p>
                        </div>
                    )}
                    {isVerify === false && (
                        <div className="flex justify-center items-center bg-red-700 text-white py-2 fixed bottom-0 left-0 right-0 z-50">
                            <p>Your verification has been denied.</p>
                        </div>
                    )}
                </main>
            </div>

            <>
                {isDelete && (
                    <PopupContainer>
                        <PopupContent>
                            <h2>Are you sure you want to delete</h2>
                            <h2 className="mb-8">your profile picture?</h2>
                            <ButtonContainer>
                                <YesButton onClick={handleDelete}>
                                    Yes
                                </YesButton>
                                <NoButton onClick={handleNotDelete}>
                                    No
                                </NoButton>
                            </ButtonContainer>
                        </PopupContent>
                    </PopupContainer>
                )}
            </>

            <>
                {isSubmitOpen && (
                    <PopupContainer>
                        <PopupContent>
                            <h2 className="mb-10">
                                Are you sure you want to save changes?
                            </h2>
                            <ButtonContainer>
                                <YesButton onClick={handleAcceptSubmit}>
                                    Yes
                                </YesButton>
                                <NoButton onClick={handleDenySubmit}>
                                    No
                                </NoButton>
                            </ButtonContainer>
                        </PopupContent>
                    </PopupContainer>
                )}
            </>

            <>
                {isCancleOpen && (
                    <PopupContainer>
                        <PopupContent>
                            <h2 className="mb-10">
                                Are you sure you want to discard all changes?
                            </h2>
                            <ButtonContainer>
                                <YesButton onClick={handleAcceptCancle}>
                                    Yes
                                </YesButton>
                                <NoButton onClick={handleDenyCancle}>
                                    No
                                </NoButton>
                            </ButtonContainer>
                        </PopupContent>
                    </PopupContainer>
                )}
            </>

            <>
                {successOpen && (
                    <PopupContainer>
                        <PopupContent>
                            <h2 className="mb-10">Saved successfully</h2>
                            <ButtonContainer2>
                                <OkButton onClick={handleOk}>Got it!</OkButton>
                            </ButtonContainer2>
                        </PopupContent>
                    </PopupContainer>
                )}
            </>

            <>
                {isWaitingOpen && (
                    <PopupContainer>
                        <PopupContent2>
                            <h2 className="mb-6 text-xl font-semibold text-yellow-400">
                                กำลังอยู่ในระหว่างการตรวจสอบยืนยันตัวตน...
                            </h2>
                            <h2>ขณะนี้แอดมินกำลังทำการตรวจสอบข้อมูลของคุณ</h2>
                            <h2>ซึ่งจะมีการตอบกลับภายใน 48 ชั่วโมง</h2>
                            <h2>หากพบปัญหา โปรดติดต่อที่ 08-88888</h2>
                            <ButtonContainer2>
                                <OkButton className="mt-8" onClick={handleOk2}>
                                    Got it!
                                </OkButton>
                            </ButtonContainer2>
                        </PopupContent2>
                    </PopupContainer>
                )}
            </>
        </>
    );
};

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

const PopupContent2 = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 550px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ButtonContainer2 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const YesButton = styled.button`
    padding: 6px 16px;
    background-color: #28287a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-left: 30px;

    &:hover {
        background-color: #6464c4;
    }
`;

const NoButton = styled.button`
    padding: 6px 16px;
    background-color: #cf332d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-right: 30px;

    &:hover {
        background-color: #d66663;
    }
`;

const OkButton = styled.button`
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

export default EditProfile;
