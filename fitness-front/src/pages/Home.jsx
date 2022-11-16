import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function Home() {
	const { cookies, removeCookie } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		// axios.get("/sanctum/csrf-cookie").then((response) => {
		axios
			.get("/api/logout", {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				removeCookie("Token");

				navigate("/register");
			})
			.catch((err) => {
				console.log(err);
			});
		// });
	};
	const { user } = useContext(AuthContext);
	return (
		<>
			<button onClick={handleLogout}>Logout</button>
			<div>
				{user.name} <br /> {user.email}
			</div>
		</>
	);
}
