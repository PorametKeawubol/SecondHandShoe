import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";

export default function ToReceive() {
    const { shoes } = useContext(ShoeContext);
    const [MyShoes, setMyShoes] = useState([]);
    console.log("🚀 ~ ToReceive ~ MyShoes:", MyShoes)
    const [MyId, setMyId] = useState([]);
    const [allId,setallId] = useState([])


    useEffect(() => {
        fetchMypaydata();
        fetchUserData();
        fetchShoes();
    }, []);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(
                "/api/users/me",
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );

            const userData = response.data;
            setMyId(userData.id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const fetchMypaydata =async() => {
        try {
            const response = await axios.get(
                `/api/payments?populate=*`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }
            );
            const Data = response.data.data.map((item)=>{
                const buyer_id = item.attributes.Buyer.data.id
                const shoe_id = item.attributes.shoe.data.id
                const Confirm = item.attributes.Confirm
                return {buyer_id,shoe_id,Confirm}
            })
    
            const filteredData = Data.filter((item)=>{
                return item.Confirm === true
            })
            setallId(filteredData)
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const fetchShoes = () =>{
        const filteredUser = allId.filter((item)=>{
            
            return item.buyer_id === MyId
        })
        const filteredShoe = filteredUser.map((item)=>{
             
            const shoe =   shoes.filter((shoe)=>{return  shoe.id === item.shoe_id})
            return shoe[0]
        })
        setMyShoes(filteredShoe)  
    }
    

    return (
    <div>ToReceive</div>
    )
}
