import React, { useState } from 'react';

function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        // ทำงานเมื่อผู้ใช้กดปุ่มลงทะเบียน
    };

    return (
        <section className="h-screen bg-gradient-to-r from-neutral-200 to-neutral-700 dark:from-neutral-700 dark:to-neutral-800">
            <div className="container h-auto p-10">
                <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-[50%] h-[60%] ">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800 lg:flex lg:flex-wrap ">
                            {/* Left column container */}
                            <div className="px-4 md:px-0 lg:w-6/12">
                                <div className="md:p-6 md:p-12">
                                    {/* Logo */}
                                    <div className="text-center">
                                        <img
                                            className="mx-auto w-20"
                                            src="PictureforShow/logoSecondHand.png"
                                            alt="logo"
                                        />
                                        <h1 className="text-xl font-semibold">
                                            SHOE SECOND HAND
                                        </h1>
                                    </div>
                                    <form>
                                        <p className="text-center mb-4 mt-3">Please Registration to your account</p>

                                        <div className="flex mb-4">
                                            <div className="relative flex-1 mr-2 bg-white rounded-lg border-black border-2">
                                                <input
                                                    type="text"
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="exampleFormControlInput1"
                                                    placeholder="Firstname"
                                                    // เก็บค่า firstname ที่ผู้ใช้ป้อน
                                                    value={firstname}
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                />
                                                <label
                                                    htmlFor="exampleFormControlInput1"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
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
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                                >
                                                    Lastname
                                                </label>
                                            </div>
                                        </div>

                                        <div className="relative mb-4 bg-white rounded-lg border-black border-2" data-twe-input-wrapper-init>
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
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                            >
                                                Email address
                                            </label>
                                        </div>

                                        <div className="relative mb-4 bg-white rounded-lg border-black border-2" data-twe-input-wrapper-init>
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
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                            >
                                                Password
                                            </label>
                                        </div>

                                        {/* Submit button */}
                                        <div className="mb-12 pb-1 pt-1 text-center">
                                            <button
                                                className="rounded-lg mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                type="button"
                                                onClick={handleRegister}
                                                data-twe-ripple-init
                                                data-twe-ripple-color="light"
                                                style={{
                                                    background: 'linear-gradient(to right, #0f0c29, #49428f,  #302b63, #24243e)',
                                                }}
                                            >
                                                SIGN UP
                                            </button>
                                            <p className="mt-4 text-gray-600">
                                                Already Have an Account?
                                                <button className="text-blue-500 hover:underline ml-1">Back to Login</button>
                                            </p>
                                            <button  className="text-blue-500 hover:underline ml-1">Maybe not now</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="flex items-center  lg:w-6/12 rounded-r-lg">
                                <div className="text-white w-full h-full ">
                                    <img
                                        src="PictureforShow/8888.png"
                                        alt="description_of_image"
                                        className="mb-4 w-full h-full rounded-r-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
