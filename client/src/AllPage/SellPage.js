import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa'; // Import FaTimes for X icon
import axios from 'axios';

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

    useEffect(() => {
        fetchTagsFromServer();
        fetchUserFromServer();
        // Add event listener to handle clicks outside the popup
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            // Remove event listener when component unmounts
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const fetchUserFromServer = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/users/me');
            setUser(response.data); // Assuming the response contains user details
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const fetchTagsFromServer = async () => {
        try {
            const brandResponse = await axios.get('http://localhost:1337/api/brands');
            const colorResponse = await axios.get('http://localhost:1337/api/colors');
            const genderResponse = await axios.get('http://localhost:1337/api/genders');

            setBrandTags(brandResponse.data.data);
            setColorTags(colorResponse.data.data);
            setGenderTags(genderResponse.data.data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    /*const handleTagChange = (type, tagId) => {
        switch (type) {
            case 'brand':
                setSelectedBrandTags(prevState => {
                    if (prevState.includes(tagId)) {
                        return prevState.filter(id => id !== tagId);
                    } else {
                        return [...prevState, tagId];
                    }
                });
                break;
            case 'color':
                setSelectedColorTags(prevState => {
                    if (prevState.includes(tagId)) {
                        return prevState.filter(id => id !== tagId);
                    } else {
                        return [...prevState, tagId];
                    }
                });
                break;
            case 'gender':
                setSelectedGenderTags(prevState => {
                    if (prevState.includes(tagId)) {
                        return prevState.filter(id => id !== tagId);
                    } else {
                        return [...prevState, tagId];
                    }
                });
                break;
            default:
                break;
        }
    };*/

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length > 0) {
            const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imageUrls]);
            setDisplayText(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken'); // Assuming you're storing the JWT token in localStorage

        if (!token) {
            console.error('JWT token not found');
            return;
        }

        if (!user) {
            console.error('User data not found');
            return;
        }

        if (images.length === 0) {
            console.error('No images selected');
            return;
        }

        try {
            const formData = new FormData();
            // Form data construction...
            formData.append('products_name', e.target.products_name.value);
            formData.append('price', e.target.price.value);
            formData.append('details', e.target.details.value);
            formData.append('location', e.target.location.value);
            formData.append('seller', user.id);
            selectedBrandTags.forEach(tagId => {
                formData.append('brandTags[]', tagId);
            });
            selectedColorTags.forEach(tagId => {
                formData.append('colorTags[]', tagId);
            });
            selectedGenderTags.forEach(tagId => {
                formData.append('genderTags[]', tagId);
            });
            images.forEach((image, index) => {
                formData.append(`files.image${index}`, image);
            });

            const response = await axios.post('http://localhost:1337/api/shoes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Upload response:', response.data);
            // Handle success or show notification
        } catch (error) {
            console.error('Error uploading images:', error);
            // Handle error or show error notification
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg" style={{ maxHeight: "calc(100vh - 180px)", overflowY: "auto" }}>
                <div className="justify-end">
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
                        <FaTimes />
                    </button>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Post Item</h2>
                    <form onSubmit={handleSubmit} className="w-full">
                        <label className="block mb-4">
                            <span className="text-gray-700">Name:</span>
                            <input type="text" name="products_name" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Price:</span>
                            <input type="text" name="price" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Description:</span>
                            <textarea name="details" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Location:</span>
                            <input type="text" name="location" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Select Images:</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mt-1 block w-full" />
                        </label>
                        {images.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Preview:</h3>
                                <div className="flex flex-wrap">
                                    {images.map((imageUrl, index) => (
                                        <div key={index} className="mr-4 mb-4 relative rounded overflow-hidden">
                                            <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
                                            <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-gray-800 text-white px-2 py-1 rounded-full">Remove</button>
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
                                            onChange={(e) => setSelectedBrandTags(Array.from(e.target.selectedOptions, option => option.value))}
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            <option value="">Brand</option>
                                            {brandTags.map(tag => (
                                                <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
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
                                            onChange={(e) => setSelectedColorTags(Array.from(e.target.selectedOptions, option => option.value))}
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            <option value="">Color</option>
                                            {colorTags.map(tag => (
                                                <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
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
                                            onChange={(e) => setSelectedGenderTags(Array.from(e.target.selectedOptions, option => option.value))}
                                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        >
                                            <option value="">Gender</option>
                                            {genderTags.map(tag => (
                                                <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <button type="submit" disabled={images.length === 0} className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-900">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ImageUploadPopup;
