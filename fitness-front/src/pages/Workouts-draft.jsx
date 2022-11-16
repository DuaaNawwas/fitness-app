import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginator from "../components/Paginator";
import Search from "../components/Search";
import SideNav from "../components/SideNav";
import WorkoutCard from "../components/WorkoutCard";

export default function Workouts() {
	const [data, setData] = useState();
	const [workouts, setWorkouts] = useState();
	const [allData, setAllData] = useState();
	const [search, setSearch] = useState("");
	const [searchItems, setSearchItems] = useState([]);

	useEffect(() => {
		axios
			.get("https://wger.de/api/v2/exerciseinfo/?limit=386", {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setAllData(res.data.results);
			});
		axios
			.get("https://wger.de/api/v2/exerciseinfo", {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setData(res.data);
				setWorkouts(res.data.results);
			});
	}, []);

	useEffect(() => {
		if (search == "") setSearchItems([]);
		const searchData = allData?.filter((workout) => {
			const name = workout.name;
			const desc = workout.description;
			const category = workout.category.name;
			return (
				name.toLowerCase().includes(search.toLowerCase()) ||
				desc.toLowerCase().includes(search.toLowerCase()) ||
				category.toLowerCase().includes(search.toLowerCase())
			);
		});
		setSearchItems(searchData);
	}, [search]);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleNext = () => {
		if (data.next == null) return;

		axios
			.get(data.next, {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setData(res.data);
				setWorkouts(res.data.results);
			});
	};

	const handlePrev = () => {
		if (data.previous == null) return;

		axios
			.get(data.previous, {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setData(res.data);
				setWorkouts(res.data.results);
			});
	};
	return (
		<>
			<div className="flex gap-8">
				<SideNav />
				<div className="flex flex-col px-10 pb-4 pt-1 gap-2">
					<Search handleSearch={handleSearch} />
					<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{searchItems
							? searchItems.map((workout) => {
									return <WorkoutCard workout={workout} />;
							  })
							: workouts?.map((workout) => {
									return <WorkoutCard workout={workout} />;
							  })}
					</div>
					<Paginator handleNext={handleNext} handlePrev={handlePrev} />
				</div>
			</div>
		</>
	);
}
