import axios from "axios";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./context/authcontext";
import Home from "./pages/Home";
import Register from "./components/registration/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/registration/Login";
import Registration from "./pages/Registration";
import Workouts from "./pages/Workouts";
import SingleWorkout from "./pages/SingleWorkout";
import BMI from "./pages/BMI";
import UserDashboard from "./pages/UserDashboard";
import SideNav from "./components/SideNav";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Nutrition from "./pages/Nutrition";

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
					<Route path="/workouts" element={<Workouts />} />
					<Route path="/workouts/:id" element={<SingleWorkout />} />
					<Route path="/bmi" element={<BMI />} />
					<Route path="/profile" element={<UserDashboard />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/nutrition" element={<Nutrition />} />
					<Route path="/403" element={<Unauthorized />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</AuthProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
