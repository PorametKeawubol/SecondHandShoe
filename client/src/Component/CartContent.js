import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../Component/CartItem";
import { CartContext } from "../contexts/CartContext";

const CartContent = () => {
    const { handleClose } = useContext(CartContext);
    const { cart, clearCart, itemAmount, total } = useContext(CartContext);

    return (
        <div className="cart-container bg-white shadow-2xl rounded-lg overflow-hidden" style={{ marginTop: '30px', position: 'fixed', top: '130px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <div className="p-4 border-b">
                <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
                <div onClick={handleClose} className="cursor-pointer w-8 h-8 flex justify-center items-center">
                    <IoMdArrowForward className="text-2xl" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
                {cart.map((item) => {
                    return <CartItem item={item} key={item.id} />;
                })}
            </div>
            <div className="flex flex-col gap-y-0 mt-0" style={{ height: '177px' }}>
                <div className="flex w-full justify-between items-center">
                    
                    <div className="font-semibold">
                        <span className="mr-2">Subtotal:</span> ${" "}
                        {parseFloat(total).toFixed(2)}
                    </div>
                  
                    <div
                        onClick={clearCart}
                        className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                    >
                        <FiTrash2 />
                    </div>
                </div>
                <Link
                    to={"/"}
                    className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
                >
                    Checkout
                </Link>
            </div>
        </div>
    );
};

export default CartContent;
