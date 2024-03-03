import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";
export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
  // shoes state
  const [reviews, setReview] = useState([]);

  // fetch products
  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    try {
      const response = await axios.get("/api/ratings?populate=*");
      if (Array.isArray(response.data.data)) {
        // Check if response.data is an array
        const reviewData = response.data.data.map((review) => {
          const { id, attributes } = review;
          const { score, comment, createdAt, seller_rating, rating_by } =
            attributes;
          const rating_by_name = rating_by?.data?.attributes.username;
          const seller_rating_name = seller_rating?.data?.attributes.username;

          return {
            id,
            score,
            comment,
            createdAt,
            seller_rating_name,
            rating_by_name,
          };
        });
        setReview(reviewData);
        console.log("dsfsfd", reviews);
      } else {
        console.error("Response data is not an array:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching shoes:", error);
    }
  };

  return (
    <ReviewContext.Provider value={{ reviews, setReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewProvider;
