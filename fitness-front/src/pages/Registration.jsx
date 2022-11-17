import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Login from "../components/Login";
import Register from "../components/Register";
import regimg from "../images/regimg.svg";

export default function Registration() {
	const [hasAccount, setHasAccount] = useState(false);
	const navigate = useNavigate();
	return (
		<div className="container h-screen flex justify-center mx-auto p-5 lg:p-10">
			<button
				onClick={() => navigate("/")}
				className="text-white bg-grape  focus:ring-4 focus:outline-none focus:ring-creamy font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center absolute left-2 top-2"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
					/>
				</svg>
				Back
			</button>
			<div className="w-1/3 xl:1/4 -mr-12 z-10 h-[93%] self-center bg-grape hidden lg:flex justify-center  rounded-tl-[40px] rounded-tr-[94px] rounded-bl-[43px]">
				<img
					src={regimg}
					className="object-cover self-center w-11/12 xl:w-10/12"
				/>
			</div>
			<div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col justify-center items-center bg-creamy rounded-tr-[104px] rounded-br-[2px] rounded-bl-[78px]">
				<h1 className="font-black text-grape text-5xl">
					{hasAccount ? "Sign In" : "Join Us Now"}
				</h1>
				{hasAccount ? <Login /> : <Register />}
				<div class="flex  w-1/2 my-2 text-sm font-semibold items-center text-gray-800">
					<div class="flex-grow border-t h-px mr-3"></div>
					OR
					<div class="flex-grow border-t h-px ml-3"></div>
				</div>
				<GoogleAuth />
				<p className="text-xs pt-3">
					{!hasAccount ? "Already have " : "Do not have "} an account?{" "}
					<button
						className="text-grape underline"
						onClick={() => setHasAccount(!hasAccount)}
					>
						{" "}
						{!hasAccount ? "Login" : "Register"}{" "}
					</button>
				</p>
			</div>
		</div>
	);
}
