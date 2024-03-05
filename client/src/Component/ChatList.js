import axios from "axios";
import { MdAccountCircle } from "react-icons/md";
import conf from "../config/main";
import { useEffect, useState, } from "react";
import {Link} from "react-router-dom"
export default function Chat(data) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("authToken")}`
    const [userData, setUserdata] = useState([]);
    const id = data.data
    useEffect(()=>{
        fetchUserData()
    },[])
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                conf.apiUrlPrefix + `/users/${id}?populate=Profile_Picture`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );
            console.log("🚀 ~ fetchUserData ~ response:", response)

            const id1 = response.data.id;
            let profile_picture1;
            if (response.data.Profile_Picture === null) {
                profile_picture1 = " ";
            } else {
                profile_picture1 =
                    conf.urlPrefix + response.data.Profile_Picture.url;
            }
            const username = response.data.username
            setUserdata({ id1, profile_picture1,username });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    return (
        <Link to={`/message/${userData.id1}`}>
        <div className="flex items-center hover:bg-slate-200 rounded-2xl">
            <div
                className="px-6 rounded-full"
                style={{ display: "flex", alignItems: "center" }}
            >
                {userData.profile_picture1 !== " " ? (
                    <img
                        className="object-cover w-20 h-20 my-3 bg-white  p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-4"
                        src={userData.profile_picture1}
                        alt="User Profile"
                        
                    />
                ) : (
                    <MdAccountCircle
                        className="mr-4"
                        size={100}
                        color="white"
                    />
                )}
            </div>
            <div className="font-medium text-slate-400">
                {userData.username}
            </div>
        </div>
        </Link>
    );
}
