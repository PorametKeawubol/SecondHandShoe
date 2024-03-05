import "../app.css";
import Footer from "../Component/Footer";
import Header from "../Component/Header";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import PaymentList from "../Component/PaymentList";
import { ShoeContext } from "../contexts/ShoeContext";
export default function Confrimpayment() {
  const [ListShoes, setListShoes] = useState("");
  const [Adminlist, setAdminlist] = useState();
  const { fetchShoes } = useContext(ShoeContext);
  useEffect(() => {
    fetchShoesAdmin();
  }, []);
  const fetchShoesAdmin = async () => {
    try {
      const response = await axios.get("/api/shoes?populate=*");
      console.log("🚀 ~ fetchShoes ~ response:", response);
      if (Array.isArray(response.data.data)) {
        // Check if response.data is an array
        const shoeData = response.data.data.map((shoe) => {
          const { id, attributes } = shoe;
          const {
            products_name,
            price,
            details,
            location,
            picture,
            brand,
            color,
            gender,
            status,
            seller,
            size,
            payment,
          } = attributes;
          const image =
            picture && picture.data && picture.data.length > 0
              ? picture.data.map(
                  (img) => "http://localhost:1337" + img.attributes.url
                )
              : [];

          const brandType = brand?.data?.attributes.name;
          const colorType = color?.data?.attributes.name;
          const genderType = gender?.data?.attributes.name;
          const Seller = seller?.data?.attributes.username;
          //const product_color = color.data.products_name
          //const category = attributes.categories?.data.map(cat => cat.attributes.name) || ['uncategorized'];;
          return {
            id,
            products_name,
            price,
            details,
            location,
            image,
            brandType,
            colorType,
            genderType,
            status,
            Seller,
            size,
            payment,
          };
        });
        setAdminlist(shoeData);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${sessionStorage.getItem("authToken")}`;
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    try {
      const response = await axios.get("api/payments?populate=*");

      if (Array.isArray(response.data.data)) {
        const ListData = response.data.data.map((List) => {
          const { id, attributes } = List;
          const { shoe, Buyer, Bill, Confirm } = attributes;
          const bill = "http://localhost:1337" + Bill.data.attributes.url;
          const shoe_id = shoe.data.id;
          const Buyer_id = Buyer.data.id;
          return {
            id,
            bill,
            Confirm,
            shoe_id,
            Buyer_id,
          };
        });
        const filteredListData = ListData.filter((List) => {
          return List.Confirm === false;
        });
        setListShoes(filteredListData);
      }
    } catch (error) {
      console.error("Error fetching confirm:", error);
    }
  };

  return (
    <div className="flex w-full h-auto min-h-screen justify-center mt-10 ">
      <div className="flex flex-col bg-slate-200 w-[90%] rounded-3xl shadow-2xl">
        <div className="text-white bg-indigo-900 rounded-t-3xl  drop-shadow-md  p-5 text-xl font-bold border-b-4 border-slate-100 border-opacity-10">
          <p className="">confirmation</p>
        </div>
        <div className="flex flex-col">
          {ListShoes &&
            ListShoes.map((List) => {
              return (
                <PaymentList
                  item={List}
                  shoes={Adminlist}
                  fetchList={fetchList}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
