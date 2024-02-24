import React from 'react';
import Header from "../Component/Header";
import { FaMoneyBillAlt } from 'react-icons/fa';

function Payment() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Header />
            <div className="bg-gray-400 py-6 flex items-center w-full justify-center">
                <FaMoneyBillAlt className="mr-2" size={50} />
                <h1 className="text-xl font-bold mt-0 text-center cursor-pointer select-none" style={{ position: 'sticky' }}>Payment</h1>
            </div>


            <div className="mt-8 w-96">
                <h2 className="text-lg font-semibold">Payment Instructions:</h2>
                <p className="mt-2">Please follow the instructions below to complete your payment.</p>
            </div>
            <div className="mt-8 w-96">
                <h2 className="text-lg font-semibold">Payment Method:</h2>
                <select className="mt-2 p-2 border border-gray-300 rounded-md w-full">
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    {/* เพิ่มวิธีการชำระเงินอื่น ๆ ตามที่เพื่อนต้องการเลยครับผม */}
                </select>
            </div>
            <div className="mt-8 w-96">
                <h2 className="text-lg font-semibold">Upload Payment Slip:</h2>
                <input type="file" className="mt-2" />
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 text-white px-4 py-2 w-full rounded-md">Upload Slip</button>
            </div>
        </div>

    );
}

export default Payment;
