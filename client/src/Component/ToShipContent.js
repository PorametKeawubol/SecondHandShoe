import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import styled from "styled-components"; // import styled-components
import status from "./status";
// Styled component for the shoe container
const ShoeContainer = styled.div`
    background-color: #E5E7EB; /* Set background color */
    border-radius: 0.75rem; /* Rounded corners */
    transition: transform 0.3s, box-shadow 0.3s; /* Add transition for transform and box-shadow properties */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add box shadow */
    &:hover {
        transform: translateY(-4px); /* Move the container upward on hover */
        box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2); /* Increase box shadow on hover */
    }
`;


export default function ToShipContent() {
    const { shoes } = useContext(ShoeContext);
    const [MyShoes, setMyShoes] = useState([]);
    const [MyId, setMyId] = useState([]);
    const [allId, setallId] = useState([]);

    useEffect(() => {
        fetchMypaydata();
        fetchUserData();
    }, []);

    useEffect(() => {
        fetchShoes();
    }, [allId]);

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
            setMyId(userData.id,userData.username);
            console.log(userData)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchMypaydata = async () => {
        try {
            const [response1, response2] = await Promise.all([
                axios.get(`/api/payments?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                }),
                axios.get(`/api/shoes?populate=*`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
                })
            ]);
    console.log("cat",response2)
            
            const Data1 = response1.data.data.map((item) => {
                const shoe_id = item.attributes.shoe.data.id
                const Confirm = item.attributes.Confirm
                return {  shoe_id, Confirm }
            })
            const Data2 = response2.data.data.map((item) => {
                const seller = item.attributes.seller.data.id
                console.log("dog",seller)
                return {  seller }
            })
            const filteredData1 = Data1.filter((item) => {
                return item.Confirm === true
            })
            const filteredData2 = Data2.filter((item) => {
                return item.seller
            })

            setallId(filteredData1,filteredData2)

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchShoes = () => {
        const filteredUser = allId.filter((item) => {
            return item.seller === MyId;
        });
        const filteredShoe = filteredUser.map((item) => {
            const shoe = shoes.filter((shoe) => {
                return shoe.id === item.shoe_id;
            });
            return shoe[0];
        });
        setMyShoes(filteredShoe);
    };
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Shipping Status</h1>
            <div className="grid gap-4">
                {MyShoes.map((shoe) => (
                    <ShoeContainer key={shoe.id}>
                        <div className="border rounded p-4 relative w-[100%] flex items-center">
                            <img src={shoe.image[0]} alt={shoe.name} className="mx-auto mb-4 float-left" style={{ maxWidth: "150px" }} />
                            <div className="ml-4 flex-grow">
                                <h3 className="text-xl font-semibold">{shoe.products_name}</h3>
                                <p className="text-gray-600 mt-1"> {shoe.price} THB</p>
                            </div>
                            <div className="ml-auto">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" >View Status</button>
                            </div>
                        </div>
                    </ShoeContainer>
                ))}
            </div>
        </div>
    );
}
