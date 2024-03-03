import React, { useContext } from "react";
import { ReviewContext } from "../contexts/ShopRatingContext";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellerRatingSummary = ({ sellerName }) => {
  const { reviews } = useContext(ReviewContext);

  // Filter reviews by seller name
  const sellerReviews = reviews.filter(
    (review) => review.seller_rating_name === sellerName
  );

  // Calculate average score
  const averageScore =
    sellerReviews.length > 0
      ? sellerReviews.reduce((sum, review) => sum + review.score, 0) /
        sellerReviews.length
      : 0;

  return (
    <div className="flex items-center">
      {averageScore > 0 || sellerReviews.length > 0 ? (
        <>
          <FaStar className="text-yellow-400 h-6 w-6" />
          <h className="ml-1">{averageScore.toFixed(1)}</h>
        </>
      ) : (
        <p>No reviews yet</p>
      )}
      <Link to={`/ShopReview/${sellerName}`}>
        <p> | {sellerReviews.length} review</p>
      </Link>
    </div>
  );
};

export default SellerRatingSummary;
