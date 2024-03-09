import { useState, useEffect, } from "react";
import MyMessage from "./message/MyMessage";
import YourMessage from "./message/YourMessage";
import axios from "axios";
import conf from "../config/main";
import { useParams } from "react-router-dom";
import Header from "./Header";

export default function Message(id) {
  
    const [Message, setMessage] = useState();
    const [inputText, setInputText] = useState("");
    const [userData, setUserdata] = useState("");
    const userid = useParams(id);
    const receiverID = parseInt(userid.id);

    axios.defaults.headers.common["Authorization"] =
        `Bearer ${sessionStorage.getItem("authToken")}`;
    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 5000);

        return () => clearInterval(interval);
    }, [userData]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                conf.urlPrefix + "/api/users/me?populate=Profile_Picture",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );
            const response2 = await axios.get(
                conf.urlPrefix +
                    `/api/users/${receiverID}?populate=Profile_Picture`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );

            const id1 = response.data.id;
            let profile_picture1;
            if (response.data.Profile_Picture === null) {
                profile_picture1 = "";
            } else {
                profile_picture1 =
                    conf.urlPrefix + response.data.Profile_Picture.url;
            }
            const id2 = response2.data.id;
            let profile_picture2;
            if (response2.data.Profile_Picture === null) {
                profile_picture2 = "";
            } else {
                profile_picture2 =
                    conf.urlPrefix + response2.data.Profile_Picture.url;
            }
            setUserdata({ id1, profile_picture1, id2, profile_picture2 });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    if (userData === "") {
        fetchUserData();
    }

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                conf.urlPrefix + "/api/messages?populate=*&?pagination[start]=0&pagination[limit]=999"
            );
            if (Array.isArray(response.data.data)) {
                const MessagesData = response.data.data.map((chat) => {
                    const { id, attributes } = chat;
                    const { text, sender, receiver, picture, createdAt } =
                        attributes;
                    const image =
                        picture && picture.data && picture.data.length > 0
                            ? picture.data.map(
                                  (img) => conf.urlPrefix + img.attributes.url
                              )
                            : [];

                    const Receiver = receiver.data;
                    const Sender = sender.data;

                    return {
                        text,
                        image,
                        Receiver,
                        Sender,
                        createdAt,
                    };
                });

                const Message = MessagesData.filter((chat) => {
                    return (
                        (chat.Sender.id === userData.id1 &&
                            chat.Receiver.id === receiverID) ||
                        (chat.Sender.id === receiverID &&
                            chat.Receiver.id === userData.id1)
                    );
                });

                setMessage(Message);
            } else {
                console.error(
                    "Response data is not an array:",
                    response.data.data
                );
            }
        } catch (error) {
            console.error("Error fetching message:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const messageData = {
                data: {
                    text: inputText,
                    sender: { connect: [userData.id1] },
                    receiver: { connect: [userData.id2] },
                },
            };

            const response = await axios.post(
                conf.urlPrefix + "/api/messages",
                messageData
            );

            // Handle response if needed
            setInputText("");
            fetchMessages()
        } catch (err) {
            console.error("Error:", err);
            // Handle error if needed
        }
    };

    // Function to handle closing the modal
    // const handleCloseModal = () => {
    //     if (toggleModal) {
    //         toggleModal(false);
    //     }
    // };

    return (
        <div className="">
            <Header />
            <div className=" w-full  flex flex-col max-h-100vh justify-items-center overflow-auto">
                <div className="fixed flex  w-full px-[15%] min-h-100vh max-h-100vh flex-col  bottom-0">
                    <div>
                        {Message &&
                        Message.map((chat) => {
                            if (chat.Sender.id === userData.id1) {
                                return (
                                    <MyMessage
                                        data={chat}
                                        pic={userData.profile_picture1}
                                    />
                                );
                            } else {
                                return (
                                    <YourMessage
                                        data={chat}
                                        pic={userData.profile_picture2}
                                    />
                                );
                            }
                        })}
                    <div className="py-5 w-full px-4 ">
                        <div className=""> 
                            <div className="flex justify-between w-full  bg-gray-300 py-5 px-5  rounded-xl justify-self-end">
                                <input
                                    className=" bg-gray-300 w-full h-auto border-none outline-none"
                                    type="text"
                                    placeholder="type your message here..."
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        handleSubmit();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
