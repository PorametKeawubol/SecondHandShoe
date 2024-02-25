import { useState,useContext } from "react";
import { ShoeContext } from "../contexts/ShoeContext";

function Searchbar({onnewfilter}) {
     const { shoes } = useContext(ShoeContext);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [isDropdownOpenBrand, setIsDropdownOpenBrand] = useState(false);
     const [isDropdownOpenColor, setIsDropdownOpenColor] = useState(false);
     const [isDropdownOpenGender, setIsDropdownOpenGender] = useState(false);
     const [brand, setbrand] = useState("all");
     const [color, setcolor] = useState("all");
     const [gender, setgender] = useState("all");
     //item.category === "male" || item.category === "woman" || item.category === "Nike"

     const toggleDropdown = () => {
          setIsDropdownOpen(!isDropdownOpen);
          setIsDropdownOpenBrand(false);
          setIsDropdownOpenColor(false);
          setIsDropdownOpenGender(false);
     };
     const toggleDropdownBrand = () => {
          setIsDropdownOpenBrand(!isDropdownOpenBrand);
          setIsDropdownOpenColor(false);
          setIsDropdownOpenGender(false);
     };
     const toggleDropdownColor = () => {
          setIsDropdownOpenColor(!isDropdownOpenColor);
          setIsDropdownOpenBrand(false);
          setIsDropdownOpenGender(false);
     };
     const toggleDropdownGender = () => {
          setIsDropdownOpenGender(!isDropdownOpenGender);
          setIsDropdownOpenColor(false);
          setIsDropdownOpenBrand(false);
     };
     const handleSearch = () => {
        const shoesFiltered = shoes.filter((item) => {
            if (brand === "all" && color === "all" && gender === "all") {
                return (
                    item
                );
            } else if (brand === "all" && color !== "all" && gender !== "all") {
                return (
                    item.colorType === color &&
                    item.genderType === gender
                );
            } else if (brand !== "all" && color === "all" && gender !== "all") {
                return (
                    item.brandType === brand &&
                    item.genderType === gender
                );
            } else if (brand !== "all" && color !== "all" && gender === "all") {
                return (
                    item.brandType === brand &&
                    item.colorType === color
                );
            } else if (brand === "all" && color === "all" && gender !== "all") {
                return (
                    item.genderType === gender
                );
            } else if (brand !== "all" && color === "all" && gender === "all") {
                return (
                    item.brandType === brand
                );
            } else if (brand === "all" && color !== "all" && gender === "all") {
                return (
                    item.colorType === color
                );
            } else{
                return (
                    item.brandType === brand &&
                    item.colorType === color &&
                    item.genderType === gender
                );
            }
        });
        console.log("🚀 ~ handleSearch ~ shoesFiltered:", shoesFiltered)
        onnewfilter(shoesFiltered)
        
     };
        
     const brandClick = (b) => {
          setbrand(b);
     };
     const colorClick = (c) => {
          setcolor(c);
     };
     const genderClick = (g) => {
          setgender(g);
     };
     return (
          <form class="max-w-lg mx-auto">
               <div class="flex">
                    <label
                         for="search-dropdown"
                         class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                    </label>
                    <div className="flex flex-col">
                         <button
                              id="dropdown-button"
                              onClick={toggleDropdown}
                              class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                              type="button"
                         >
                              categories{""}
                              <svg
                                   class="w-2.5 h-2.5 ms-2.5"
                                   aria-hidden="true"
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 10 6"
                              >
                                   <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                   />
                              </svg>
                         </button>
                         <div
                              id="dropdown"
                              className={`z-10 ${
                                   isDropdownOpen ? "" : "hidden"
                              } bg-white divide-y divide-gray-100 rounded-lg drop-shadow-lg w-44 dark:bg-gray-700`}
                         >
                              <ul
                                   class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                   aria-labelledby="dropdown-button"
                              >
                                   <li>
                                        <div className="flex flex-row">
                                             <button
                                                  onClick={toggleDropdownBrand}
                                                  type="button"
                                                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                             >
                                                  <div className="mr-10 w-11">
                                                       brand
                                                  </div>
                                                  <h className="text-slate-400">
                                                       {brand}
                                                  </h>
                                             </button>
                                             <div
                                                  id="dropdownBrand"
                                                  className={`z-30 ${
                                                       isDropdownOpenBrand
                                                            ? ""
                                                            : "hidden"
                                                  } absolute bg-white divide-y divide-gray-100 rounded-lg drop-shadow-lg ml-44 w-44 border-none dark:bg-gray-700`}
                                             >
                                                  <ul
                                                       class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                       aria-labelledby="dropdown-button"
                                                  >
                                                       <li>
                                                            <button
                                                                 onClick={() => {brandClick("nike");}}
                                                                 type="button"
                                                                 class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 nike
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {brandClick("adidas");}}
                                                                 type="button"
                                                                 class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 adidas
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {brandClick("unknown");}}
                                                                 type="button"
                                                                 class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 unknown
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {brandClick("all");}}
                                                                 type="button"
                                                                 class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 all
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </li>
                                   <li>
                                        <div className="flex flex-row">
                                             <button
                                                  onClick={toggleDropdownColor}
                                                  type="button"
                                                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                             >
                                                <div className="mr-10 w-11">
                                                    color
                                                </div>
                                                <h className="text-slate-400">
                                                    {color}
                                                </h>
                                             </button>
                                             <div
                                                  id="dropdownColor"
                                                  className={`z-30 ${
                                                       isDropdownOpenColor
                                                            ? ""
                                                            : "hidden"
                                                  } absolute bg-white divide-y divide-gray-100 rounded-lg drop-shadow-lg ml-44 w-44 border-none dark:bg-gray-700`}
                                             >
                                                  <ul
                                                       class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                       aria-labelledby="dropdown-button"
                                                  >
                                                       <li>
                                                            <button onClick={() => {colorClick("white");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 white
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("black");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 black
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("blue");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 blue
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("pink");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 pink
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("green");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 green
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("gray");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 gray
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("yellow");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 yellow
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("red");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 red
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("purple");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 purple
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("orange");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 orange
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button onClick={() => {colorClick("all");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                 all
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </li>
                                   <li>
                                        <div className="flex flex-row">
                                             <button
                                                  onClick={toggleDropdownGender}
                                                  type="button"
                                                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                             >
                                                <div className="mr-10 w-11">
                                                    gender
                                                </div>
                                                <h className="text-slate-400">
                                                    {gender}
                                                </h>
                                             </button>
                                             <div
                                                  id="dropdownBrand"
                                                  className={`z-30 ${
                                                       isDropdownOpenGender
                                                            ? ""
                                                            : "hidden"
                                                  } absolute bg-white divide-y divide-gray-100 rounded-lg drop-shadow-lg ml-44 w-44 border-none dark:bg-gray-700`}
                                             >
                                                  <ul
                                                       class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                                       aria-labelledby="dropdown-button"
                                                  >
                                                       <li>
                                                            <button
                                                                 onClick={() => {genderClick("male");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 male
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {genderClick("female");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 female
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {genderClick("child");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 child
                                                            </button>
                                                       </li>
                                                       <li>
                                                            <button
                                                                 onClick={() => {genderClick("all");}} type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                 all
                                                            </button>
                                                       </li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </li>
                                   <li>
                                        <button
                                             onClick={handleSearch}
                                             type="button"
                                             class="inline-flex text-blue-700 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                             Find now
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke-width="1.5"
                                                  stroke="currentColor"
                                                  class="w-6 h-6 ml-6"
                                             >
                                                  <path
                                                       stroke-linecap="round"
                                                       stroke-linejoin="round"
                                                       d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                  />
                                             </svg>
                                        </button>
                                   </li>
                              </ul>
                         </div>
                    </div>

                    <div class="relative w-full">
                         <input
                              type="search"
                              id="search-dropdown"
                              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                              placeholder="Brand, color, gender, name....."
                         />
                         <button
                              onClick={handleSearch}
                              type="submit"
                              class="absolute top-0 end-0 p-2.5 text-sm font-medium  text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                         >
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke-width="1.5"
                                   stroke="currentColor"
                                   class="w-5 h-5"
                              >
                                   <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                   />
                              </svg>

                              <span class="sr-only">Search</span>
                         </button>
                    </div>
               </div>
          </form>
     );
}

export default Searchbar;
