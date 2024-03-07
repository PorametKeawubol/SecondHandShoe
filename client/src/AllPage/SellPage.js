import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa"; // Import FaTimes for X icon
import axios from "axios";
import conf from "../config/main";

// Notification component
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

const ImageUploadPopup = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [brandTags, setBrandTags] = useState([]);
  const [colorTags, setColorTags] = useState([]);
  const [genderTags, setGenderTags] = useState([]);
  const [selectedBrandTags, setSelectedBrandTags] = useState([]);
  const [selectedColorTags, setSelectedColorTags] = useState([]);
  const [selectedGenderTags, setSelectedGenderTags] = useState([]);
  const [displayText, setDisplayText] = useState(true);
  const [user, setUser] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const popupRef = useRef(null);

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${sessionStorage.getItem("authToken")}`;

  useEffect(() => {
    fetchTagsFromServer();
    fetchUserFromServer();
    // Add event listener to handle clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchUserFromServer = async () => {
    try {
      const response = await axios.get(conf.apiUrlPrefix + "/users/me");
      setUser(response.data); // Assuming the response contains user details
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchTagsFromServer = async () => {
    try {
      const brandResponse = await axios.get(`${conf.apiUrlPrefix}/brands`);
      const colorResponse = await axios.get(`${conf.apiUrlPrefix}/colors`);
      const genderResponse = await axios.get(`${conf.apiUrlPrefix}/genders`);

      setBrandTags(brandResponse.data.data);
      setColorTags(colorResponse.data.data);
      setGenderTags(genderResponse.data.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleImageChange = (e) => {
    // Check if files are present in the event target
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      console.log("Selected files:", files);

      const validImageFiles = files.filter((file) => {
        const fileType = file.type.toLowerCase();
        return fileType === "image/png" || fileType === "image/jpeg";
      });

      if (validImageFiles.length > 0) {
        setImages((prevImages) => [...prevImages, ...validImageFiles]);
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
      const uploadedImages = await Promise.all(images.map(uploadImage));

      // Create shoe entry with associated images
      const shoeData = {
        products_name: e.target.products_name.value,
        price: parseFloat(e.target.price.value).toFixed(2),
        details: e.target.details.value,
        location: e.target.location.value,
        brand: selectedBrandTags[0],
        color: selectedColorTags[0],
        gender: selectedGenderTags[0],
        seller: user.id,
        size: e.target.usSize.options[e.target.usSize.selectedIndex].text,
        picture: uploadedImages.map((image) => ({ id: image.id })), // Assuming Strapi returns image objects with an id field
      };

      // Post shoe data to Strapi server
      const formData = new FormData();
      formData.append("data", JSON.stringify(shoeData));

      const response = await axios.post(
        `${conf.apiUrlPrefix}/shoes`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);
      setUploadMessage("Items uploaded successfully."); // Set the upload message
      setTimeout(() => {
        onClose(); // Close popup after a delay
      }, 2000); // Adjust the delay as needed
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
        `${conf.apiUrlPrefix}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
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

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
      <div
        ref={popupRef}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg relative"
        style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Post Item</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="block mb-4">
            <span className="text-gray-700">Name:</span>
            <input
              required
              type="text"
              name="products_name"
              className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Price:</span>
            <input
              type="number"
              name="price"
              className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              min="0" // Set the minimum value to 0
              step="0.01" // Set the step to allow decimal values
              required // Make the field required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Description:</span>
            <textarea
              name="details"
              className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Location:</span>
            <input
              type="text"
              name="location"
              className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <div class="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                multiple
                accept="image/jpeg,image/png"
              />
            </label>
          </div>
          {images.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Preview:
              </h3>
              <div className="flex flex-wrap">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="mr-4 mb-4 relative rounded overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded"
                      className="w-32 h-32 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {displayText && <p className="text-gray-700">Please select images</p>}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/3 px-3 mb-6">
              <label className="block mb-4">
                <span className="text-gray-700">Brand Tags:</span>
                <div className="mt-1 relative">
                  <select
                    value={selectedBrandTags}
                    onChange={(e) =>
                      setSelectedBrandTags(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">Brand</option>
                    {brandTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.attributes.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                <div />
              </label>
            </div>
            <div className="w-full lg:w-1/3 px-3 mb-6">
              <label className="block mb-4">
                <span className="text-gray-700">Color Tags:</span>
                <div className="mt-1 relative">
                  <select
                    value={selectedColorTags}
                    onChange={(e) =>
                      setSelectedColorTags(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">Color</option>
                    {colorTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.attributes.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            <div className="w-full lg:w-1/3 px-3 mb-6">
              <label className="block mb-4">
                <span className="text-gray-700">Gender Tags:</span>
                <div className="mt-1 relative">
                  <select
                    value={selectedGenderTags}
                    onChange={(e) =>
                      setSelectedGenderTags(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option value="">Gender</option>
                    {genderTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.attributes.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            <div className="w-full lg:w-1/3 px-3 mb-6">
              <label className="block mb-4">
                <span className="text-gray-700">US Size:</span>
                <select
                  name="usSize"
                  className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required // Make the field required
                >
                  <option value="">Select US Size</option>
                  <option value="5">5.5</option>
                  <option value="6">6</option>
                  <option value="5">6.5</option>
                  <option value="6">7.5</option>
                  <option value="5">8</option>
                  <option value="6">8.5</option>
                  <option value="5">9</option>
                  <option value="6">9.5</option>
                  <option value="5">10</option>
                  <option value="6">10.5</option>
                  <option value="5">11</option>
                  <option value="6">11.5</option>
                  <option value="5">12</option>
                  <option value="6">12.5</option>
                </select>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={images.length === 0}
            className="flex items-center justify-center w-full bg-black text-white rounded-md py-2 hover:bg-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Upload
          </button>
          {uploadMessage && <Notification message={uploadMessage} />}{" "}
          {/* Render upload message if present */}
          {uploadError && <Notification message={uploadError} isError />}{" "}
          {/* Render error message if present */}
        </form>
      </div>
    </div>
  );
};
export default ImageUploadPopup;
