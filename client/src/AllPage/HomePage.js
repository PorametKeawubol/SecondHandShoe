import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../Component/Header";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from "../Component/Shoe";
import Searchbar from "../Component/Searchbar";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { shoes } = useContext(ShoeContext);
  console.log("🚀 ~ HomePage ~ shoes:", shoes);
  const [filteredShoes, setFilteredShoes] = useState([]);

  //useEffect(() => {
  //  setIsLoading(true);

  //  setTimeout(() => {
  //    setIsLoading(false);
  //  }, 1000);
  //}, []);

  // get only men's and women's clothing category
  useEffect(() => {
    const shoesfiltered = shoes.filter((item) => {
      return (
        item.status == false &&
        item.brandType === "nike" &&
        item.colorType === "black" &&
        item.genderType === "male"
      ); // &&คือ and , ||คือ or
    });
    console.log("🚀 ~ shoesfiltered ~ shoesfiltered:", shoesfiltered);

    setFilteredShoes(shoesfiltered);
  }, [shoes]);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="mt-24">
        <Searchbar />
      </div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mt-5 mb-10 text-center">
            Explore Our Shoes
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredShoes.map((shoe) => {
              return <Shoe shoe={shoe} key={shoe.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
export default HomePage;
