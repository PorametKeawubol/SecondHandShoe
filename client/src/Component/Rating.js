import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import conf from "../config/main";

const Rating = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const stars = Array(5).fill(0);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    stars: {
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ส่งข้อมูลไปยัง Strapi โดยใช้ axios
    try {
      const response = await axios.post(conf.urlPrefix+"/api/ratings", {
        data: {
          score: currentValue,
          comment: comment,
          seller_rating: 5,
          rating_by: 10,
        },
      });
      console.log(response.data);
      // ล้างข้อมูลหลังจากส่ง
      setCurrentValue(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2> Rate Product </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        placeholder="Share more thoughts on the product to help other buyers."
        style={styles.textarea}
        value={comment}
        onChange={handleCommentChange}
      />

      <button style={styles.button} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Rating;
