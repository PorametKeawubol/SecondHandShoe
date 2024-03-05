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
import { Dialog, Transition } from "@headlessui/react";
import { FaStar } from "react-icons/fa"; // import FaStar icon
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
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const { shoes } = useContext(ShoeContext);
  const [MyShoes, setMyShoes] = useState([]);
  const [MyId, setMyId] = useState([]);
  const [allId, setallId] = useState([]);
  const [rating, setRating] = useState(0); // State for storing rating
  const [comment, setComment] = useState(""); // State for storing comment
  const [open, setOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0); // State for hovering rating

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
      setallId(filteredData1);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
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
    setMyShoes(myShoesIsSole);
  };

  const handleSubmit = async (sellerid) => {
    try {
      console.log(sellerid);
      const response = await axios.post("http://localhost:1337/api/ratings", {
        data: {
          score: rating,
          comment: comment,
          seller_rating: sellerid,
          rating_by: MyId,
        },
      });
      console.log(response.data);
      setOpen(false); // Close the dialog after submission
      // Reset rating and comment state after submission
      setRating(0);
      setComment("");
      setIsButtonVisible(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
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
                  <div className="flex justify-center items-center bg-amber-500 text-white font-medium cursor-pointer w-20 h-8 rounded-md ml-2">
                    <button onClick={() => setOpen(true)}>Rate</button>
                  </div>
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
                                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                        className="h-6 w-6 text-yellow-400"
                                        aria-hidden="true"
                                      />
                                    </svg>
                                  </div>
                                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                      To Rate
                                    </Dialog.Title>
                                    <div className="mt-2 flex items-center">
                                      {[1, 2, 3, 4, 5].map((value) => (
                                        <FaStar
                                          key={value}
                                          size={24}
                                          onClick={() => setRating(value)}
                                          onMouseOver={() =>
                                            setHoverRating(value)
                                          }
                                          onMouseLeave={() => setHoverRating(0)}
                                          color={
                                            (hoverRating || rating) >= value
                                              ? colors.orange
                                              : colors.grey
                                          }
                                          style={{
                                            marginRight: 5,
                                            cursor: "pointer",
                                          }}
                                        />
                                      ))}
                                    </div>
                                    <textarea
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      rows="4"
                                      className="mt-2 border border-gray-300 rounded-md p-2 w-full"
                                      placeholder="Enter your comment..."
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {isButtonVisible && (
                                  <button
                                    type="button"
                                    className="mx-3 inline-flex w-full justify-center rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 sm:ml-3 sm:w-auto"
                                    onClick={() => {
                                      handleSubmit(shoe.sellerid);
                                    }}
                                  >
                                    Submit
                                  </button>
                                )}
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition.Root>
                </div>
              </div>
            </ShoeContainer>
          ))}
      </div>
    </div>
  );
}
