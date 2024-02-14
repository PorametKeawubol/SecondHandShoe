import React from 'react';
import ListShoes from './Component/Home/LIstShoes';
import { useState,useEffect } from 'react';
import axios from "axios"
import Header from './Component/Header'
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:1337"
function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [Data, setData] = useState([]);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NjYwNjAxLCJleHAiOjE3MTAyNTI2MDF9.KXflgepIDpSvKlFCw3ajAeiDX7zizpYa1h4z1pI2GKc";
    
    useEffect(()=>{
        setIsLoading(true)
        getData()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)

    },[])

    const getData = async () => {
        try {
          const response = await axios.get(`/api/shoes?populate=picture`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setData(response.data.data.map(d => ({
            id: d.id,
            attributes: d.attributes,
            products_name: d.attributes.products_name,
            details:d.attributes.details,
            price:d.attributes.price,
            location: d.attributes.location,
            picture:d.attributes.picture.data
        }
        )));
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
    };
    console.log(Data)
    const shoes = {
        id : ""
    };


    return (
        <>
            {isLoading ? <div class='size-full place-content-center '>Loading....</div> :
                <div>
                    <Header/>
                    <p>Hello word</p>
                    <ListShoes data={Data}/>
                </div>
            }
            
        </>
    );
}

export default HomePage;