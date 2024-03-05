import React, {
  useContext,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";
import styled from "styled-components"; // import styled-components
import status from "./status";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Styled component for the shoe container
const ShoeContainer = styled.div`
  background-color: #e5e7eb; /* Set background color */
  border-radius: 0.75rem; /* Rounded corners */
  transition:
    transform 0.3s,
    box-shadow 0.3s; /* Add transition for transform and box-shadow properties */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add box shadow */
  &:hover {
    transform: translateY(-4px); /* Move the container upward on hover */
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2); /* Increase box shadow on hover */
  }
`;

export default function ToComplete() {
  const cancelButtonRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { shoes } = useContext(ShoeContext);
  console.log("🚀 ~ ToShipContent ~ shoes:", shoes);
  const [MyShoes, setMyShoes] = useState([]);
  const [MyId, setMyId] = useState([]);
  console.log("🚀 ~ ToShipContent ~ MyId:", MyId);
  const [allId, setallId] = useState([]);
  console.log("🚀 ~ ToShipContent ~ allId:", allId);
  console.log("Myshoes", MyShoes);
  useEffect(() => {
    fetchMypaydata();
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchMyShoes();
  }, [allId]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      });

      const userData = response.data;
      setMyId(userData.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchMypaydata = async () => {
    try {
      const [response1] = await Promise.all([
        axios.get(`/api/payments?populate=*`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        }),
      ]);

      const Data1 = response1.data.data.map((item) => {
        const shoe_id = item.attributes.shoe.data.id;
        const Confirm = item.attributes.Confirm;
        return { shoe_id, Confirm };
      });

      const filteredData1 = Data1.filter((item) => {
        return item.Confirm === true;
      });
      console.log("🚀 ~ filteredData1 ~ filteredData1:", filteredData1);
      setallId(filteredData1);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchMyShoes = () => {
    const myShoesIsSole = allId.map((item) => {
      const shoefiltered = shoes.filter((shoe) => {
        return (
          shoe.id === item.shoe_id &&
          shoe.buyerid === MyId &&
          shoe.complete === true
        );
      });
      return shoefiltered[0];
    });
    console.log("🚀 ~ myShoesIsSole ~ myShoesIsSole:", myShoesIsSole);
    setMyShoes(myShoesIsSole);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Completed Shoes Data</h1>
      <div className="grid gap-4">
        {MyShoes &&
          MyShoes[0] !== undefined &&
          MyShoes.map((shoe) => (
            <ShoeContainer key={shoe.id}>
              <div className="border rounded p-4 relative w-[100%] flex items-center">
                <img
                  src={shoe.image[0]}
                  alt={shoe.name}
                  className="mx-auto mb-4 float-left"
                  style={{ maxWidth: "150px" }}
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-xl font-semibold">
                    {shoe.products_name}
                  </h3>
                  <p className="text-gray-600 mt-1">{shoe.price} THB</p>
                </div>
                <div className="ml-auto">
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
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        Your payment for
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="button"
                                  className="mt-3 w-full inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="mx-3 mt-3 w-full text-white inline-flex justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-green-400 sm:w-auto"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                  ref={cancelButtonRef}
                                >
                                  Accept
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                  <button
                    onClick={() => {}}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    ได้รับสินค้าเเล้ว
                  </button>
                </div>
              </div>
            </ShoeContainer>
          ))}
      </div>
    </div>
  );
}
