import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReviewContext } from "../contexts/ShopRatingContext";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import conf from "../config/main";

const ShopReviewPage = () => {
  const { reviews } = useContext(ReviewContext);
  const { sellerName, sellerId } = useParams();
  const [sellerData, setSellerData] = useState(null);

  const apiUrl = conf.apiUrlPrefix+"/users"/sellerId+"?populate=Profile_Picture";
  const apiUrl1 = conf.urlPrefix;

  // Filter reviews based on sellerName
  const filteredReviews = reviews.filter(
    (review) => review.seller_rating_name === sellerName
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setSellerData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const totalReviews = filteredReviews.length;

  const totalRating = filteredReviews.reduce((acc, cur) => acc + cur.score, 0);
  const averageRating = totalRating / totalReviews;

  const starCounts = Array.from({ length: 5 }, (_, index) => {
    const count = filteredReviews.filter(
      (review) => review.score === index + 1
    ).length;
    return count;
  });

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col items-center">
        <div className=" w-[80%]">
          <div className="bg-white rounded-3xl">
            <div className="flex items-center">
              {sellerData && (
                <div>
                  <div className=" ml-32 mx-8 my-5 rounded-full overflow-hidden w-40 h-40">
                    <img
                      className=" w-full h-full object-cover"
                      src={apiUrl1 + sellerData.Profile_Picture.url}
                      alt={sellerData.username}
                    />
                  </div>
                </div>
              )}
              <div>
                <h4 className="font-medium  text-xl">
                  Shop {sellerData ? sellerData.username : ""}
                </h4>
                <h1 className="font-medium  text-lg">
                  Bio {sellerData ? sellerData.Bio : ""}
                </h1>
                <h1 className="font-medium  text-lg">
                  Address {sellerData ? sellerData.Address : ""}
                </h1>
                <h1 className="font-medium  text-lg">
                  PhoneNumber {sellerData ? sellerData.PhoneNum : ""}
                </h1>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center">
                <h1 className=" mb-2">Feedback ratings</h1>
                <span className="flex items-center gap-4 rounded text-xs text-slate-500">
                  <span
                    className=" mb-2 flex gap-1 text-amber-400"
                    role="img"
                    aria-label={`Rating: ${averageRating.toFixed(1)} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        color={
                          index < Math.round(averageRating)
                            ? colors.orange
                            : colors.grey
                        }
                        size={32}
                      />
                    ))}
                  </span>
                  <span>{averageRating.toFixed(1)} out of 5</span>
                </span>

                <span className="text-xs leading-6 text-slate-500">
                  based on {totalReviews} user ratings
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className=" flex w-[60%] flex flex-col items-center ">
                  {starCounts.map((count, index) => (
                    <span
                      className="flex w-full items-center gap-2"
                      key={index}
                    >
                      <label
                        id={`star-label-${index}`}
                        htmlFor={`star-${index}`}
                        className="mb-0 w-9 shrink-0 text-bold text-center text-xs text-slate-700"
                      >
                        {index + 1} star
                      </label>
                      <progress
                        aria-labelledby={`star-label-${index}`}
                        id={`star-${index}`}
                        max="100"
                        value={(count / totalReviews) * 100}
                        className="block h-3 w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-amber-400 [&::-moz-progress-bar]:bg-amber-400"
                      >
                        {`${(count / totalReviews) * 100}%`}
                      </progress>
                      <span className="w-9 text-xs font-bold text-slate-700">
                        {count}
                      </span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <h1 className="text-xl">Seller feedback ( {totalReviews} ) </h1>

            {filteredReviews.map((review, index) => (
              <div key={index}>
                <p className="font-medium text-lg ">{review.rating_by_name}</p>
                <h>{new Date(review.createdAt).toLocaleString()}</h>
                <div className="flex flex-row ">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      color={index < review.score ? colors.orange : colors.grey}
                      size={22}
                    />
                  ))}
                </div>
                <p className="text-base mb-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopReviewPage;
