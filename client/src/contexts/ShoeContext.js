import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337";

export const ShoeContext = createContext();

const ShoeProvider = ({ children }) => {
    // shoes state
    const [shoes, setShoes] = useState([]);

    // fetch products
    useEffect(() => {
      fetchShoes();
    }, []);

    const fetchShoes = async () => {
      try {
        const response = await axios.get("/api/shoes?populate=*");
        if (Array.isArray(response.data.data)) { // Check if response.data is an array
          const shoeData = response.data.data.map(shoe => {
            const { id, attributes } = shoe;
            const { products_name,price, details, location, picture, } = attributes;
            const imageUrl = picture && picture.data && picture.data.length > 0 ? picture.data[0].attributes.url : null;
            const image = "http://localhost:1337"+imageUrl
            const category = attributes.categories?.data[0]?.attributes?.name ?? 'uncategorized';
            return {
              id,
              products_name,
              price,
              details,
              location,
              image,
              category,
            };
          });
          setShoes(shoeData);
          
        } else {
          console.error("Response data is not an array:", response.data.data);
        }
          
      } catch (error) {
        console.error("Error fetching shoes:", error);
      }
    };
    
    return (
      <ShoeContext.Provider value={{ shoes }}>
        {children}
      </ShoeContext.Provider>
    );
  };

export default ShoeProvider;
