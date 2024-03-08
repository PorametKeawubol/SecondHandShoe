import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import styled from "styled-components";
import conf from "../config/main"; // import styled-components
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

export default function ToReceiveContent() {
  axios.defaults.headers.common["Authorization"] =
    `Bearer ${sessionStorage.getItem("authToken")}`;
  const { shoes, fetchShoes } = useContext(ShoeContext);
  const [MyShoes, setMyShoes] = useState([]);
  const [MyId, setMyId] = useState([]);
  const [allId, setallId] = useState([]);

  useEffect(() => {
    fetchMypaydata();
    fetchUserData();
    fetchShoes();
  }, []);

  useEffect(() => {
    fetchMyShoes();
  }, [allId, shoes]);

  const comfirmcomplete = async (id) => {
    const payload = {
      data: {
        complete: true,
      },
    };
    try {
      await axios.put(`${conf.urlPrefix}/api/shoes/${id}`, payload); 
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      fetchShoes();
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(conf.urlPrefix + "/api/users/me", {
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
        axios.get(conf.urlPrefix + "/api/payments?populate=*", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }),
      ]);

      const Data1 = response1.data.data.map((item) => {
        const shoe_id = item.attributes.shoe.data.id;
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
    const myFilteredShoes = shoes.filter((shoe) => {
      // ใช้ findIndex ในการค้นหาว่ามี shoe_id ใน allId หรือไม่
      const index = allId.findIndex((item) => item.shoe_id === shoe.id);

      // ถ้า index มีค่ามากกว่าหรือเท่ากับ 0 และ shoe.buyerid เท่ากับ MyId และ shoe.complete ไม่เท่ากับ true
      return index >= 0 && shoe.buyerid === MyId && shoe.complete !== true;
    });

    // ตั้งค่าตัวแปร myShoes ด้วยรายการรองเท่าที่ผ่านการกรอง
    setMyShoes(myFilteredShoes);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Delivery status</h1>
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
                  <p className="text-gray-600 mt-1">{shoe.price} THB</p>
                </div>
                <div className="ml-auto">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      comfirmcomplete(shoe.id);
                    }}
                  >
                    ได้รับสินค้าเเล้ว
                  </button>
                </div>
              </div>
            </ShoeContainer>
          ))}
      </div>
    </div>
  );
}
