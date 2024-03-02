import React, { useState, useEffect } from "react";
import axios from "axios";

const baseURL = "http://localhost:1337/api/";

function EditItem({ itemId, onClose, user }) {
    const [shoeData, setShoeData] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [newImages, setNewImages] = useState([]);
    const [brandTags, setBrandTags] = useState([]);
    const [colorTags, setColorTags] = useState([]);
    const [genderTags, setGenderTags] = useState([]);

    useEffect(() => {
        const fetchShoeData = async () => {
            try {
                const response = await axios.get(`${baseURL}shoes/${itemId}`, {
                    params: {
                        populate: ['brand', 'color', 'gender', 'seller', 'buyer', 'picture'],
                    }
                });
                setShoeData(response.data.data.attributes);
            } catch (error) {
                console.error("Error fetching shoe data:", error);
            }
        };

        const fetchTagsFromServer = async () => {
            try {
                const [brandResponse, colorResponse, genderResponse] = await Promise.all([
                    axios.get(`${baseURL}brands`),
                    axios.get(`${baseURL}colors`),
                    axios.get(`${baseURL}genders`)
                ]);

                setBrandTags(brandResponse.data.data);
                setColorTags(colorResponse.data.data);
                setGenderTags(genderResponse.data.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
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
        const imageUrls = files.map(file => URL.createObjectURL(file)); 
        setNewImages(prevImages => [...prevImages, ...imageUrls]); 
        setEditedData({ ...editedData, picture: [...(editedData.picture || []), ...files] }); 
    };

    const handleRemoveImage = (index) => {
        const newImageData = shoeData.picture.data.filter((_, i) => i !== index);
        const newShoeData = { ...shoeData, picture: { data: newImageData } };
        setShoeData(newShoeData);
        setEditedData({ ...editedData, picture: newImageData });
    };

    const handleSubmit = async (e) => { 
        e.preventDefault(); 

        try {
            const formData = new FormData(); 
            formData.append('products_name', editedData.productName || shoeData.products_name);
            formData.append('price', parseFloat(editedData.price || shoeData.price).toFixed(2));
            formData.append('details', editedData.details || shoeData.details);
            formData.append('location', editedData.location || shoeData.location);
            formData.append('brand', editedData.brand || (shoeData?.brand?.id || ''));
            formData.append('color', editedData.color || (shoeData?.color?.data?.attributes?.name || ''));
            formData.append('gender', editedData.gender || (shoeData?.gender?.data?.attributes?.name || ''));
            formData.append('seller', user.id); // Using `user` prop
            formData.append('size', editedData.usSize || shoeData.size);

            if (editedData.picture) {
                editedData.picture.forEach(file => {
                    formData.append('picture', file);
                });
            }

            console.log("Form Data:", formData);

            await axios.put(`${baseURL}shoes/${itemId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onClose();
        } catch (error) {
            console.error("Error updating shoe data:", error);
        }
    };
    

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg" style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
                <div className="justify-end">
                    <h2 className="text-2xl font-semibold mb-4">Edit Item</h2>
                    {shoeData ? (
                        <form onSubmit={handleSubmit}> 
                            <div className="mb-4">
                                <label htmlFor="productName" className="text-sm text-gray-600">Product Name:</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={editedData.productName || shoeData.products_name}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="text-sm text-gray-600">Price:</label>
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
                                <label htmlFor="details" className="text-sm text-gray-600">Details:</label>
                                <input
                                    type="text"
                                    id="details"
                                    name="details"
                                    value={editedData.details || shoeData.details}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="text-sm text-gray-600">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={editedData.location || shoeData.location}
                                    onChange={handleInputChange}
                                    className="block w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                                />
                            </div>
                            <label className="block mb-4">
                                <span className="text-gray-700">Brand: {shoeData.brand && shoeData.brand.name}</span>
                                <select
                                    name="brand"
                                    value={editedData.brand || (shoeData?.brand?.id || '')}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Brand</option>
                                    {brandTags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block mb-4">
                                <span className="text-gray-700">Color:</span>
                                <select
                                    name="color"
                                    value={editedData.color || (shoeData?.color?.data?.attributes?.name || '')}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Color</option>
                                    {colorTags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="block mb-4">
                                <span className="text-gray-700">Gender:</span>
                                <select
                                    name="gender"
                                    value={editedData.gender || (shoeData?.gender?.data?.attributes?.name || '')}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">Select Gender</option>
                                    {genderTags.map(tag => (
                                        <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="mb-4">
                                <label htmlFor="usSize" className="text-sm text-gray-600">US Size:</label>
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
                                    {shoeData.picture && shoeData.picture.data && shoeData.picture.data.map((image, index) => (
                                        <div key={index} className="relative mr-4 mb-4">
                                            <img
                                                src={`http://localhost:1337${image.attributes.url}`}
                                                alt={`Image ${index}`}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                            <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-1 -mr-1">
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    multiple
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex">
                                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mr-2">Save</button>
                                <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditItem;
