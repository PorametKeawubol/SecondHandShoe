import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Allshoe() {
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    fetchShoesAdmin();
  }, []);

  const fetchShoesAdmin = async () => {
    try {
      const response = await axios.get("/api/shoes?populate=*");
      console.log("🚀 ~ fetchShoes ~ response:", response);
      if (Array.isArray(response.data.data)) {
        const shoeData = response.data.data.map((shoe) => {
          const { id, attributes } = shoe;
          const { products_name, price, picture, seller } = attributes;
          const image =
            picture && picture.data && picture.data.length > 0
              ? "http://localhost:1337" + picture.data[0].attributes.url
              : null;
          const sellerName =
            seller?.data?.attributes?.username || "Unknown Seller";
          return {
            id,
            products_name,
            price,
            image,
            seller: sellerName,
          };
        });
        setAdminList(shoeData);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shoes/${id}`);
      setAdminList(adminList.filter((shoe) => shoe.id !== id));
    } catch (error) {
      console.error("Error deleting shoe:", error);
    }
  };

  return (
    <div className="flex w-full h-auto min-h-screen justify-center mt-10">
      <div className="flex flex-col bg-slate-200 w-[90%] rounded-3xl shadow-2xl">
        <div className="text-white bg-indigo-900 rounded-t-3xl drop-shadow-md p-5 text-xl font-bold border-b-4 border-slate-100 border-opacity-10">
          <p className="">Confirmation</p>
        </div>
        {adminList.map((shoe) => (
          <div
            key={shoe.id}
            className="flex flex-col gap-y-4 pl-10 py-5 border-b border-gray-300"
          >
            <div className="flex items-center justify-between gap-x-4">
              <div className="flex items-center">
                <img
                  src={shoe.image}
                  alt={shoe.products_name}
                  className="w-50 h-48 object-cover mb-2"
                />
                <div className="ml-10">
                  <h2 className="text-sm uppercase font-medium max-w-[240px] text-primary text-gray-900">
                    {shoe.products_name}
                  </h2>
                  <p className="text-gray-700">{shoe.price} THB</p>
                  <p className="text-gray-700">Seller: {shoe.seller}</p>
                  <Link
                    to={`/shoe/${shoe.id}`}
                    className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline text-gray-900"
                  >
                    Detail
                  </Link>
                </div>
              </div>
              <button
                onClick={() => handleDelete(shoe.id)}
                className="mr-8 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <FaTrash className="h-10 w-6 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
