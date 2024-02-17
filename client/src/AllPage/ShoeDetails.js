import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ShoeContext } from "../contexts/ShoeContext";

const ShoeDetails = () => {
  // get the Shoe id from url
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { shoes } = useContext(ShoeContext);

  //get the single Shoe based on id
  const shoe = shoes.find((item) => {
    return item.id === parseInt(id);
  });

  // if Shoe is not found
  if (!shoe) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // destructure Shoe
  const { title, price, description, image } = shoe;
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image and text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
            <div className="text-2xl text-red-500 font-medium mb-6">$ {price}</div>
            <p className="mb-8">{description}</p>
            <button onClick={()=>addToCart(shoe, shoe.id)} className='bg-primary py-4 px-8 text-white'>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeDetails;