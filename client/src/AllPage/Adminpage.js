import '../app.css';
import Footer from '../Component/Footer';
import Header from "../Component/Header";
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function Admin(){
    const [ListShoes,setListShoes] = useState("")
    
    useEffect(() => {
        fetchList();
      }, []);
    const fetchList = async() =>{
        try{
            const response = await axios.get('api/payments?populate=*',{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
                },
            });
            console.log("🚀 ~ fetchList ~ response:", response)
        }catch(error) {
            console.error("Error fetching shoes:", error);
        }
    }
    
    
    return(
        <div className="flex flex-col w-full h-screen backgroundAll">
            <Header/>
            <div className='flex w-full h-full justify-center mt-10 '>
                <div className='flex flex-col bg-slate-200 w-[80%] rounded-3xl shadow-2xl opacity-90'>
                    <div className='text-slate-600 h-20 p-5 text-xl font-bold'>
                        <p className=''>confirmation</p>
                    </div>
                    <div className='text-slate-600  p-5 text-lg'>
                        <p className=''>confirmation</p>
                    </div>
                    <div className='text-slate-600  p-5 text-lg'>
                        <p className=''>confirmation</p>
                    </div>
                    <div className='text-slate-600  p-5 text-lg'>
                        <p className=''>confirmation</p>
                    </div>
                    <div className='text-slate-600  p-5 text-lg'>
                        <p className=''>confirmation</p>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}