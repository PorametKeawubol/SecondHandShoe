import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const { id, products_name, image, price, amount } = item;

  if (item.amount > 1) {
    item.amount = 1;
  }

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/shoe/${id}`}>
          <img className="max-w-[80px]" src={image[0]} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/shoe/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {products_name}
            </Link>
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                onClick={() => decreaseAmount(id)}
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {amount}
              </div>
              <div
                onClick={() => increaseAmount(id)}
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex flex-1 justify-around items-center">
              {price} THB
            </div>
            <div className="flex flex-1 justify-end items-center text-primary font-medium">
              {" "}
              THB
              {parseFloat(price * amount)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
            <Link to={`/Payment/${id}`}>
              <div className="flex justify-center items-center bg-black text-white font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
                Checkout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
