import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselBar = () => {
    return (
        <Carousel
            interval={2000}
            autoPlay={true}
            className="w-[90%] drop-shadow-md"
        
            showThumbs={false}
        >
            <div>
                <img src="PictureforShow/2.jpg" />
            </div>
            <div>
                <img src="PictureforShow/1.jpg" />
            </div>
            <div>
                <img src="PictureforShow/3.jpg" />
            </div>
        </Carousel>
    )
}

export default CarouselBar;
