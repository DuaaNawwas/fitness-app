import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/authcontext";
import Home from "./pages/Home";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Registration from "./pages/Registration";
import Workouts from "./pages/Workouts";
import SingleWorkout from "./pages/SingleWorkout";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post["Content-Type"] = "application/vnd.api+json";
axios.defaults.headers.post["Accept"] = "application/vnd.api+json";
axios.defaults.withCredentials = true;

function App() {
	return (
		<GoogleOAuthProvider
			clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}
		>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/workouts" element={<Workouts />} />
					<Route path="/workouts/:id" element={<SingleWorkout />} />
				</Routes>
			</AuthProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
