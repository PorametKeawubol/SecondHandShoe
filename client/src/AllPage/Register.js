import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Register({ toggleModal, toggleLoginModal, onLogin }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, toggleModal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: firstname,
          First_Name: firstname,
          Last_Name: lastname,
          email: email,
          password: password,
        }
      );

      const token = response.data.jwt;
      localStorage.setItem("authToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      console.log("Registration successful");
      console.log(response.data);

      toggleModal();
      onLogin();
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message[0].messages[0].message);
      } else {
        setError("An error occurred while register.");
      }
    }
  };

  const handleLoginClick = () => {
    toggleLoginModal();
    toggleModal();
  };

  return (
    <div className="fixed inset-0 z-10 w-full h-full bg-opacity-80  overflow-y-auto bg-[#302b63]  flex justify-center items-center">
      <div
        ref={modalRef}
        className=" bg-white  rounded-2xl shadow-md  flex flex-col items-center"
      >
        <div className="flex  w-full h-full  rounded-lg  shadow-lg dark:bg-neutral-800  ">
          {/* Left column container */}
          <div className="px-4 py-4">
            <div className="">
              {/* Logo */}
              <div className="text-center">
                <img
                  className="mx-auto w-20"
                  src="/PictureforShow/logoSecondHand.png"
                  alt="logo"
                />
                <h1 className="text-xl font-semibold">SHOE SECOND HAND</h1>
              </div>
              <form>
                <p className="text-center mb-4 mt-3">
                  Please Registration to your account
                </p>
                <div className="flex mb-4">
                  <div className="relative flex-1 mr-2 bg-white rounded-lg border-black border-2">
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput1"
                      placeholder="Firstname"
                      // เก็บค่า firstname ที่ผู้ใช้ป้อน
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label
                      htmlFor="exampleFormControlInput1"
                      className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary  ${firstname !== "" ? "hidden" : ""}`}
                    >
                      Firstname
                    </label>
                  </div>
                  <div className="relative flex-1 ml-2 bg-white rounded-lg border-black border-2">
                    <input
                      type="text"
                      className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                      id="exampleFormControlInput2"
                      placeholder="Lastname"
                      // เก็บค่า lastname ที่ผู้ใช้ป้อน
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                    <label
                      htmlFor="exampleFormControlInput2"
                      className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary  ${lastname !== "" ? "hidden" : ""}`}
                    >
                      Lastname
                    </label>
                  </div>
                </div>
                <div
                  className="relative mb-4 bg-white rounded-lg border-black border-2"
                  data-twe-input-wrapper-init
                >
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput3"
                    placeholder="Email address"
                    // เก็บค่า email ที่ผู้ใช้ป้อน
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="exampleFormControlInput3"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary ${email !== "" ? "hidden" : ""}`}
                  >
                    Email address
                  </label>
                </div>
                <div
                  className="relative mb-4 bg-white rounded-lg border-black border-2"
                  data-twe-input-wrapper-init
                >
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput4"
                    placeholder="Password"
                    // เก็บค่า password ที่ผู้ใช้ป้อน
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label
                    htmlFor="exampleFormControlInput4"
                    className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary ${password !== "" ? "hidden" : ""}`}
                  >
                    Password
                  </label>
                </div>
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Render error with red text */}
                {/* Submit button */}
                <div className="mb-12 pb-1 pt-1 text-center">
                  <button
                    className="rounded-lg mb-3 inline-block w-full  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    type="button"
                    onClick={handleSubmit}
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                    style={{
                      background:
                        "linear-gradient(to right, #0f0c29, #49428f,  #302b63, #24243e)",
                    }}
                  >
                    SIGN UP
                  </button>
                  <p className="mt-4 text-gray-600">
                    Already Have an Account?
                    <button
                      onClick={handleLoginClick}
                      className="text-blue-500 hover:underline ml-1"
                    >
                      Back to Login
                    </button>
                  </p>
                  <button className="text-blue-500 hover:underline ml-1">
                    Maybe not now
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center  lg:w-6/12 rounded-r-lg">
            <div className="text-white w-full h-full ">
              <img
                src="/PictureforShow/8888.png"
                alt="description_of_image"
                className="mb-4 w-full h-full rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
