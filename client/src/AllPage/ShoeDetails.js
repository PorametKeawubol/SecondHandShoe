import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ShoeContext } from "../contexts/ShoeContext";
import Header from "../Component/Header";
import { GrLocation } from "react-icons/gr";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const ShoeDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { shoes } = useContext(ShoeContext);
  const [slides, setSlides] = useState([]);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const [buttonActive, setButtonActive] = useState(false);

  const toggleAccordion = (index) => {
    setActiveAccordionIndex(activeAccordionIndex === index ? null : index);
    setButtonActive(!buttonActive); // เปลี่ยนสถานะการกดปุ่ม
  };

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

  const {
    products_name,
    price,
    details,
    location,
    Seller,
    brandType,
    colorType,
    genderType,
    size,
  } = shoe;

  const accordions = [
    { title: "Product Detail", content: details },
    {
      title: "Size Guide",
      content: (
        <img
          src="https://cdn.shopify.com/s/files/1/0375/9970/7276/files/AA_Ladies-Mens_Size_Guide_4-02_1_copy.png?v=1588664040"
          alt="Size Guide"
        />
      ),
    },
    {
      title: "Delivery",
      content:
        "การจัดส่งแบบธรรมดาจะใช้เวลา 3-5 วันทำการ (ยกเว้นวันหยุดนักขัตฤกษ์)   ฟรีค่าจัดส่งทั่วประเทศ",
    },
  ];

  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen ">
      <Header />
      <nav class="flex items-center justify-center " aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {/* SVG path here */}
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div class="flex items-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                Shoes
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg
                class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                {products_name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
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
            <h1 className="text-[26px] text-gray-500 font-medium max-w-[450px] mx-auto lg:mx-0">
              {brandType}
            </h1>
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {products_name}
            </h1>
            <h1 className="text-[16px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              สถานะของสินค้า : สินค้าพร้อมส่ง
            </h1>
            <div class="border-t border-1 border-black flex-grow"></div>
            <div className="text-[30px] text-red-500 font-medium mb-2">
              {price} THB
            </div>
            <div className="text-2xl text-black-500 font-medium mb-2">
              ลงขายโดย : {Seller}
            </div>
            <h1 className="text-[20px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              Size : {size} US
            </h1>
            <h1 className="text-[20px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              Gender Size : {genderType}
            </h1>
            <h1 className="text-[20px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              Color : {colorType}
            </h1>
            <p className="mb-9 flex items-center">
              <GrLocation />
              <span className="text-[20px]"> Location : {location}</span>
            </p>

            <button
              onClick={() => addToCart(shoe, shoe.id)}
              className="bg-black py-4 px-8 text-white"
            >
              Add to cart
            </button>
            <Link to={`/Payment/${id}`}>
              <button className="bg-red-600 py-4 px-8 ml-6 text-white">
                Buy now
              </button>
            </Link>
            <div className="mt-9">
              {accordions.map((accordion, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`text-lg font-medium focus:outline-none py-2 ${buttonActive ? "text-black" : ""}`}
                    >
                      {accordion.title}
                    </button>
                    <button
                      onClick={() => toggleAccordion(index)}
                      className={`text-lg font-medium focus:outline-none py-2 ${buttonActive ? "text-black" : ""}`}
                    >
                      {activeAccordionIndex === index ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </button>
                  </div>
                  {activeAccordionIndex === index && (
                    <div className="mt-2">
                      <p>{accordion.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoeDetails;
