import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { ShoeContext } from "../contexts/ShoeContext";

export default function PaymentList({ item }) {
    const { shoes } = useContext(ShoeContext);
    console.log("🚀 ~ PaymentList ~ shoes:", shoes);
    const id = item.id;
    const Buyer_id = item.Buyer_id;
    const Confirm = item.Confirm;
    const shoe_id = item.shoe_id;
    const shoe = shoes.filter((item) => {
        return item.id === shoe_id;
    });
    console.log("🚀 ~ shoe ~ shoe:", shoe);
    return (
        <div className="flex flex-row gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
            <div className="w-full min-h-[150px] flex items-center gap-x-4 pl-10">
                <img className="max-w-[80px]" src={shoe[0].image[0]} alt="" />

                <div className="w-full flex flex-row p-6">
                    <div className="flex justify-between mb-2">
                        <Link
                            to={`/shoe/${id}`}
                            className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                        >
                            {shoe[0].products_name}
                        </Link>
                    </div>
                    <div className="flex gap-x-2 h-[36px] text-sm"></div>
                    <div className="flex flex-1 justify-around items-center">
                        {shoe[0].price} THB
                    </div>
                    <div className="flex justify-center items-center bg-green-200 text-emerald-500 font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
                        Accepted
                    </div>
                    <div className="flex justify-center items-center bg-red-200 text-rose-500 font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
                        Denied
                    </div>
                    <Link></Link>
                </div>
            </div>
        </div>
    );
}
