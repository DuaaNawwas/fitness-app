import axios from "axios";
import { Dropdown, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function CategoriesFilter({
	allData,
	handleCategory,
	categoryItems,
}) {
	const [categories, setCategories] = useState();

	const [switchCheck, setSwitchcheck] = useState({
		8: false,
		9: false,
		10: false,
		11: false,
		12: false,
		13: false,
		14: false,
		15: false,
	});
	// console.log(allData);

	// get all categories
	useEffect(() => {
		axios
			.get("https://wger.de/api/v2/exercisecategory", {
				withCredentials: false,
			})
			.then((res) => {
				console.log(res.data);

				setCategories(res.data.results);
			});
	}, []);
	// update categories if checked
	const [allFiltered, setAllFiltered] = useState([]);
	const handleCat = (e) => {
		setSwitchcheck({ ...switchCheck, [e.target.name]: e.target.checked });
		if (e.target.checked) {
			const filteredData = allData?.filter((item) => {
				return item.category.id == e.target.name;
			});
			setAllFiltered([...allFiltered, ...filteredData]);
		} else if (!e.target.checked) {
			const removeData = allFiltered?.filter((item) => {
				return item.category.id != e.target.name;
			});
			// setAllFiltered([...allData]);
			setAllFiltered([...removeData]);
		}
	};

	useEffect(() => {
		handleCategory(allFiltered);
	}, [switchCheck]);

	return (
		<div className="flex flex-wrap xl:flex-nowrap gap-1 xl:gap-3">
			{categories?.map((cat) => {
				return (
					<div key={cat.id}>
						<input
							type="checkbox"
							id={cat.name}
							name={cat.id}
							value=""
							class="hidden peer"
							required=""
							onChange={handleCat}
							// onClick={handleLooking}
						/>
						<label
							for={cat.name}
							class="inline-flex justify-between items-center px-5 py-1 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 peer-checked:border-grape hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
						>
							<div class="block">
								<div class="w-full text-sm font-semibold">{cat.name}</div>
							</div>
						</label>
					</div>
				);
			})}
		</div>
	);
}
