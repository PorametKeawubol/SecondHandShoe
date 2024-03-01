import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import Header from "../Component/Header";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; // import FaTrash and FaEdit icons from react-icons/fa

function YourItem() {
     const { shoes } = useContext(ShoeContext);
     const [MyShoes, setMyShoes] = useState([]);

     useEffect(() => {
          const fetchUserData = async () => {
               try {
                    const response = await axios.get(
                         "http://localhost:1337/api/users/me",
                         {
                              headers: {
                                   Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                              },
                         }
                    );

                    const userData = response.data;
                    setMyShoes(fetchMyShoes(shoes, userData.username));
               } catch (error) {
                    console.error("Error fetching user data:", error);
               }
          };
          fetchUserData();
     }, [shoes]);

     const fetchMyShoes = (shoes, username) => {
          return shoes.filter((item) => {
               return item.Seller === username;
          });
     };

     const handleDeleteItem = async (id) => {
          try {
               console.log("Deleting item with ID:", id); // เพิ่มบรรทัดนี้เพื่อแสดง ID ที่ถูกลบในคอนโซล
               // Call the Strapi API to delete the specific shoe item
               await axios.delete(`http://localhost:1337/api/shoes/${id}`, {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
               });

               // Update the state after successful deletion
               const updatedShoes = MyShoes.filter(shoe => shoe.id !== id);
               setMyShoes(updatedShoes);
          } catch (error) {
               console.error("Error deleting item:", error);
          }
     };

     const handleDeleteAll = async () => {
          try {
               // Call the Strapi API to delete all shoe items
               await axios.delete("http://localhost:1337/api/shoes", {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
               });

               // Clear the state after successful deletion
               setMyShoes([]);
          } catch (error) {
               console.error("Error deleting all items:", error);
          }
     };

     return (
          <div className="flex flex-col">
               <Header />
               <div className="bg-gray-800 text-white py-3 mt-0">
                    <div className="container mx-auto text-center mt-10">
                         <h1 className="text-3xl font-semibold mt-10 text-xl">Your Item</h1>
                    </div>
               </div>



               <section className="py-100 mt-10">
  <div className="flex flex-col lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
    {MyShoes.map((shoe) => (
      <div className="flex bg-slate-100 ">
        <div key={shoe.id} className="border rounded p-4 relative w-[100%]  flex">
          <img src={shoe.image[0]} alt={shoe.name} className="mx-auto mb-4 float-left" style={{ maxWidth: "150px" }} />
          <div className="ml-2 flex-grow ml-6">
            <h3 className="text-xl font-semibold">{shoe.products_name}</h3>
            <p className="text-gray-600 mt-1">Seller: {shoe.Seller}</p>
          </div>
          <div className="flex flex-col justify-between">
            <button onClick={() => handleDeleteItem(shoe.id)} className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              <FaTrash className="h-6 w-6 text-white" />
            </button>
            <Link to={`/EditYourItem`} className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
              <FaEdit className="h-6 w-6 text-white" />
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>



          </div>
     );
}

export default YourItem;
