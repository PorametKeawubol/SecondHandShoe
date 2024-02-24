//ToRate.js
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'; 
import './css/ToRate.css';

function ToRate(props) {
    const [rating, setRating] = useState(0); //เก็บคะแนน

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        // เอาคะแนนไปใช้ต่อ
        console.log("Submitted rating:", rating);
        // จบ Modal
        props.onClose();
    };

    const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    };

    return (
        <div className="modal" onClick={handleOutsideClick}>
            <div className="modal-content">
                <span className="close" onClick={props.onClose}>&times;</span>
                <h2 style={{textAlign:'center'}}>Rating our app</h2>
                <div className="rating-container">
                    {[...Array(5)].map((_, index) =>
                        index < rating ? (
                            <AiFillStar key={index} onClick={() => handleStarClick(index)} />
                        ) : (
                            <AiOutlineStar key={index} onClick={() => handleStarClick(index)} />
                        )
                    )}
                </div>
                <button onClick={handleSubmit} 
                style={{
                border: '2px solid #000',
                padding: '6px 12px', 
                borderRadius: '4px',
                fontSize: '18px',
                transform: 'scale(0.9)'
                }}>Submit</button>
            </div>
        </div>
    );
}

export default ToRate;
