import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../context/authcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GoogleAuth() {
	const { user, setUser, setCookie } = useContext(AuthContext);
	const navigate = useNavigate();

	const responseGoogle = (response) => {
		console.log(response);
		const userObject = jwt_decode(response.credential);
		//console.log(userObject);
		localStorage.setItem("user", JSON.stringify(userObject));
		const { name, sub, picture, email } = userObject;
		console.log(userObject);

		const data = {
			name: name,
			email: email,
			google_id: sub,
		};
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post("/api/googleLogin", data).then((res) => {
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
				}
			});
		});
	};
	return (
		<GoogleLogin
			onSuccess={responseGoogle}
			onError={() => {
				console.log("Login Failed");
			}}
			useOneTap
		/>
	);
}
