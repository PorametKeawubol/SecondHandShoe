import React, { useContext } from "react";
import { ReviewContext } from "../contexts/ShopRatingContext";

const ShopReviewPage = () => {
  const { reviews } = useContext(ReviewContext);

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h2>Score: {review.score}</h2>
            <p>Comment: {review.comment}</p>
            <p>Created At: {review.createdAt}</p>
            <p>Seller Rating Name: {review.seller_rating_name}</p>
            <p>Rating By Name: {review.rating_by_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopReviewPage;
