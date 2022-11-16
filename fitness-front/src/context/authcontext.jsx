import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

	const [user, setUser] = useState({
		name: "",
		email: "",
	});

	useEffect(() => {
		if (cookies.Token) {
			axios
				.get("/api/user", {
					headers: {
						Authorization: `Bearer ${cookies.Token}`,
					},
				})
				.then((res) => {
					console.log(res.data.data.user.name);
					const name = res.data.data.user.name;
					const email = res.data.data.user.email;
					setUser({ ...user, name, email });
					// return res.data.data.user;
				});
			console.log(user);
		} else {
			return;
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				cookies,
				setCookie,
				removeCookie,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
