import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CategoriesFilter from "../components/workouts/CategoriesFilter";
import Search from "../components/workouts/Search";
import SideNav from "../components/SideNav";
import WorkoutCard from "../components/workouts/WorkoutCard";
import WorkoutLoading from "../components/workouts/WorkoutLoading";

export default function Workouts() {
	const [loading, setLoading] = useState(true);
	// Getting data in a state
	const [allData, setAllData] = useState();
	// Search states
	const [search, setSearch] = useState("");
	const [searchItems, setSearchItems] = useState([]);
	// Category filter state
	const [categoryItems, setCategoryItems] = useState();
	const shuffledCategs = categoryItems?.sort((a, b) => 0.5 - Math.random());
	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(16);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = allData?.slice(indexOfFirstRecord, indexOfLastRecord);
	const currentCategoryRecords = shuffledCategs?.slice(
		indexOfFirstRecord,
		indexOfLastRecord
	);
	const currentSearchRecords = searchItems?.slice(indexOfFirstRecord);
	const nPages = Math.ceil(allData?.length / recordsPerPage);

	// Fetch workouts from api
	useEffect(() => {
		setLoading(true);
		axios
			.get("https://wger.de/api/v2/exerciseinfo/?limit=386", {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				const englishData = res.data.results.filter(
					(item) =>
						item.language.id == 2 &&
						(item.muscles.length > 0 ||
							item.description != "" ||
							item.muscles_secondary.length > 0)
				);
				setAllData(englishData);
				setLoading(false);
			});
	}, []);

	// Get data for search
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

	// Handle search input
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	// Handle adding category items
	const handleCategory = (data) => {
		setCategoryItems(data);
	};

	return (
		<>
			<div className="md:flex gap-8 pb-24 md:pb-0">
				<SideNav />
				<div className="flex flex-col px-5 lg:px-10 pb-0 pt-5 xl:pt-12 gap-5">
					<div className="flex flex-wrap gap-2 xl:flex-nowrap items-center justify-center xl:justify-between">
						<Search handleSearch={handleSearch} />
						<CategoriesFilter
							allData={allData}
							categoryItems={categoryItems}
							handleCategory={handleCategory}
						/>
					</div>
					{loading ? (
						<WorkoutLoading />
					) : (
						<div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
							{searchItems
								? currentSearchRecords.map((workout) => {
										return <WorkoutCard workout={workout} key={workout.id} />;
								  })
								: categoryItems.length > 0
								? currentCategoryRecords.map((workout) => {
										return <WorkoutCard workout={workout} key={workout.id} />;
								  })
								: currentRecords?.map((workout) => {
										return <WorkoutCard workout={workout} key={workout.id} />;
								  })}
						</div>
					)}
					<Pagination
						currentPage={currentPage}
						onPageChange={(e) => setCurrentPage(e)}
						showIcons={true}
						totalPages={12}
						className="self-center"
					/>
				</div>
			</div>
		</>
	);
}
