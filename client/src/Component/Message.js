import { useState, useEffect } from "react";
import MyMessage from "./message/MyMessage";
import YourMessage from "./message/YourMessage";
import axios from "axios";
import conf from "../config/main";
import { useParams } from "react-router-dom";
export default function Message() {
    const [Message, setMessage] = useState();
    const [inputText, setInputText] = useState("");
    const [userData,setUserdata] = useState('')
    console.log("🚀 ~ Message ~ userData:", userData)
    const id = useParams()
    const receiverID = parseInt(id.id);
    
    
    axios.defaults.headers.common["Authorization"] =
        `Bearer ${sessionStorage.getItem("authToken")}`;
    useEffect(() => {
        fetchMessages();
    }, [userData]);
    useEffect(()=>{
        fetchUserData();
    },[])
  
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                conf.apiUrlPrefix+"/users/me?populate=Profile_Picture",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );
            const response2 = await axios.get(
                conf.apiUrlPrefix+`/users/${receiverID}?populate=Profile_Picture`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );
            console.log("🚀 ~ fetchUserData ~ response2:", response2.data)

            const id1 = response.data.id
            let profile_picture1;
            if (response.data.Profile_Picture === null) {
                profile_picture1 = "";
            } else {
                profile_picture1 =
                    conf.urlPrefix + response.data.Profile_Picture.url;
            }
            const id2 = response2.data.id
            let profile_picture2;
            if (response2.data.Profile_Picture === null) {
                profile_picture2 = "";
            } else {
                profile_picture2 =
                    conf.urlPrefix + response2.data.Profile_Picture.url;
            }
            setUserdata({id1,profile_picture1,id2,profile_picture2})
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get("/api/messages?populate=*");    
            if (Array.isArray(response.data.data)) {
                const MessagesData = response.data.data.map((chat) => {
                    const { id, attributes } = chat;
                    const { text, sender, receiver, picture, createdAt } =
                        attributes;
                    const image =
                        picture && picture.data && picture.data.length > 0
                            ? picture.data.map(
                                  (img) =>
                                      conf.urlPrefix +
                                      img.attributes.url
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

    const handleSend = async () => {
        try {
            const messageData = {
                data: {
                    text: inputText,
                    sender: { connect: [userData.id1] },
                    receiver: { connect: [userData.id2
                    ] },
                },
            };

            const response = await axios.post("/api/messages", messageData);
            fetchMessages();
            // Handle response if needed
            setInputText("");
        } catch (err) {
            console.error("Error:", err);
            // Handle error if needed
        }
    };

    return (
        <div>
            <div className="w-full px-5 flex flex-col justify-between">
                <div className="flex flex-col mt-5">
                    {Message &&
                        Message.map((chat) => {
                            if (chat.Sender.id === userData.id1) {
                                return <MyMessage data={chat} pic={userData.profile_picture1}/>;
                            } else {
                                return <YourMessage data={chat} pic={userData.profile_picture2}/>;
                            }
                        })}

                    <div className="py-5 w-full px-10">
                        <div>
                            <div className="flex justify-between w-full  bg-gray-300 py-5 px-5  rounded-xl">
                                <input
                                    className=" bg-gray-300 w-full h-auto border-none outline-none"
                                    type="text"
                                    placeholder="type your message here..."
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        handleSend();
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
    );
}
