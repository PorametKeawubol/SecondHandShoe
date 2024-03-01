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
                    const Sender =  axios.get(`/users/me?populate=image`,{
                       
                    })
                    const Receiver = receiver.data.attributes.username
                    console.log("🚀 ~ MessagesData ~ Sender:", Sender)
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
                      chat.Sender===myname && chat.Receiver===receiver
                      
                    ); // &&คือ and , ||คือ or
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
