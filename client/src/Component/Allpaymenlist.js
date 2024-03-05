
import { Link } from "react-router-dom";
import { Fragment, useRef, useState,useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { ShoeContext } from "../contexts/ShoeContext";
export default function Allpaymenlist({ item, shoes }) {
  const [open, setOpen] = useState(false);
  const [openAccepted, setOpenAccepted] = useState(false);
  const {fetchShoes} = useContext(ShoeContext)
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

  return (
    <div className="flex flex-row gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
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

          <Transition.Root show={openAccepted} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpenAccepted}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                            <CheckCircleIcon
                              className="h-6 w-6 text-green-600"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Payment Accepted
                            </Dialog.Title>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
          <Transition.Root show={open} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              initialFocus={cancelButtonRef}
              onClose={setOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon
                              className="h-6 w-6 text-red-600"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </div>
  );
}
