import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Shoe = ({ shoe }) => {
    const { addToCart } = useContext(CartContext);
    // destructure Shoe
    const { id, image, category, products_name, price } = shoe;
    return (
        <div className="bg-white rounded-3xl drop-shadow-xl p-4 lg:h-[300px] lg:w-[300px] hover:scale-105 transition duration-500">
            <Link to={`/shoe/${id}`}>
                <div className="border  border-[#e4e4e4]  rounded-3xl h-auto   mb-4 relative overflow-hidden group transition">
                    <div className="w-full h-full  flex justify-center items-center ">
                        {/* image */}
                        <div className="md:h-[200px] md:w-[240px] h-[140px] w-[140px] flex justify-center items-center">
                            <img
                                className=" group-hover:scale-110 transition duration-300"
                                src={image[0]}
                                alt=""
                            />
                        </div>
                    </div>
                    {/* buttons */}
                    <div className="absolute top-6 -right-11 group-hover:right-0 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button onClick={() => addToCart(shoe, id)}>
                            <div className="flex justify-center items-center text-white w-8 h-8 bg-teal-500 rounded-xl bg-opacity-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                            </div>
                        </button>

                        <Link
                            to={`/shoe/${id}`}
                            className="hidden w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                        ></Link>
                    </div>
                </div>
                {/* category, products_name & price */}
                <div>
                    <div className="tex-sm capitalize text-gray-500 mb-1">
                        {category}
                    </div>
                    <Link to={`/shoe/${id}`}>
                        <h2 className="font-semibold mb-1">{products_name}</h2>
                    </Link>

                    <h2 className="font-semibbold">{price} THB</h2>
                </div>
            </Link>
        </div>
    );
};

export default Shoe;
