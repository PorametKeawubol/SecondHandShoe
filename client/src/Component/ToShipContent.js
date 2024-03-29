import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import styled from "styled-components"; // import styled-components
import status from "./status";
import conf from "../config/main";
// Styled component for the shoe container
const ShoeContainer = styled.div`
  background-color: #e5e7eb; /* Set background color */
  border-radius: 0.75rem; /* Rounded corners */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* Add transition for transform and box-shadow properties */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add box shadow */
  &:hover {
    transform: translateY(-4px); /* Move the container upward on hover */
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2); /* Increase box shadow on hover */
  }
`;

export default function ToShipContent() {
  const { shoes } = useContext(ShoeContext);
  console.log("🚀 ~ ToShipContent ~ shoes:", shoes);
  const [MyShoes, setMyShoes] = useState([]);
  const [MyId, setMyId] = useState([]);
  console.log("🚀 ~ ToShipContent ~ MyId:", MyId);
  const [allId, setallId] = useState([]);
  console.log("🚀 ~ ToShipContent ~ allId:", allId);
  console.log("Myshoes", MyShoes);
  useEffect(() => {
    fetchMypaydata();
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchMyShoes();
  }, [allId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(conf.urlPrefix+"/api/users/me", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      const userData = response.data;
      setMyId(userData.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMypaydata = async () => {
    try {
      const [response1] = await Promise.all([
        axios.get(`/api/payments?populate=*`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }),
      ]);

      const Data1 = response1.data.data.map((item) => {
        const shoe_id = item.attributes.shoe.data.id;
        console.log("sdfsfsf", shoe_id);
        const Confirm = item.attributes.Confirm;
        return { shoe_id, Confirm };
      });

      const filteredData1 = Data1.filter((item) => {
        return item.Confirm === true;
      });
      console.log("🚀 ~ filteredData1 ~ filteredData1:", filteredData1);
      setallId(filteredData1);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchMyShoes = () => {
    const myShoesIsSole = allId.map((item) => {
      const shoefiltered = shoes.filter((shoe) => {
        return shoe.id === item.shoe_id && shoe.sellerid === MyId;
      });
      return shoefiltered[0];
    });
    console.log("🚀 ~ myShoesIsSole ~ myShoesIsSole:", myShoesIsSole);
    setMyShoes(myShoesIsSole);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Status</h1>
      <div className="grid gap-4">
        {MyShoes &&
          MyShoes[0] !== undefined &&
          MyShoes.map((shoe) => (
            <ShoeContainer key={shoe.id}>
              <div className="border rounded p-4 relative w-[100%] flex items-center">
                <img
                  src={shoe.image[0]}
                  alt={shoe.name}
                  className="mx-auto mb-4 float-left"
                  style={{ maxWidth: "150px" }}
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold">
                    {shoe.products_name}
                  </h3>
                  <p className="text-gray-600 mt-1">{shoe.buyer}</p>
                  <p className="text-gray-600 mt-1">{shoe.price} THB</p>
                </div>
                <div className="ml-auto"></div>
              </div>
            </ShoeContainer>
          ))}
      </div>
    </div>
  );
}
