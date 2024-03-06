import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ShoeContext } from "../contexts/ShoeContext";
import { FaTimes } from 'react-icons/fa';
import conf from "../config/main";
const Notification = ({ message, isError }) => {
    const bgColor = isError ? "bg-red-500" : "bg-green-500";
    return (
        <div
            className={`absolute bottom-4 right-4 text-white py-2 px-4 rounded ${bgColor}`}
        >
            {message}
        </div>
    );
};

 // Import FaTimes for X icon

const baseURL = conf.apiUrlPrefix ;

function EditItem({ itemId, onClose, user }) {
    const [shoeData, setShoeData] = useState({ picture: [] }); // Initialize shoeData.picture as an empty array
    const [editedData, setEditedData] = useState({});
    const [selectedImages, setSelectedImages] = useState([]); // State for selected images
    const [newImages, setNewImages] = useState([]);
    const [brandTags, setBrandTags] = useState([]);
    const [colorTags, setColorTags] = useState([]);
    const [genderTags, setGenderTags] = useState([]);
    const [uploadMessage, setUploadMessage] = useState(""); // State for upload message
    const [uploadError, setUploadError] = useState(""); // State for upload error
    const [showNotification, setShowNotification] = useState(false); // State to control notification visibility
    const modalRef = useRef(null);

    axios.defaults.headers.common["Authorization"] =
        `Bearer ${sessionStorage.getItem("authToken")}`;

    const handleCloseModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleCloseModal);

        return () => {
            document.removeEventListener("mousedown", handleCloseModal);
        };
    }, []);

    const { setShoes } = useContext(ShoeContext);
    const handleFetchShoes = async () => {
        try {
            const response = await axios.get(conf.apiUrlPrefix+"/shoes?populate=*");
            if (Array.isArray(response.data.data)) {
                // Check if response.data is an array
                const shoeData = response.data.data.map((shoe) => {
                    const { id, attributes } = shoe;
                    const {
                        products_name,
                        price,
                        details,
                        location,
                        picture,
                        brand,
                        color,
                        gender,
                        status,
                        seller,
                        size,
                        payment
                    } = attributes;
                    const image =
                        picture && picture.data && picture.data.length > 0
                            ? picture.data.map(
                                (img) =>
                                    conf.urlPrefix +
                                    img.attributes.url
                            )
                            : [];

                    const brandType = brand?.data?.attributes.name;
                    const colorType = color?.data?.attributes.name;
                    const genderType = gender?.data?.attributes.name;
                    const Seller = seller?.data?.attributes.username;
                    const sellerid = seller?.data?.id;
                    //const product_color = color.data.products_name
                    //const category = attributes.categories?.data.map(cat => cat.attributes.name) || ['uncategorized'];;
                    return {
                        id,
                        products_name,
                        price,
                        details,
                        location,
                        image,
                        brandType,
                        colorType,
                        genderType,
                        status,
                        Seller,
                        sellerid,
                        size,
                        payment,
                    };
                });
                setShoes(shoeData);
            } else {
                console.error(
                    "Response data is not an array:",
                    response.data.data
                );
            }
        } catch (error) {
            console.error("Error fetching shoes:", error);
        }
    };

    useEffect(() => {
        const fetchShoeData = async () => {
            try {
                const response = await axios.get(`${baseURL}shoes/${itemId}`, {
                    params: {
                        populate: [
                            "brand",
                            "color",
                            "gender",
                            "seller",
                            "buyer",
                            "picture",
                        ],
                    },
                });
                setShoeData(response.data.data.attributes);
            } catch (error) {
                console.error("Error fetching shoe data:", error);
            }
        };

        const fetchTagsFromServer = async () => {
            try {
                const [brandResponse, colorResponse, genderResponse] =
                    await Promise.all([
                        axios.get(`${baseURL}brands`),
                        axios.get(`${baseURL}colors`),
                        axios.get(`${baseURL}genders`),
                    ]);

                setBrandTags(brandResponse.data.data);
                setColorTags(colorResponse.data.data);
                setGenderTags(genderResponse.data.data);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        if (itemId) {
            fetchShoeData();
            fetchTagsFromServer();
        }
    }, [itemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setNewImages((prevImages) => [...prevImages, ...imageUrls]);
        setEditedData((prevData) => {
            return {
                ...prevData,
                picture: prevData.picture
                    ? [...prevData.picture, ...files]
                    : files,
            };
        });
    };


    const handleRemovePreviewImage = (index) => {
        // Remove the image from newImages state
        const updatedImages = [...newImages];
        updatedImages.splice(index, 1);
        setNewImages(updatedImages);

        // Remove the corresponding image from editedData
        const updatedEditedData = { ...editedData };
        updatedEditedData.picture.splice(index, 1);
        setEditedData(updatedEditedData);
    };


    const handleSelectImage = (index) => {
        // If the image index is already in selectedImages, remove it
        if (selectedImages.includes(index)) {
            setSelectedImages(selectedImages.filter((i) => i !== index));
        } else {
            // Otherwise, add it to selectedImages
            setSelectedImages([...selectedImages, index]);
        }
    };

    const handleRemoveImage = async (index) => {
        try {
            // Check if shoeData.picture.data exists before proceeding
            if (!shoeData?.picture?.data) {
                console.error("No image data found.");
                return;
            }

            // Get the ID of the image to be removed
            const imageIdToRemove = shoeData.picture.data[index]?.id;

            if (!imageIdToRemove) {
                console.error("Image ID not found.");
                return;
            }

            // Send a DELETE request to your backend API to remove the image
            await axios.delete(`${baseURL}upload/files/${imageIdToRemove}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            });

            // Update the shoeData state to remove the image
            const newImageData = shoeData.picture.data.filter(
                (image, i) => i !== index
            ); // Filter out the removed image
            const updatedShoeData = {
                ...shoeData,
                picture: { data: newImageData },
            };
            setShoeData(updatedShoeData);

            // If the image is also in editedData, update editedData to remove it
            if (editedData.picture && Array.isArray(editedData.picture)) {
                const newEditedPictures = editedData.picture.filter(
                    (image, i) => i !== index
                ); // Filter out the removed image
                setEditedData({ ...editedData, picture: newEditedPictures });
            }
        } catch (error) {
            console.error("Error removing image:", error);
        }
    };

    const uploadImagesToStrapi = async (images) => {
        try {
            const formData = new FormData();
            images.forEach((image) => formData.append("files", image)); // Append each image to FormData

            const response = await axios.post(`${baseURL}upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data; // Assuming Strapi returns data about the uploaded files
        } catch (error) {
            console.error("Error uploading images:", error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestData = { ...shoeData, ...editedData };

            // Append product name if available
            if (editedData.productName || shoeData?.products_name) {
                requestData.products_name =
                    editedData.productName || shoeData.products_name;
            }

            // Append price if available and convert it to a fixed number with 2 decimal places
            if (editedData.price || shoeData?.price) {
                requestData.price = parseFloat(
                    editedData.price || shoeData.price
                ).toFixed(2);
            }

            // Append details if available
            if (editedData.details || shoeData?.details) {
                requestData.details = editedData.details || shoeData.details;
            }

            // Append location if available
            if (editedData.location || shoeData?.location) {
                requestData.location = editedData.location || shoeData.location;
            }

            // Append brand ID if available
            if (editedData.brand || shoeData?.brand?.id) {
                requestData.brand = editedData.brand || shoeData.brand.id;
            }

            // Append color ID if available
            if (editedData.color || shoeData?.color?.id) {
                requestData.color = editedData.color || shoeData.color.id;
            }

            // Append gender ID if available
            if (editedData.gender || shoeData?.gender?.id) {
                requestData.gender = editedData.gender || shoeData.gender.id;
            }

            // Append size if available
            if (editedData.usSize || shoeData?.size) {
                requestData.size = editedData.usSize || shoeData.size;
            }

            // Remove unnecessary properties
            delete requestData.picture; // We handle pictures separately
            delete requestData.picture?.data; // Ensure that we don't send picture data to the server

            // Append size if available
            requestData.size = editedData.usSize || shoeData?.size;

            let allImageIds = [];

            if (
                Array.isArray(editedData.picture) &&
                editedData.picture.length > 0
            ) {
                const uploadedImageIds = await uploadImagesToStrapi(
                    editedData.picture
                );
                allImageIds = [
                    ...(shoeData.picture?.data?.map((image) => image.id) || []),
                    ...uploadedImageIds,
                ];
            } else {
                allImageIds =
                    shoeData.picture?.data?.map((image) => image.id) || [];
            }

            requestData.picture = allImageIds;

            const requestBody = { data: requestData };

            await axios.put(`${baseURL}shoes/${itemId}`, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (selectedImages.length > 0) {
                await Promise.all(selectedImages.map((index) => handleRemoveImage(index)));
            }

            // Set success message
            setUploadMessage("Shoe data updated successfully.");

            // Clear any previous error message
            setUploadError("");

            // Close the modal after 2 seconds
            setTimeout(() => {
                setShowNotification(true);
                handleFetchShoes();
            },);
        } catch (error) {
            console.error("Error updating shoe data:", error);
            // Set error message
            setUploadError("Error updating shoe data. Please try again.");

            // Clear success message if any
            setUploadMessage("");
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative" style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
                {showNotification ? (
                    <div>
                        {uploadMessage && (
                            <Notification message={uploadMessage} />
                        )}{" "}
                        {/* Render upload message if present */}
                        {uploadError && (
                            <Notification message={uploadError} isError />
                        )}{" "}
                        {/* Render error message if present */}
                    </div>
                ) : (
                    shoeData ? (
                        <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="productName"
                                className="text-sm text-gray-600"
                            >
                                Product Name:
                            </label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={
                                    editedData.productName ||
                                    shoeData.products_name
                                }
                                onChange={handleInputChange}
                                className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="price"
                                className="text-sm text-gray-600"
                            >
                                Price:
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={editedData.price || shoeData.price}
                                onChange={handleInputChange}
                                className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="details"
                                className="text-sm text-gray-600"
                            >
                                Details:
                            </label>
                            <input
                                type="text"
                                id="details"
                                name="details"
                                value={
                                    editedData.details || shoeData.details
                                }
                                onChange={handleInputChange}
                                className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="location"
                                className="text-sm text-gray-600"
                            >
                                Location:
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={
                                    editedData.location || shoeData.location
                                }
                                onChange={handleInputChange}
                                className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <label className="block mb-4">
                            <span className="text-gray-700">
                                Brand:{" "}
                                {shoeData.brand && shoeData.brand.name}
                            </span>
                            <select
                                name="brand"
                                value={
                                    editedData.brand ||
                                    shoeData?.brand?.id ||
                                    ""
                                }
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Brand</option>
                                {brandTags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Color:</span>
                            <select
                                name="color"
                                value={
                                    editedData.color ||
                                    shoeData?.color?.data?.attributes
                                        ?.name ||
                                    ""
                                }
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Color</option>
                                {colorTags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Gender:</span>
                            <select
                                name="gender"
                                value={
                                    editedData.gender ||
                                    shoeData?.gender?.data?.attributes
                                        ?.name ||
                                    ""
                                }
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                <option value="">Select Gender</option>
                                {genderTags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.attributes.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <div className="mb-4">
                            <label
                                htmlFor="usSize"
                                className="text-sm text-gray-600"
                            >
                                US Size:
                            </label>
                            <select
                                id="usSize"
                                name="usSize"
                                value={editedData.usSize || shoeData.size}
                                onChange={handleInputChange}
                                className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                required // Make the field required
                            >
                                <option value="5">5.5</option>
                                <option value="6">6</option>
                                <option value="6.5">6.5</option>
                                <option value="7.5">7.5</option>
                                <option value="8">8</option>
                                <option value="8.5">8.5</option>
                                <option value="9">9</option>
                                <option value="9.5">9.5</option>
                                <option value="10">10</option>
                                <option value="10.5">10.5</option>
                                <option value="11">11</option>
                                <option value="11.5">11.5</option>
                                <option value="12">12</option>
                                <option value="12.5">12.5</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Images:</p>
                            <div className="flex flex-wrap items-center">
                                {shoeData.picture &&
                                    shoeData.picture.data &&
                                    shoeData.picture.data.map((image, index) => (
                                        <div key={index} className="relative mr-4 mb-4">
                                            <div className="relative">
                                                <img
                                                    src={`http://localhost:1337${image.attributes.url}`}
                                                    alt={`Image ${index}`}
                                                    className="w-20 h-20 object-cover rounded-md cursor-pointer"
                                                    onClick={() => handleSelectImage(index)}
                                                    style={{ border: selectedImages.includes(index) ? '2px solid red' : 'none' }}
                                                />
                                                {selectedImages.includes(index) && (
                                                    <div
                                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:rotate-12 transition-transform"
                                                        onClick={() => handleSelectImage(index)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100">
                                {/* Text inside the dropzone */}
                                <span className="text-gray-600">Drop or click to upload images</span>
                                {/* Input element for file selection */}
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} multiple accept="image/jpeg,image/png" />
                                {/* New code for displaying image previews */}
                                <div className="flex flex-wrap items-center justify-center">
                                    {newImages.map((imageUrl, index) => (
                                        <div key={index} className="relative mr-4 mb-4">
                                            <img
                                                src={imageUrl}
                                                alt={`Preview ${index}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => handleRemovePreviewImage(index)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </label>



                        </div>
                        <div className="flex">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded px-4 py-2 flex items-center justify-center hover:bg-blue-600 mr-2"
                            >
                                Save
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                        {uploadMessage && (
                            <Notification message={uploadMessage} />
                        )}{" "}
                        {/* Render upload message if present */}
                        {uploadError && (
                            <Notification message={uploadError} isError />
                        )}{" "}
                        {/* Render error message if present */}
                    </form>
                    ) : (
                        <p>Loading...</p>
                    )
                )}
            </div>
        </div>
    );
}

export default EditItem;