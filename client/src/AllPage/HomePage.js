import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../Component/Header";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from "../Component/Shoe";
import Searchbar from "../Component/Searchbar";
import CarouselBar from "../Component/CarouselBar";
import Footer from "../Component/Footer";
import TitleHome from "../Component/TitleHome";
import conf from "../config/main";
import { SidebarContext } from "../contexts/SidebarContext";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || conf.urlPrefix;

function HomePage() {
    const { handleClose } = useContext(SidebarContext);
    // const [isLoading, setIsLoading] = useState(true);
    const { shoes } = useContext(ShoeContext);
    console.log("🚀 ~ HomePage ~ shoes:", shoes);
    const [filteredShoes, setFilteredShoes] = useState([]);
    //useEffect(() => {
    //  setIsLoading(true);

    //  setTimeout(() => {
    //    setIsLoading(false);
    //  }, 1000);
    //}, []);

    const newfilter = (filtered) => {
        setFilteredShoes(filtered);
    };
    useEffect(() => {
        const shoesfiltered = shoes.filter((item) => {
            return item.payment.data === null; // &&คือ and , ||คือ or
        });
        setFilteredShoes(shoesfiltered);
    }, [shoes]);

    return (
        <div  className="flex flex-col   backgroundAll">
            <Header />
            <div onClick={handleClose}>
                <div className="flex flex-col items-center">
                    <TitleHome />
                </div>
                <div className="flex justify-center mt-10 mb-6">
                    {" "}
                    {/* ใช้ flex justify-center เพื่อจัดให้อยู่ตรงกลาง */}
                    <CarouselBar />
                </div>
                <div className="flex flex-col items-center">
                    <Searchbar onnewfilter={newfilter} />
                </div>

                <section className="py-100">
                    <div className="container mx-auto">
                        <h1 className="text-[20px]   font-bold sm:text-[30px]  mt-5 mb-10  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                            Explore Our Shoes
                        </h1>
                        <div className="grid grid-cols grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px] md:gap-[20px] gap-[20px]">
                            {filteredShoes.map((shoe) => {
                                return <Shoe shoe={shoe} key={shoe.id} />;
                            })}
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
export default HomePage;
