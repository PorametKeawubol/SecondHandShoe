import Header from "../Component/Header";
import { FaMoneyBillAlt } from "react-icons/fa";
import Qrcode from "../Component/Picture/logoSecondHandShoe.png";
import { CartContext } from "../contexts/CartContext";
import React, { useContext } from "react";
function Payment() {
  const { total } = useContext(CartContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <div className="bg-gray-400 py-6 flex items-center w-full justify-center">
        <FaMoneyBillAlt className="mr-2" size={50} />
        <h1
          className="text-xl font-bold mt-0 text-center cursor-pointer select-none"
          style={{ position: "sticky" }}
        >
          Payment
        </h1>
      </div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
          <div className="relative">
            <div>
              <p className="mb-8 ">
                ยอดชำระเงินทั้งหมด
                <div className="text-2xl text-red-500 font-medium mb-4">
                  {parseFloat(total).toFixed(2)} THB
                </div>
              </p>
              <img className="max-w-[200px] py-6 lg:max-w-xs" src={Qrcode} />
              <h className="mb-8  text-red-500 font-medium mb-4">
                {parseFloat(total).toFixed(2)} THB
              </h>

              <p className="mb-8"> บริษัท SECONDHANDSHOE CO.,LTD</p>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">upload your slip file.</span>
                </div>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </label>
              <button class="bg-black hover:bg-black text-white  py-2 px-4 border border-blue-700 rounded">
                summit
              </button>
            </div>
          </div>
          <div className="lg:py-6 lg:pr-16 drop-shadow-2xl bg-gradient-to-r from-[#355C7D] via-[#6C5B7B] to-[#C06C84] pl-10 rounded-3xl text-slate-100">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">Step 1</p>
                <p className="">
                  เปิดแอปพลิเคชันธนาคารบนอุปกรณ์ของท่าน
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">Step 2</p>
                <p className="">
                  คลิกไปที่ปุ่ม "สแกน" หรือ "QR Code" และกดที่ "รูปภาพ"
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4 "
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">Step 3</p>
                <p className="">
                  สแกน QR Code ที่ปรากฏบนหน้าจอหรือที่ท่านแคปไว้และทำการชำระเงิน
                  โดยกรุณาเช็คชื่อบัญชีผู้รับคือ "บริษัท SECONDHANDSHOE CO.,LTD"
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-4 "
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-lg font-bold">Step 4</p>
                <p className="">
                  บันทึกสลิปและเพิ่มสลิปในช่อง upload slip ของเรา
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    <svg
                      className="w-6 "
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <polyline
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="6,12 10,16 18,8"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <p className="mb-2 text-lg font-bold">Success</p>
                <p className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
