//Contact.js
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { useState } from "react";

function Contact() {
  const [faqVisible, setFaqVisible] = useState(Array(3).fill(false));

  const faqs = [
    {
      question: "Q : ฉันสามารถลงขายรองเท้าอย่างไร?",
      answer: "A : วิธีลงขายรองเท้าสามารถทำตามขั้นตอนได้ ดังนี้",
      steps: [
        "ทำการยืนยันตัวตน โดยการไปที่หน้า Profile และกดปุ่ม Edit Profile",
        "ใส่ข้อมูลในส่วนการยืนยันตัวตนให้ถูกต้องและครบถ้วน",
        "รอรับการอนุมัติจาก admin ภายใน 48 ชั่วโมง",
        "หลังได้รับการยืนยันตัวตนแล้ว สามารถสร้างโพสขายสินค้าได้โดยการกดปุ่ม Post sell ในหน้า Profile",
        "ใส่รายละเอียดสินค้าให้ครบถ้วน และกดยืนยัน หลังจากนั้น รอ admin อนุมัติการลงขายสินค้าภายใน 2 วัน",
      ],
    },
    {
      question: "Q : ทำไมการยืนยันตัวตนของฉันถึงถูกปฏิเสธ?",
      answer: "A : การยืนยันตัวตนถูกปฏิเสธนั้นมีหลายสาเหตุ เช่น",
      steps: [
        "ข้อมูลในส่วนของการยืนยันไม่ถูกต้อง หรือไม่มีความน่าเชื่อถือ",
        "มีการปลอมแปลงข้อมูล หรือจงใจใช้ข้อมูลเท็จ ซึ่งหากตรวจสอบแล้วพบว่าเจตนา บัญชีของคุณอาจจะถูกแบนชั่วคราวได้",
        "โปรดตรวจสอบข้อมูลและกฏเกณฑ์ของการยืนยันตัวตนให้ครบถ้วน เพื่อให้มั่นใจว่าไม่มีสิ่งผิดพลาดเกิดขึ้น",
        "หากมั่นใจว่าข้อมูลการยืนยันของคุณถูกต้องแล้ว แต่ยังถูกปฏิเสธการยืนยันตัวตน โปรดติดต่อสอบถาม admin โดยตรง",
      ],
    },
    {
      question: "Q : อื่นๆ",
      answer: "A : <3",
      steps: ["", "", ""],
    },
  ];

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <div style={{ flex: 1 }}>
        <h1 className="text-xl font-bold mt-10 mb-10 text-center">
          How can we help?
        </h1>
        <div className="ml-10 mt-5">
          <p className="mb-5 font-semibold text-lg">คำถามที่พบบ่อย 🤔 </p>
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  const newFaqVisible = [...faqVisible];
                  newFaqVisible[index] = !newFaqVisible[index];
                  setFaqVisible(newFaqVisible);
                }}
                className="hover:bg-yellow-200 font-bold py-2 px-4 rounded mb-2 mt-4"
              >
                {faq.question} {faqVisible[index] ? "▲" : "▼"}
              </button>
              {faqVisible[index] && (
                <div className="ml-4">
                  <p>{faq.answer}</p>
                  <ol className="list-decimal pl-6 mt-2 ml-3">
                    {faq.steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
