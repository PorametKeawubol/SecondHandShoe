import { useState, useEffect} from "react";
import user1 from "../Component/Picture/logoSecondHandShoe.png";
import user2 from "../Component/Picture/bg1.png";
import MyMessage from "./message/MyMessage";
import YourMessage from "./message/YourMessage";
import axios from "axios";
export default function Message() {
    const [Message,setMessage] = useState("")
    console.log("🚀 ~ Message ~ Message:", Message)
    useEffect(() => {
        fetchMessages();
      }, []);
    
      const fetchMessages = async () => {
        try {
          const response = await axios.get("/api/messages?populate=*");
          if (Array.isArray(response.data.data)) {
            // Check if response.data is an array
            const MessagesData = response.data.data
            // .map((chat) => {
              
    
            //   return {
            //     MessagesData
            //   };
            // });
            setMessage(MessagesData)
          } else {
            console.error("Response data is not an array:", response.data.data);
          }
        } catch (error) {
          console.error("Error fetching shoes:", error);
        }
      };
    const Allchat = [
        { text: "Hello!", sender: "user", pic: { user1 },date_time:0 },
        { text: "Hi there!", sender: "bot", pic: { user2 },date_time:1 },
    ];
    const myname = "user"
    return (
        <div>
            <div class="w-full px-5 flex flex-col justify-between">
                <div class="flex flex-col mt-5">
                {Allchat.map((chat) => {
                    if (chat.sender === myname) {
                        return <MyMessage data={chat} />;
                    } else {
                        return <YourMessage  data={chat} />;
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
