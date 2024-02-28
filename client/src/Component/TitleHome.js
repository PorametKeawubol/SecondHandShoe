import { Carousel } from "react-responsive-carousel";
import { useState, useContext, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import Shoe from "../Component/Shoe";

export default function TitleHome() {
    const [filteredShoes, setFilteredShoes] = useState([]);
    const { shoes } = useContext(ShoeContext);

    useEffect(() => {
        const shoesfiltered = shoes.filter((item) => {
            return item.status === false; // &&คือ and , ||คือ or
        });
        setFilteredShoes(shoesfiltered);
    }, [shoes]);

    return (
        <div className="flex flex-col md:flex-row justify-center bg-neutral-100 text-black w-[80%]   my-6 rounded-3xl bg-opacity-70 drop-shadow-2xl">
            <div className="w-[full] p-10 flex flex-col md:justify-center">
                <h1 className="drop-shadow-lg max-w-[600px] text-center font-bold md:text-[30px] sm:text-[25px] text-[20px] mb-2  bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    Explore Our Shoes
                </h1>
                <h1 className="drop-shadow-lg w-full text-center">
                    Find the shoes you like with us.
                </h1>
                {/* <h1 className=" sm:hidden mb-4">
                    ยินดีต้อนรับสู่เว็บไซต์ของเราที่เป็นสวรรค์สำหรับคนรักรองเท้า!
                    ที่นี่เรามีสวนสวยๆ
                    ที่เต็มไปด้วยรองเท้ามือสองที่หลากหลายสไตล์ และแบรนด์ชั้นนำ
                    ทุกคู่รองเท้าที่เรามีจะนำเข้ามาอย่างดีเยี่ยมและให้คุณมั่นใจว่าคุณจะได้รับสินค้าคุณภาพที่สมบูรณ์แบบทุกครั้ง
                    นอกจากนี้
                    เรายังเปิดโอกาสให้กับผู้ใช้ทุกคนที่มีความสนใจในการขายรองเท้าของตนเองด้วย!
                    ไม่ว่าจะเป็นรองเท้าใหม่หรือมือสอง
                    ทุกคู่รองเท้าที่นำเสนอจะได้รับการตรวจสอบและรับรองว่ามีคุณภาพเพื่อให้คุณและผู้ซื้อได้มั่นใจในการทำธุรกรรม
                </h1> */}
            </div>

            {/* <div className="flex justify-center opacity-85 mt-10  text-white">
                <Carousel
                    interval={2000}
                    autoPlay={true}
                    className="w-[300px] drop-shadow-md flex"
                    showThumbs={false}
                >
                    {filteredShoes.map((shoe) => {
                        return <Shoe shoe={shoe} key={shoe.id} />;
                    })}
                </Carousel>
            </div> */}
        </div>
    );
}
