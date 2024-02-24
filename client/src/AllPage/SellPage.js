import React, { useState, useEffect } from 'react';
import Header from '../Component/Header';
import { Link } from 'react-router-dom';
import { FaReply } from 'react-icons/fa';
import axios from 'axios'; // Import axios

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [displayText, setDisplayText] = useState(true); // State to control displaying text

    useEffect(() => {
        fetchTagsFromServer();
    }, []);

    const fetchTagsFromServer = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/categories');
            console.log('Response:', response.data);
            const tagsData = response.data.data;
            setTags(tagsData);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        if (imageFiles.length > 0) {
            const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
            setImages(prevImages => [...prevImages, ...imageUrls]);
            setDisplayText(false); // Hide text when images are added
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle uploading the images to your server
        if (images.length > 0) {
            console.log('Images uploaded:', images);
            console.log('Selected tags:', selectedTags);
            // You can send 'images' and 'selectedTags' to your server using fetch or axios
        }
    };

    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        if (updatedImages.length === 0) {
            setDisplayText(true); // Show text again if all images are removed
        }
    };

    const handleTagChange = (e) => {
        const { value } = e.target;
        setSelectedTags(value);
    };

    return (
        <div>
            <Header />
            <div>
                <div className="container mx-auto py-40">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <label className="block mb-4">
                            <span className="text-gray-700">Name:</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Select Images:</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="mt-1 block" />
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
                        <label className="block mb-4">
                            <span className="text-gray-700">Location:</span>
                            <input type="text" className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Tags:</span>
                            <select
                                multiple
                                value={selectedTags}
                                onChange={handleTagChange}
                                className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                                {tags.map(tag => (
                                    <option key={tag.id} value={tag.id}>{tag.attributes.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block mb-4">
                            <span className="text-gray-700">Description:</span>
                            <textarea className="mt-1 block w-full rounded-md border-black border shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        </label>
                        <button type="submit" disabled={images.length === 0} className="w-full bg-black text-white rounded-md py-2 hover:bg-gray-900">Upload</button>
                    </form>
                </div>
                <div className="flex justify-start mt-20 mb-8 ml-4">
                    <Link to="/Profile" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded border border-black flex items-center">
                        <FaReply size={20} /> <span className="ml-2">Return</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ImageUpload;
