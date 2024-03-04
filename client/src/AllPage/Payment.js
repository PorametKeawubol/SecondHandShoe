import Header from "../Component/Header";
import { FaMoneyBillAlt } from "react-icons/fa";
import Qrcode from "../Component/Picture/Qrcode.png";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ShoeContext } from "../contexts/ShoeContext";
import { Link } from "react-router-dom";
import Footer from "../Component/Footer";
function Payment() {
     const { shoes } = useContext(ShoeContext);
     const [images, setImages] = useState([]);
     const [displayText, setDisplayText] = useState(true);
     const [user, setUser] = useState(null);
     const [uploadMessage, setUploadMessage] = useState("");
     const [uploadError, setUploadError] = useState("");
     const { id } = useParams();
     const shoe = shoes.find((item) => item.id === parseInt(id));
     const price = shoe ? shoe.price : 0;
     const [showConfirmation, setShowConfirmation] = useState(false);
     useEffect(() => {
          fetchUserFromServer();
          // Add event listener to handle clicks outside the popup
          document.addEventListener("mousedown", handleOutsideClick);
          return () => {
               // Remove event listener when component unmounts
               document.removeEventListener("mousedown", handleOutsideClick);
          };
     }, []);
     const fetchUserFromServer = async () => {
          try {
               const response = await axios.get(
                    "http://localhost:1337/api/users/me"
               );
               setUser(response.data); // Assuming the response contains user details
          } catch (error) {
               console.error("Error fetching user:", error);
          }
     };
     const onClose = () => {
          setShowConfirmation(false);
     };
     const handleImageChange = (e) => {
          // Check if files are present in the event target
          if (e.target.files && e.target.files.length > 0) {
               const files = Array.from(e.target.files);
               console.log("Selected files:", files);

               const validImageFiles = files.filter((file) => {
                    const fileType = file.type.toLowerCase();
                    return (
                         fileType === "image/png" || fileType === "image/jpeg"
                    );
               });

               if (validImageFiles.length > 0) {
                    setImages((prevImages) => [
                         ...prevImages,
                         ...validImageFiles,
                    ]);
                    setDisplayText(false);
               } else {
                    console.error("No valid images selected (PNG or JPG)");
               }
          }
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          const token = sessionStorage.getItem("authToken");

          if (!token) {
               console.error("JWT token not found");
               return;
          }

          if (!user) {
               console.error("User data not found");
               return;
          }

          if (images.length === 0) {
               console.error("No images selected");
               return;
          }

          console.log("Submitting form data...");

          try {
               // Upload images to Strapi server
               const uploadedImages = await Promise.all(
                    images.map(uploadImage)
               );

               // Create shoe entry with associated images
               const shoeData = {
                    Buyer: user.id,
                    Bill: uploadedImages.map((image) => ({ id: image.id })),
                    shoe: parseInt(id),
                    Price:parseFloat(price).toFixed(2)

                    // Assuming Strapi returns image objects with an id field
               };

               // Post shoe data to Strapi server
               const formData = new FormData();
               formData.append("data", JSON.stringify(shoeData));

               const response = await axios.post(
                    "http://localhost:1337/api/payments",
                    formData,
                    {
                         headers: {
                              "Content-Type": "multipart/form-data",
                         },
                    }
               );

               console.log("Upload response:", response.data);
               setUploadMessage("Items uploaded successfully.");
               setShowConfirmation(true); // Set the upload message
               // Adjust the delay as needed
          } catch (error) {
               console.error("Error uploading data:", error);
               setUploadError("Error uploading data. Please try again."); // Set the upload error message
          }
     };

     const uploadImage = async (image) => {
          try {
               const formData = new FormData();
               formData.append("files", image);
               const response = await axios.post(
                    "http://localhost:1337/api/upload",
                    formData,
                    {
                         headers: {
                              "Content-Type": "multipart/form-data",
                         },
                    }
               );

               return response.data[0]; // Assuming Strapi returns an array of uploaded files with metadata
          } catch (error) {
               console.error("Error uploading image:", error);
               throw error;
          }
     };

     const removeImage = (index) => {
          const updatedImages = [...images];
          updatedImages.splice(index, 1);
          setImages(updatedImages);
          if (updatedImages.length === 0) {
               setDisplayText(true);
          }
     };

     const handleOutsideClick = (e) => {
          if (e.target === e.currentTarget) {
               onClose();
          }
     };

     return (
          <div>
               <Header />
               <div className="flex flex-col items-center justify-center">
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
                         <div className="md:flex">
                              <div className="relative">
                                   <div className="p-4 mb-6">
                                        <p className="mb-8 ">
                                             ยอดชำระเงินทั้งหมด
                                             <div className="text-2xl text-red-500 font-medium mb-4">
                                                  {parseFloat(price).toFixed(2)}{" "}
                                                  THB
                                             </div>
                                        </p>
                                        <div className="flex justify-center">
                                        
                                            <img
                                                className="sm:w-[30%]"
                                                src={Qrcode}
                                                alt=""
                                            />
                                          
                                          
                                        </div>
                                        
                                        <h className="mb-8  text-red-500 font-medium mb-4">
                                             {parseFloat(price).toFixed(2)} THB
                                        </h>

                                        <p className="mb-8">
                                             {" "}
                                             บริษัท SECONDHANDSHOE CO.,LTD
                                        </p>
                                        <label className="block mb-4">
                                             <span className="text-gray-700">
                                                  Select Images:
                                             </span>
                                             <input
                                                  type="file"
                                                  accept="image/*"
                                                  multiple
                                                  onChange={handleImageChange}
                                                  className="mt-1 block w-full"
                                             />
                                        </label>
                                        {images.length > 0 && (
                                             <div>
                                                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                                       Preview:
                                                  </h3>
                                                  <div className="flex flex-wrap">
                                                       {images.map(
                                                            (image, index) => (
                                                                 <div
                                                                      key={
                                                                           index
                                                                      }
                                                                      className="mr-4 mb-4 relative rounded overflow-hidden"
                                                                 >
                                                                      <img
                                                                           src={URL.createObjectURL(
                                                                                image
                                                                           )}
                                                                           alt="Uploaded"
                                                                           className="w-32 h-32 object-cover"
                                                                      />
                                                                      <button
                                                                           type="button"
                                                                           onClick={() =>
                                                                                removeImage(
                                                                                     index
                                                                                )
                                                                           }
                                                                           className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full"
                                                                      >
                                                                           Remove
                                                                      </button>
                                                                 </div>
                                                            )
                                                       )}
                                                  </div>
                                             </div>
                                        )}
                                        {displayText && (
                                             <p className="text-gray-700">
                                                  Please select images
                                             </p>
                                        )}
                                        <button
                                             onClick={handleSubmit}
                                             className="bg-black hover:bg-black text-white py-2 px-4 border border-blue-700 rounded"
                                        >
                                             summit
                                        </button>

                                        {showConfirmation && (
                                             <section className="z-50 fixed inset-0 h-full w-full bg-gray-800 bg-opacity-80 overflow-hidden">
                                                  <div className="absolute z-50 left-1/2 top-24 transform -translate-x-1/2 px-8 w-full">
                                                       <div className="bg-white w-full max-w-2xl rounded-xl mx-auto py-12 px-6 md:px-12">
                                                            <div className="flex justify-center mb-6">
                                                                 <svg
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                      width="64"
                                                                      height="64"
                                                                      viewBox="0 0 64 64"
                                                                      fill="none"
                                                                 >
                                                                      <circle
                                                                           opacity="0.3"
                                                                           cx="32"
                                                                           cy="32"
                                                                           r="32"
                                                                           fill="#C8C7FD"
                                                                      ></circle>
                                                                      <circle
                                                                           cx="32"
                                                                           cy="32"
                                                                           r="24"
                                                                           fill="#C8C7FD"
                                                                      ></circle>
                                                                      <path
                                                                           d="M41.28 24.4655C41.0779 24.2969 40.8447 24.1695 40.5933 24.0911C40.3419 24.0127 40.0775 23.9842 39.8154 24.0083C39.5534 24.0321 39.2983 24.1072 39.0654 24.2299C38.8321 24.3522 38.6257 24.5194 38.4575 24.7218L29.8487 35.0499L25.3927 30.5939C25.015 30.2292 24.5093 30.0271 23.9844 30.0318C23.4596 30.0365 22.9576 30.247 22.5862 30.6183C22.2152 30.9893 22.0044 31.4914 22.0001 32.0165C21.9954 32.5414 22.1971 33.0471 22.5618 33.4244L28.5675 39.4301C28.7538 39.6165 28.975 39.7642 29.2186 39.8651C29.4623 39.9657 29.7234 40.0173 29.9868 40.0166H30.0769C30.3551 40.0042 30.6279 39.9342 30.8776 39.8102C31.1269 39.6865 31.3481 39.5119 31.5264 39.2981L41.5353 27.2867C41.7039 27.0846 41.8309 26.8514 41.9093 26.6003C41.9877 26.3493 42.0156 26.0852 41.9918 25.8231C41.968 25.5611 41.8929 25.3067 41.7706 25.0738C41.6482 24.8409 41.4813 24.6344 41.2793 24.4658L41.28 24.4655Z"
                                                                           fill="#7573F9"
                                                                      ></path>
                                                                 </svg>
                                                            </div>
                                                            <p className="uppercase text-rhino-300 font-bold text-xs tracking-widest text-center mb-1">
                                                                 SUCCESS
                                                            </p>
                                                            <h1 className="font-heading text-center text-2xl lg:text-4xl text-rhino-700 font-semibold mb-6">
                                                                 Your order has
                                                                 been placed
                                                            </h1>
                                                            <p className="text-center mb-8 text-rhino-300 text-sm lg:text-lg max-w-md mx-auto">
                                                                 แอดมินกำลังตรวจสอบสลิป
                                                                 ระยะเวลาประมาณ
                                                                 2-3 ชั่วโมง
                                                                 หากมีข้อสงสัย
                                                                 ติดต่อ 08-88888
                                                            </p>
                                                            <div className="flex justify-center">
                                                                 <Link
                                                                      to="/"
                                                                      className="py-3 px-4 bg-purple-500 rounded-sm text-center text-sm font-medium text-white hover:bg-purple-500 transition duration-200"
                                                                 >
                                                                      Continue
                                                                      Shopping
                                                                 </Link>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </section>
                                        )}
                                   </div>
                              </div>
                              <div className=" drop-shadow-2xl bg-gradient-to-r from-[#355C7D] via-[#6C5B7B] to-[#C06C84] p-6 rounded-3xl text-slate-100">
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
                                             <p className="mb-2 text-lg font-bold">
                                                  Step 1
                                             </p>
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
                                             <p className="mb-2 text-lg font-bold">
                                                  Step 2
                                             </p>
                                             <p className="">
                                                  คลิกไปที่ปุ่ม "สแกน" หรือ "QR
                                                  Code" และกดที่ "รูปภาพ"
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
                                             <p className="mb-2 text-lg font-bold">
                                                  Step 3
                                             </p>
                                             <p className="">
                                                  สแกน QR Code
                                                  ที่ปรากฏบนหน้าจอหรือที่ท่านแคปไว้และทำการชำระเงิน
                                                  โดยกรุณาเช็คชื่อบัญชีผู้รับคือ
                                                  "บริษัท SECONDHANDSHOE
                                                  CO.,LTD"
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
                                             <p className="mb-2 text-lg font-bold">
                                                  Step 4
                                             </p>
                                             <p className="">
                                                  บันทึกสลิปและเพิ่มสลิปในช่อง
                                                  upload slip ของเรา
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
                                             <p className="mb-2 text-lg font-bold">
                                                  Success
                                             </p>
                                             <p className="" />
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
              <Footer/>
          </div>
     );
}

export default Payment;
