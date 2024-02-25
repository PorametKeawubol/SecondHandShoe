import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ShoeContext } from "../contexts/ShoeContext";
import Header from "../Component/Header";
import { GrLocation } from "react-icons/gr";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const ShoeDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { shoes } = useContext(ShoeContext);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const shoe = shoes.find((item) => item.id === parseInt(id));
    const slidesData = shoe ? shoe.image.map((img) => ({ url: img })) : [];
    setSlides(slidesData);
  }, [id, shoes]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const shoe = shoes.find((item) => item.id === parseInt(id));

  if (!shoe) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  const { products_name, price, details, location, Seller } = shoe;

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="max-w-[840px] h-[840px] w-full m-auto py-16 px-4 relative group">
            {slides.length > 0 && (
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
              ></div>
            )}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {products_name}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-4">
              $ {price}
            </div>
            <div className="text-2xl text-black-500 font-medium mb-1">
              Seller : {Seller}
            </div>
            <p className="mb-1 flex items-center">
              <GrLocation />
              <span className="ml-2">location {location}</span>
            </p>
            <p className="mb-8">{details}</p>
            <button
              onClick={() => addToCart(shoe, shoe.id)}
              className="bg-black py-4 px-8 text-white"
            >
              Add to cart
            </button>
            <button className="bg-red-600 py-4 px-8 ml-6 text-white">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeDetails;
