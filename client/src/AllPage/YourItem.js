import React, { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import Header from "../Component/Header";
import { Link } from "react-router-dom"; // import Link from react-router-dom

function YourItem() {
     const { shoes } = useContext(ShoeContext);
     const [MyShoes, setMyShoes] = useState([]);
     console.log("🚀 ~ YourItem ~ MyShoes:", MyShoes);

     useEffect(() => {
          const fetchUserData = async () => {
               try {
                    const response = await axios.get(
                         "http://localhost:1337/api/users/me",
                         {
                              headers: {
                                   Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

     return (
          <div className="flex flex-col">
               <Header />
               <section className="py-100 mt-10"> {/* Added mt-10 to add margin top */}
                    <div className="container mx-auto">
                         <h1 className="text-3xl font-semibold mt-20 mb-10 text-center">
                              Explore Our Shoes
                         </h1>
                         <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                              {MyShoes.map((shoe) => (
                                   <div key={shoe.id} className="border rounded p-4 relative"> {/* Added relative class */}
                                        <img src={shoe.image[0]} alt={shoe.name} className="mx-auto mb-4" style={{ maxWidth: "150px" }} />
                                        <h3 className="text-xl font-semibold">{shoe.products_name}</h3>
                                        <p className="text-gray-600">Seller: {shoe.Seller}</p>
                                        <Link to={`/shoe/${shoe.id}`} className="absolute top-6 right-6 bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                                             {/* Button Icon */}
                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                             </svg>
                                        </Link>
                                   </div>
                              ))}
                         </div>
                    </div>
               </section>
               {/* Your Item Bar */}
               <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4" style={{ marginTop: "6rem" }}> {/* Adjust marginTop here */}
                    <div className="container mx-auto flex justify-around">
                         <Link to="/youritem" className="text-white">Your Item</Link>
                    </div>
               </div>
          </div>
     );
}

export default YourItem;
