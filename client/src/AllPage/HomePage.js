import React from "react";
import { useState, useEffect,useContext  } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Nav from "../Component/nav";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from '../Component/Shoe';
import { BsSearch } from "react-icons/bs";


axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { shoes } = useContext(ShoeContext);
  const [filteredShoes, setFilteredShoes] = useState([]);
  console.log("🚀 ~ HomePage ~ shoes:", shoes)
  
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
        item.category === "man" || item.category === "woman" || item.category === "Nike"
      );
    });
    setFilteredShoes(shoesfiltered);
  }, [shoes]);

  const handleSearch = async () => {
    const search = document.getElementById("SearchKey").value;
    console.log(search)
    if (search) {
      try {
        const response = await axios.get(`/api/shoes?filters[products_name][$contains]=${search}`)
        console.log('response=', response)
        if (Array.isArray(response.data.data)) {
          const searchData = response.data.data.map(shoe => {
            const { id, attributes } = shoe;
            const { products_name, price, details, location, picture, } = attributes;
            const imageUrl = picture && picture.data && picture.data.length > 0 ? picture.data[0].attributes.url : null;
            const image = "http://localhost:1337" + imageUrl
            const category = attributes.categories?.data[0]?.attributes?.name ?? 'uncategorized';
            return {
              id,
              products_name,
              price,
              details,
              location,
              image,
              category,
            };
          });
          console.log('search=', searchData)
          const shoesfiltered = searchData.filter((item) => {
            return (
              item.category === "man" || item.category === "woman" || item.category === "Nike"
            );
          });
          setFilteredShoes(shoesfiltered);
          console.log('filter=',filteredShoes)
        } else {
          console.error("Response data is not an array:", response.data.data);
        }
      } catch (error) {
        console.error("Error searching shoes:", error);
      }
    }
  }

    
  return  (
    <div className="flex flex-col">
      <Header />
      <section className="py-20">
        <div className="flex justify-end items-center mr-5 mt-8">
          <input
            type="string" 
            id='SearchKey'
            placeholder=" Search"
            className="block w-40 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <BsSearch className="text-2xl ml-2 justify-center cursor-pointer" onClick={handleSearch}/>
        </div>
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
