import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState } from 'react';

function Contact() {
    const [faqVisible, setFaqVisible] = useState(Array(3).fill(false));

    const faqs = [
        {
            question: 'Q : สามารถลงขายรองเท้าอย่างไร?',
            answer: 'A : วิธีลงขายรองเท้าสามารถทำตามขั้นตอนได้ ดังนี้',
            steps: [
                'ทำการยืนยันตัวตน โดยการไปที่หน้า profile และทำการกดยืนยันตัวตน',
                'ใส่ข้อมูลการยืนยันตัวตนให้ครบถ้วน และรอรับการอนุมัติจาก admin ภายใน 24 ชั่วโมง',
                'หลังได้รับการยืนยันตัวตนแล้ว สามารถสร้างโพสขายสินค้าได้โดยกดไปที่หน้า post sell ในหน้า profile',
                'ใส่รายละเอียดสินค้าให้ครบถ้วน และกดยืนยัน เป็นอันเสร็จสิ้น'
            ]
        },
        {
            question: 'Q : อื่นๆ',
            answer: 'A : ...',
            steps: [
                '...',
                '...',
                '...'
            ]
        },
    ];

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />
            <div style={{ flex: 1 }}>
                <h1 className="text-xl font-bold mt-10 mb-10 text-center">How can we help?</h1>
                <div className="ml-10 mt-5">
                    <p className="mb-5 font-semibold text-lg">คำถามที่พบบ่อย 🤔 </p>
                    {faqs.map((faq, index) => (
                        <div key={index}>
                            <button onClick={() => {
                                const newFaqVisible = [...faqVisible];
                                newFaqVisible[index] = !newFaqVisible[index];
                                setFaqVisible(newFaqVisible);
                            }} className="hover:bg-yellow-200 font-bold py-2 px-4 rounded mb-2 mt-4">
                                {faq.question} {faqVisible[index] ? '▲' : '▼'}
                            </button>
                            {faqVisible[index] &&
                                <div className="ml-4">
                                    <p>{faq.answer}</p>
                                    <ol className="list-decimal pl-6 mt-2 ml-3">
                                        {faq.steps.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact;
