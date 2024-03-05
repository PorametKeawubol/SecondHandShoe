import axios from "axios";
import { useEffect, useState } from "react";
import conf from "../config/main";
import Chat from "./ChatList";
export default function MessageDashbord() {
    const [Message, setMessage] = useState([]);
    const [chatRoom, setChatRoom] = useState([]);
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
        const matchedSenderIds = pairs.map((pair) => {
            if (pair.receiverId === userData.id1) {
                return pair.senderId;
            } else if (pair.senderId === userData.id1) {
                return pair.receiverId;
            }
        });
        setChatRoom(matchedSenderIds);
    };
    if (userData.length !== 0 && Message.length === 0) {
        fetchMessages();
    }
    if (Message.length !== 0 && chatRoom.length === 0) {
        messagePair();
    }

    return (
        <div>
            <div class="py-10 h-screen bg-gray-300 px-2">
                <div class="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
                    <div class="md:flex">
                        <div class="w-full p-2">
                            <div class="relative"> </div>
                            <ul>
                                <div className="text-lg font-bold text-slate-400 mt-2 mb-4 px-10">All Message</div>
                                {chatRoom.length > 0 &&
                                    chatRoom.map((item) => (
                                        <Chat data={item} />
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
