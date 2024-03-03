import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ReviewContext } from "../contexts/ShopRatingContext";
import { FaStar } from "react-icons/fa";

const ShopReviewPage = () => {
  const { reviews } = useContext(ReviewContext);
  const { sellerName } = useParams();

  // Filter reviews based on sellerName
  const filteredReviews = reviews.filter(
    (review) => review.seller_rating_name === sellerName
  );

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  return (
    <div style={styles.container}>
      <h1>Shop Reviews for {sellerName}</h1>
      {filteredReviews.map((review, index) => (
        <div key={index} style={styles.reviewContainer}>
          <div style={styles.stars}>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                color={index < review.score ? colors.orange : colors.grey}
                size={24}
              />
            ))}
          </div>
          <p>{review.comment}</p>
          <p>Created At: {review.createdAt}</p>
          <p>Seller Rating Name: {review.seller_rating_name}</p>
          <p>Rating By: {review.rating_by_name}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  reviewContainer: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "10px 0",
    width: 300,
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
};

export default ShopReviewPage;
