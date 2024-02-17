import React from "react";
import { useState, useEffect,useContext  } from "react";
import axios from "axios";
import Header from "../Component/Header";
import Nav from "../Component/nav";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from '../Component/Shoe';
axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { shoes } = useContext(ShoeContext);
  console.log(shoes);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NjYwNjAxLCJleHAiOjE3MTAyNTI2MDF9.KXflgepIDpSvKlFCw3ajAeiDX7zizpYa1h4z1pI2GKc";

  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  

  // get only men's and women's clothing category
  const filteredShoes = shoes.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing" || item.category === "jewelery"
    );
  });

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        
      </div>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
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
