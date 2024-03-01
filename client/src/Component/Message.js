import { useState, useEffect } from "react";
import user1 from "../Component/Picture/logoSecondHandShoe.png";
import user2 from "../Component/Picture/bg1.png";
import MyMessage from "./message/MyMessage";
import YourMessage from "./message/YourMessage";
import axios from "axios";
export default function Message() {
    const [Message, setMessage] = useState("");
    console.log("🚀 ~ Message ~ Message:", Message);
    useEffect(() => {
        fetchMessages();
    }, []);
    const myname = "user_b";
    const receiver = "user_a";
    const fetchMessages = async () => {
        try {
            const response = await axios.get("/api/messages?populate=*");
            console.log("🚀 ~ fetchMessages ~ response:", response)
            if (Array.isArray(response.data.data)) {
                // Check if response.data is an array
                const MessagesData = response.data.data.map((chat) => {
                    const { id, attributes } = chat;
                    const {
                        text,
                        sender,
                        receiver,
                        picture,
                        createdAt,
                    } = attributes;
                    const image =
                        picture && picture.data && picture.data.length > 0
                            ? picture.data.map(
                                  (img) =>
                                      "http://localhost:1337" +
                                      img.attributes.url
                              )
                            : [];
                    
                    const Receiver = receiver.data
                    const Sender = sender.data
                    return {
                        text,
                        image,
                        Receiver,
                        Sender,
                        createdAt
                    };
                
                });
              
                
                const Message = MessagesData.filter((chat) => {
                    return (
                      chat.Sender.attributes.username === myname && chat.Receiver.attributes.username === receiver,
                      chat.Sender.attributes.username === receiver && chat.Receiver.attributes.username === myname 
                      
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
            console.error("Error fetching shoes:", error);
        }
    };
    
    
    return (
        <div>
            <div class="w-full px-5 flex flex-col justify-between">
                <div class="flex flex-col mt-5">
                    {Message&&Message.map((chat) => {
                        if (chat.Sender === myname) {
                            return <MyMessage data={chat} />;
                        } else {
                            return <YourMessage data={chat} />;
                        }
                    })}

                    <div class="py-5 w-full px-10">
                        <div className="">
                            <input
                                class="w-full bg-gray-300 py-5 px-5  rounded-xl"
                                type="text"
                                placeholder="type your message here..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
