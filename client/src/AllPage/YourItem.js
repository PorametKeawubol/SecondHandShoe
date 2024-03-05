import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import Header from "../Component/Header";
import { FaTrash, FaEdit } from "react-icons/fa";
import EditItem from "../AllPage/Edititem";

function YourItem() {
     const { shoes, fetchShoes } = useContext(ShoeContext);
     const [MyShoes, setMyShoes] = useState([]);
     const [showEditemModal, setEditemModal] = useState(false);
     const [selectedItemId, setSelectedItemId] = useState(null); // State to store the selected item ID

     const handleEditem = (handleEditemClose, id, useEffect) => {
          setSelectedItemId(id); // Set the selected item ID
          setEditemModal(true);

     };

     const handleEditemClose = () => {
          setEditemModal(false);
     };

     useEffect(() => {
          fetchShoes()
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
               return item.Seller === username ;
          });
     };

     const handleDeleteItem = async (id) => {
          try {
               console.log("Deleting item with ID:", id);
               await axios.delete(`http://localhost:1337/api/shoes/${id}`, {
                    headers: {
                         Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                    },
               });

               // Update the state after successful deletion
               setMyShoes(prevShoes => prevShoes.filter(shoe => shoe.id !== id));
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
                              <div className="flex bg-slate-100 " key={shoe.id}>
                                   <div key={shoe.id} className="border rounded p-4 relative w-[100%]  flex">
                                        <img src={shoe.image[0]} alt={shoe.name} className="mx-auto mb-4 float-left" style={{ maxWidth: "150px" }} />
                                        <div className="ml-2 flex-grow ml-6">
                                             <h3 className="text-xl font-semibold">{shoe.products_name}</h3>
                                             <p className="text-gray-600 mt-1">Seller: {shoe.Seller}</p>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                             {/* Check if buyerid is not undefined */}
                                             {shoe.buyerid !== undefined ? (
                                                  <button className="mt-10 mr-6 text-center text-white bg-red-500 rounded-lg w-20 h-10 flex items-center justify-center">
                                                       Sold
                                                  </button>
                                             ) : (
                                                  <>
                                                       <button onClick={() => handleDeleteItem(shoe.id)} className="mr-9 bg-red-500 rounded-full w-10 h-10 flex items-center justify-center">
                                                            <FaTrash className="h-6 w-6 text-white" />
                                                       </button>
                                                       <button onClick={() => handleEditem(handleEditemClose, shoe.id)} className="mr-9 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                                                            <FaEdit className="h-6 w-6 text-white" />
                                                       </button>
                                                  </>
                                             )}
                                        </div>

                                   </div>
                              </div>
                         ))}
                    </div>
               </section>

               {/* Popup for editing item */}
               {showEditemModal && (
                    <EditItem
                         itemId={selectedItemId} // Pass the selected item ID to the EditItem component
                         onClose={handleEditemClose} // Pass the close function to the EditItem component
                    />
               )}
          </div>
     );
}

export default YourItem;
