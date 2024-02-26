import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../Component/Header";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from "../Component/Shoe";
import Searchbar from "../Component/Searchbar";
import CarouselBar from "../Component/CarouselBar";
import Footer from "../Component/Footer";
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { shoes } = useContext(ShoeContext);
  const [filteredShoes, setFilteredShoes] = useState([]);
  //useEffect(() => {
  //  setIsLoading(true);

  //  setTimeout(() => {
  //    setIsLoading(false);
  //  }, 1000);
  //}, []);

  // get only men's and women's clothing category

  const newfilter = (filtered) => {
    setFilteredShoes(filtered)
  }
  useEffect(() => {
    const shoesfiltered = shoes.filter((item) => {
      return (
        item.status === false
      ); // &&คือ and , ||คือ or
    });
    setFilteredShoes(shoesfiltered);
  }, [shoes]);

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="mt-28">
        <Searchbar onnewfilter={newfilter} />
      </div>
      <div className="flex justify-center mt-10 mb-1"> {/* ใช้ flex justify-center เพื่อจัดให้อยู่ตรงกลาง */}
        <CarouselBar />
      </div>


      <section className="py-100">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mt-5 mb-10 text-center">
            Explore Our Shoes
          </h1>
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredShoes.map((shoe) => {
              return <Shoe shoe={shoe} key={shoe.id} />;
            })}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
    
  );
}
export default HomePage;
