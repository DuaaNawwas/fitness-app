import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function Login() {
	const { user, setUser, setCookie } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
		errors: [],
	});

	const handleInput = (e) => {
		e.persist();

		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleLogin = (e) => {
		e.preventDefault();

		const data = {
			email: loginData.email,
			password: loginData.password,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/login", data).then((res) => {
				if (res.data.status === "Request was successfull.") {
					console.log(res);
					const token = res.data.data.token;
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					setCookie("Token", token, { path: "/" });
					setUser({ ...user, name, email });
					navigate("/", { replace: true });
				} else {
					console.log(res);
					setLoginData({ ...loginData, errors: res.data.errors });
				}
			});
		});
	};

	return (
		<form className="flex flex-col gap-1 pt-10 w-7/12" onSubmit={handleLogin}>
			<div className="mb-6">
				<div className="mb-2 block">
					<Label htmlFor="email2" value="Your email" />
				</div>
				<TextInput
					id="email2"
					type="email"
					required={true}
					shadow={true}
					name="email"
					value={loginData.email}
					onChange={handleInput}
				/>
				<span>{loginData.errors.email}</span>
			</div>
			<div className="mb-6">
				<div className="mb-2 block">
					<Label htmlFor="password" value="Your Password" />
				</div>
				<TextInput
					id="password"
					type="password"
					name="password"
					required={true}
					shadow={true}
					value={loginData.password}
					onChange={handleInput}
				/>
				<span>{loginData.errors.password}</span>
			</div>

			<Button
				type="submit"
				className="bg-grape hover:bg-main hover:text-black hover:border-grape mt-2"
			>
				Login
			</Button>
		</form>
	);
}
