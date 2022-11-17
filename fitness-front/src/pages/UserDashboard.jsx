import axios from "axios";
import React, { useContext, useEffect } from "react";
import SideNav from "../components/SideNav";
import { AuthContext } from "../context/authcontext";
import ApexCharts from "apexcharts";
import { Tabs } from "flowbite-react";
import WeightLog from "../components/WeightLog";
import SavedWorkouts from "../components/SavedWorkouts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";

// import usePrevLocation from "../hook/usePrevLocation";

export default function UserDashboard() {
	// const[chartData, setChartData] = useState({
	//     series: [{
	//         name: "Weight",
	//         data: weights
	//     }],
	//     options: {
	//         chart: {
	//           height: 350,
	//           type: 'line',
	//           zoom: {
	//             enabled: false
	//           }
	//         }
	// })

	const { cookies } = useContext(AuthContext);
	const token = cookies.Token;
	const navigate = useNavigate();

	// const weights = data?.map((i) => i.attributes.weight);
	if (!token) return <Unauthorized />;
	return (
		<div className="md:flex gap-8 pb-20 md:pb-5 pt-2">
			<SideNav />
			<div className="flex flex-col items-center mx-auto justify-center">
				<h1 className="text-5xl text-grape font-black">
					Welcome To Your Space
				</h1>
				<Tabs.Group aria-label="Tabs with underline" style="underline">
					<Tabs.Item active={true} title="Weight Log">
						<WeightLog token={token} />
					</Tabs.Item>
					<Tabs.Item title="Saved Workouts">
						<SavedWorkouts token={token} />
					</Tabs.Item>
					<Tabs.Item title="Settings">Settings content</Tabs.Item>
					<Tabs.Item title="Contacts">Contacts content</Tabs.Item>
					<Tabs.Item disabled={true} title="Disabled">
						Disabled content
					</Tabs.Item>
				</Tabs.Group>
			</div>
		</div>
	);
}
