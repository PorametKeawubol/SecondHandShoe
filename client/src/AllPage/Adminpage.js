import '../app.css';
import Footer from '../Component/Footer';
import Header from "../Component/Header";
import axios from 'axios';
import { useState,useEffect } from 'react';
import PaymentList from '../Component/PaymentList';

export default function Admin(){
    const [ListShoes,setListShoes] = useState("")
    console.log("🚀 ~ Admin ~ ListShoes:", ListShoes)
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("authToken")}`
    useEffect(() => {
        fetchList();
      }, []);
    const fetchList = async() =>{
        try{
            const response = await axios.get('api/payments?populate=*');
            console.log("🚀 ~ fetchList ~ response:", response)
            if (Array.isArray(response.data.data)){
                const ListData = response.data.data.map((List)=>{
                    const { id, attributes } = List;
                    const{shoe,Buyer,Bill,Confirm}=attributes;
                    const bill = "http://localhost:1337" + Bill.data.attributes.url
                    const shoe_id = shoe.data.id
                    const Buyer_id = Buyer.data.id
                    return({
                        id,bill,Confirm,shoe_id,Buyer_id
                    })
                })
                const filteredListData = ListData.filter((List)=>{
                    return List.Confirm === false
                })
                setListShoes(filteredListData)
            }   
            
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
                    <div>
                        {ListShoes&&ListShoes.map((List)=>{
                            return <PaymentList item={List}/>
                        })}
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}