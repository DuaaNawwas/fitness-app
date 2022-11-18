import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import { FcGoogle } from "react-icons/fc";

import { useGoogleLogin } from "@react-oauth/google";

export default function Register() {
	const { user, setUser, setCookie } = useContext(AuthContext);
	const [register, setRegister] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		errors: [],
	});

	const navigate = useNavigate();

	const handleInput = (e) => {
		e.persist();
		setRegister({ ...register, [e.target.name]: e.target.value });
	};

	const handleRegistration = (e) => {
		e.preventDefault();

		const data = {
			name: register.name,
			email: register.email,
			password: register.password,
			password_confirmation: register.password_confirmation,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/register", data).then((res) => {
				if (res.data.status === "Request was successfull.") {
					console.log(res.data);
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					const token = res.data.data.token;
					setCookie("Token", token, { path: "/" });
					setUser({ ...user, name, email });
					navigate("/", { replace: true });
				} else {
					console.log(res);
					setRegister({ ...register, errors: res.data.errors });
				}
			});
		});
	};

	return (
		<>
			<form
				className="flex flex-col gap-1 pt-10 w-7/12"
				onSubmit={handleRegistration}
			>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Your name" />
					</div>
					<TextInput
						id="name"
						type="name"
						required={true}
						shadow={true}
						name="name"
						value={register?.name}
						onChange={handleInput}
					/>
					<small className="text-red-500">{register.errors.name}</small>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email2" value="Your email" />
					</div>
					<TextInput
						id="email2"
						type="email"
						required={true}
						shadow={true}
						name="email"
						value={register?.email}
						onChange={handleInput}
					/>
					<small className="text-red-500">{register.errors.email}</small>
				</div>

				<div>
					<div className="mb-2 block">
						<Label htmlFor="password2" value="Your password" />
					</div>
					<TextInput
						id="password2"
						type="password"
						required={true}
						shadow={true}
						name="password"
						value={register?.password}
						onChange={handleInput}
					/>
					<small className="text-red-500">{register.errors.password}</small>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="repeat-password" value="Repeat password" />
					</div>
					<TextInput
						id="repeat-password"
						type="password"
						required={true}
						shadow={true}
						name="password_confirmation"
						value={register?.password_confirmation}
						onChange={handleInput}
					/>
				</div>

				<button
					type="submit"
					className="focus:outline-none text-white  focus:ring-4 focus:ring-main font-medium rounded-lg text-sm px-5 py-2.5 mb-2 d bg-grape hover:bg-main hover:text-black hover:border-2 hover:border-grape mt-2 box-content"
				>
					Register new account
				</button>
			</form>
			{/* <GoogleLogin
				render={(renderProps) => (
					<button
						type="button"
						className=""
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
					>
						<FcGoogle className="" /> Sign in with google
					</button>
				)}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy="single_host_origin"
			/> */}
			{/* <button onClick={() => login()}>with google</button> */}
		</>
	);
}
