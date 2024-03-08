import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import conf from "../config/main";
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
      const response = await axios.get(conf.urlPrefix + "/api/shoes?populate=*");
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
            payment,
            buyer,
            complete,
          } = attributes;
          const image =
            picture && picture.data && picture.data.length > 0
              ? picture.data.map((img) => conf.urlPrefix + img.attributes.url)
              : [];

          const brandType = brand?.data?.attributes.name;
          const colorType = color?.data?.attributes.name;
          const genderType = gender?.data?.attributes.name;
          const Seller = seller?.data?.attributes.username;
          const sellerid = seller?.data?.id;
          const buyerid = buyer?.data?.id;

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
            buyerid,
            complete,
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
    <ShoeContext.Provider value={{ shoes, setShoes, fetchShoes }}>
      {children}
    </ShoeContext.Provider>
  );
};

export default ShoeProvider;
