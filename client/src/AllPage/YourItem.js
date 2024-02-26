import { useContext, useState, useEffect } from "react";
import { ShoeContext } from "../contexts/ShoeContext";
import axios from "axios";

function YourItem() {
     const { shoes } = useContext(ShoeContext);
     const [MyShoes, setMyShoes] = useState();
     console.log("🚀 ~ YourItem ~ MyShoes:", MyShoes);

     useEffect(() => {
          const fetchUserData = async () => {
               try {
                    const response = await axios.get(
                         "http://localhost:1337/api/users/me",
                         {
                              headers: {
                                   Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                              },
                         }
                    );

                    const userData = response.data;
                    setMyShoes(fetchMyShoes(shoes, userData.username));
               } catch (error) {
                    console.error("Error fetching user data:", error);
               }
          };
          fetchUserData();
     }, [shoes]);

     const fetchMyShoes = (shoes, username) => {
          return shoes.filter((item) => {
               return item.Seller === username;
          });
     };
     return <div></div>;
}
export default YourItem;
