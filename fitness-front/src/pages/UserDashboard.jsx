import axios from "axios";
import React, { useContext, useEffect } from "react";
import SideNav from "../components/SideNav";
import { AuthContext } from "../context/authcontext";
import ApexCharts from "apexcharts";
import { Tabs } from "flowbite-react";
import WeightLog from "../components/profile/WeightLog";
import SavedWorkouts from "../components/profile/SavedWorkouts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";

export default function UserDashboard() {
	const { cookies, tab } = useContext(AuthContext);
	const token = cookies.Token;
	const navigate = useNavigate();

	// const weights = data?.map((i) => i.attributes.weight);
	// if (!token) return <Unauthorized />;
	if (!token) return <Navigate to={"/register"} />;
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="flex flex-col gap-5 items-center mx-auto justify-center p-10">
				<h1 className="text-5xl text-grape font-black">
					Welcome To Your Space
				</h1>
				<Tabs.Group
					aria-label="Tabs with underline"
					style="underline"
					className="w-fit self-center"
				>
					<Tabs.Item active={tab == "logs" ? true : false} title="Weight Log">
						<WeightLog token={token} />
					</Tabs.Item>
					<Tabs.Item
						active={tab == "workouts" ? true : false}
						title="Saved Workouts"
					>
						<SavedWorkouts token={token} />
					</Tabs.Item>
				</Tabs.Group>
			</div>
		</div>
	);
}
