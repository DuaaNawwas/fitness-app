import axios from "axios";
import { Pagination } from "flowbite-react";
import React, { useEffect, useState } from "react";
import CategoriesFilter from "../components/CategoriesFilter";
import Search from "../components/Search";
import SideNav from "../components/SideNav";
import WorkoutCard from "../components/WorkoutCard";

export default function Workouts() {
	// Getting data in a state
	const [allData, setAllData] = useState();
	// Search states
	const [search, setSearch] = useState("");
	const [searchItems, setSearchItems] = useState([]);
	// Category filter state
	const [categoryItems, setCategoryItems] = useState();
	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(20);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = allData?.slice(indexOfFirstRecord, indexOfLastRecord);
	const currentSearchRecords = searchItems?.slice(
		indexOfFirstRecord,
		indexOfLastRecord
	);
	const nPages = Math.ceil(allData?.length / recordsPerPage);

	// Fetch workouts from api
	useEffect(() => {
		axios
			.get("https://wger.de/api/v2/exerciseinfo/?limit=386", {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res);
				setAllData(res.data.results);
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
			<div className="md:flex gap-8 pb-20 md:pb-5 pt-2">
				<SideNav />
				<div className="flex flex-col px-10 pb-0 pt-1 gap-3">
					<div className="flex items-center justify-between">
						<Search handleSearch={handleSearch} />
						<CategoriesFilter
							allData={allData}
							categoryItems={categoryItems}
							handleCategory={handleCategory}
						/>
					</div>
					<div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{searchItems
							? currentSearchRecords.map((workout) => {
									return <WorkoutCard workout={workout} />;
							  })
							: // : categoryItems
							  // ? categoryItems.map((workout) => {
							  // 		return <WorkoutCard workout={workout} />;
							  //   })
							  currentRecords?.map((workout) => {
									return <WorkoutCard workout={workout} />;
							  })}
					</div>

					<Pagination
						currentPage={currentPage}
						onPageChange={(e) => setCurrentPage(e)}
						showIcons={true}
						totalPages={20}
						className="self-center"
					/>
				</div>
			</div>
		</>
	);
}
