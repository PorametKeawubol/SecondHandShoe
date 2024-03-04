import axios from "axios";
import { useEffect, useState } from "react";
import conf from "../config/main";

export default function MessageDashbord() {
    const [Message, setMessage] = useState([]);
    const [chatRoom, setChatRoom] = useState([]);
    console.log("🚀 ~ MessageDashbord ~ chatRoom:", chatRoom)
    console.log("🚀 ~ MessageDashbord ~ Message:", Message);
    const [userData, setUserdata] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);
    
  
        
   
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                conf.apiUrlPrefix + "/users/me?populate=Profile_Picture",
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

            setUserdata({ id1, profile_picture1 });
            
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
                    console.log("🚀 ~ Message ~ chat:", chat);

                    return (
                        chat.Sender.id === userData.id1 ||
                        chat.Receiver.id === userData.id1
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
    const messagePair = () => {
        const pairs = [];
        Message.forEach((item) => {
            const senderId = item.Sender.id;
            const receiverId = item.Receiver.id;

            // ตรวจสอบว่ามีคู่ sender id และ receiver id นี้อยู่แล้วหรือไม่
            const existingPair = pairs.find((pair) => {
                return (
                    (pair.senderId === senderId &&
                        pair.receiverId === receiverId) ||
                    (pair.senderId === receiverId &&
                        pair.receiverId === senderId)
                );
            });

            // หากไม่พบให้เพิ่มคู่ sender id และ receiver id ลงในอาร์เรย์
            if (!existingPair) {
                pairs.push({ senderId, receiverId });
            }
            
        });
        setChatRoom(pairs)
    };
    if (userData.length !== 0 && Message.length === 0) {
        fetchMessages();
    }
    if (Message.length !== 0 && chatRoom.length === 0) {
       messagePair();
    }

    return (
        <div>
            <div>All Message</div>
        </div>
    );
}
