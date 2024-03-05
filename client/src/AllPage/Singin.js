import React from 'react';
function Singin() {
    
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
                                        <h4 className=" text-xl font-semibold">
                                            SHOE SECOND HAND
                                        </h4>
                                    </div>

                                    <form>
                                        <p className="mb-4">Please login to your account</p>

                                        <div className="relative mb-4 bg-white rounded-lg border-black border-2" data-twe-input-wrapper-init>
                                            <input
                                                type="text"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                id="exampleFormControlInput1"
                                                placeholder="Username"xxxx
                                            />
                                            <label
                                                htmlFor="exampleFormControlInput1"
                                                className="  pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem]  peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                            >
                                                Username
                                            </label>

                                        </div>

                                        <div className="relative mb-4 bg-white rounded-lg border-black border-2" data-twe-input-wrapper-init>
                                            <input
                                                type="password"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                id="exampleFormControlInput11"
                                                placeholder="Password"
                                            />
                                            <label
                                                htmlFor="exampleFormControlInput11"
                                                className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:-translate-x-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                            >
                                                Password
                                            </label>
                                        </div>

                                        {/* Submit button */}
                                        <div className="mb-12 pb-1 pt-1 text-center ">
                                            <button
                                                className="rounded-lg mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                type="button"
                                                data-twe-ripple-init
                                                data-twe-ripple-color="light"
                                                style={{
                                                    background: 'linear-gradient(to right, #0f0c29, #49428f,  #302b63, #24243e)',
                                                }}
                                            >
                                                Log in
                                            </button>
                                            <p className="mt-4 text-gray-600">
                                                Don't Have an Account?
                                                <button
                                                    className="text-blue-500 hover:underline ml-1"
                                                >
                                                    Register Now
                                                </button>
                                            </p>
                                            <button
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
                                        src="PictureforShow/5555.png"
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

export default Singin;
