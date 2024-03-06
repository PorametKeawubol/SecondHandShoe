import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import conf from "../config/main";
function Singin({
    toggleModal,
    toggleRegisterModal,
    onLogin,
    checkAuthStatus,
}) {
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
    const handleRegisClick = () => {
        toggleRegisterModal();
        toggleModal();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                conf.apiUrlPrefix+"/auth/local",
                {
                    identifier: email,
                    password: password,
                }
            );

            const token = response.data.jwt;

            sessionStorage.setItem("authToken", token);

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            let response2 = await axios.get(
                conf.apiUrlPrefix+"/users/me?populate=Profile_Picture"
            );
            let profile_picture;
            if (response2.data.Profile_Picture === null) {
                profile_picture = "";
            } else {
                profile_picture =
                    conf.urlPrefix +
                    response2.data.Profile_Picture.url;
            }
            const response3 = await axios.get(conf.apiUrlPrefix+"/users/me?populate=role");

            sessionStorage.setItem("Profile_Picture", profile_picture);
            sessionStorage.setItem("role", response3.data.role.name);

            checkAuthStatus();

            toggleModal();
            onLogin();
            checkAuthStatus();
        } catch (error) {
            console.error("Error:", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message[0].messages[0].message);
            } else {
                setError("Wrong username or password.");
            }
        }
    };

    return (
        <div className="fixed inset-0 z-10 w-full h-full bg-opacity-80  overflow-y-auto bg-[#302b63]  flex justify-center items-center">
            <div
                ref={modalRef}
                className=" bg-white  rounded-2xl shadow-md  flex flex-col items-center"
            >
                <div className="flex  w-full h-full  rounded-lg  shadow-lg dark:bg-neutral-800  ">
                    {/* Left column container */}
                    <div className="px-4 py-4 ">
                        <div className="">
                            {/* Logo */}
                            <div className="text-center">
                                <img
                                    className="mx-auto w-20"
                                    src="/PictureforShow/logoSecondHand.png"
                                    alt="logo"
                                />
                                <h4 className=" text-xl font-semibold">
                                    SHOE SECOND HAND
                                </h4>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <p className="mb-4 text-center">
                                    Please login to your account
                                </p>

                                <div
                                    className="relative mb-4 bg-white rounded-lg border-black border-2"
                                    data-twe-input-wrapper-init
                                >
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        placeholder="Username"
                                    />
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${email !== "" ? "hidden " : ""}peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary`}
                                    >
                                        Email
                                    </label>
                                </div>

                                <div
                                    className="relative mb-4 bg-white rounded-lg border-black border-2"
                                    data-twe-input-wrapper-init
                                >
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="exampleFormControlInput11"
                                        className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary ${password !== "" ? "hidden" : ""}`}
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="h-4">
                                    <p className="text-red-500 text-sm">{error}</p>
                                </div>

                                {/* Submit button */}
                                <div className="mb-12 pb-1 pt-1 text-center ">
                                    <button
                                        className="rounded-lg mb-3 inline-block w-full  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                        type="submit"
                                        data-twe-ripple-init
                                        data-twe-ripple-color="light"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #0f0c29, #49428f,  #302b63, #24243e)",
                                        }}
                                    >
                                        Log in
                                    </button>
                                    <p className="mt-4 text-gray-600">
                                        Don't Have an Account?
                                        <button
                                            onClick={handleRegisClick}
                                            className="text-blue-500 hover:underline ml-1"
                                        >
                                            Register Now
                                        </button>
                                    </p>
                                    <button
                                        onClick={toggleModal}
                                        className="text-blue-500 hover:underline mt-2"
                                    >
                                        Maybe not now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex items-center  lg:w-6/12 rounded-r-lg">
                        <div className=" text-white w-full h-full ">
                            <img
                                src="/PictureforShow/5555.png"
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

export default Singin;
