import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ShoeContext } from "../contexts/ShoeContext";

export default function PaymentList({ item, shoes, fetchList }) {
  const [open, setOpen] = useState(false);
  const [openAccepted, setOpenAccepted] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const { fetchShoes } = useContext(ShoeContext);

  const cancelButtonRef = useRef(null);
  const id = item.id;
  const Buyer_id = item.Buyer_id;
  const Confirm = item.Confirm;
  const shoe_id = item.shoe_id;
  const shoe = shoes.filter((item) => {
    return item.id === shoe_id;
  });

  const ConfirmPayment = async () => {
    const payload = {
      data: {
        Confirm: true,
      },
    };
    const payload1 = {
      data: {
        buyer: Buyer_id,
      },
    };
    try {
      await axios.put(`http://localhost:1337/api/payments/${id}`, payload);
      await axios.put(`http://localhost:1337/api/shoes/${shoe_id}`, payload1);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      fetchShoes();
      fetchList();
    }
  };

  const DeletePayment = async () => {
    try {
      await axios.delete(`http://localhost:1337/api/payments/${id}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      fetchShoes();
    }
  };

  const fetchDataForPopup = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/payments/${id}?populate=*`);
      console.log("Popup data response:", response.data);
      const { data } = response.data;
      setPopupData({
        id: data.id,
        amount: data.attributes.Price,
        buyer: data.attributes.Buyer.data.attributes.username,
        shoe: data.attributes.shoe.data.attributes.products_name,
        image: data.attributes.Bill.data.attributes.url
      });
    } catch (error) {
      console.error("Error fetching data for popup:", error);
    }
  };

  return (
    <div
      className="flex flex-row gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500"
      onClick={(e) => {
        // Check if the click event originated from the accept or decline buttons
        if (
          !e.target.closest(".accept-button") &&
          !e.target.closest(".decline-button")
        ) {
          setOpenDetail(true);
          fetchDataForPopup();
        }
      }}
    >
      <div className="w-full min-h-[150px] flex items-center gap-x-4 pl-10">
        <img className="max-w-[80px]" src={shoe[0].image[0]} alt="" />
        <div className="w-full flex flex-row p-6">
          <div className="flex justify-between mb-2">
            <Link
              to={`/shoe/${id}`}
              className="text-sm uppercase  font-medium max-w-[240px] text-primary hover:underline  text-gray-900"
            >
              {shoe[0].products_name}
            </Link>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm"></div>
          <div className="flex flex-1 justify-around items-center text-gray-900 ">
            {shoe[0].price} THB
          </div>
          <div className="flex justify-center items-center bg-green-500 text-white font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
            <button
              className="accept-button"
              onClick={() => {
                setOpenAccepted(true);
              }}
            >
              Accepted
            </button>
          </div>
          <Transition.Root show={openAccepted} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={setOpenAccepted}
            >
              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <div className="flex items-center justify-center">
                      <CheckCircleIcon className="h-8 w-8 text-green-500 mr-2" />
                      <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                        Payment Accepted
                      </Dialog.Title>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Your payment for {shoe[0].products_name} has been accepted.
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          setOpenAccepted(false);
                          ConfirmPayment();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <div className="flex justify-center items-center bg-red-500 text-white font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
            <button
              className="decline-button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Denied
            </button>
          </div>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={setOpen}
            >
              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <div className="flex items-center justify-center">
                      <ExclamationTriangleIcon className="h-8 w-8 text-red-500 mr-2" />
                      <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                        Deactivate Account
                      </Dialog.Title>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.
                      </p>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => {
                          setOpen(false);
                          DeletePayment();
                        }}
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
          <Transition.Root show={openDetail} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={setOpenDetail}
            >
              <div className="flex items-center justify-center min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                    <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                      Payment Detail
                    </Dialog.Title>
                    {popupData && (
                      <div>
                        <p>Payment ID: {popupData.id}</p>
                        <p>Amount: {popupData.amount}</p>
                        <p>Buyer: {popupData.buyer}</p>
                        <p>Shoe: {popupData.shoe}</p>
                        {popupData.image && (
                          <img
                            src={`http://localhost:1337${popupData.image}`}
                            style={{ maxWidth: '100%' }}
                          />
                        )}
                        {/* Add more details as needed */}
                      </div>
                    )}
                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDetail(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
}
