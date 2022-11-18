import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import SingleContent from "../components/singleworkout/SingleContent";

export default function SingleWorkout() {
	const [workoutData, setWorkoutData] = useState();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`https://wger.de/api/v2/exerciseinfo/${id}`, {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setWorkoutData(res.data);
			});
	}, []);
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<SingleContent workoutData={workoutData} />
		</div>
	);
}
