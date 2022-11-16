import axios from "axios";
import { Dropdown, ToggleSwitch } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function CategoriesFilter({
	allData,
	handleCategory,
	categoryItems,
}) {
	const [categories, setCategories] = useState();

	// console.log(ids);

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
	console.log(switchCheck);
	useEffect(() => {
		axios
			.get("https://wger.de/api/v2/exercisecategory", {
				withCredentials: false,
			})
			.then((res) => {
				// console.log(res);
				setCategories(res.data.results);
			});
	}, []);

	const handleCat = (e) => {
		setSwitchcheck({ ...switchCheck, [e.target.name]: e.target.checked });
	};

	useEffect(() => {
		let allFiltered = [];
		const ids = categories?.map((cat) => cat.id);
		ids?.forEach((id) => {
			if (switchCheck[id] == true) {
				const filteredData = allData?.filter((item) => {
					return item.category.id == id;
				});
				allFiltered.push(filteredData);
			}
		});

		if (
			(switchCheck[8] &&
				switchCheck[9] &&
				switchCheck[10] &&
				switchCheck[11] &&
				switchCheck[12] &&
				switchCheck[13] &&
				switchCheck[14] &&
				switchCheck[15]) == false
		) {
			allFiltered = [];
		}
		handleCategory(allFiltered);
		console.log("here");
		console.log(allFiltered);
		console.log("end");
	}, [switchCheck]);

	const getCategoryData = (id) => {
		axios
			.get(`https://wger.de/api/v2/exercise/?category=${id}`, {
				withCredentials: false,
			})
			.then((res) => {
				// console.log(res);
				handleCategory(res.data.results);
			});
	};
	return (
		// <div className="flex gap-3">
		// 	{categories?.map((cat) => {
		// 		return (
		// 			<div key={cat.id}>
		// 				<input
		// 					type="checkbox"
		// 					id={cat.name}
		// 					name={cat.id}
		// 					value=""
		// 					class="hidden peer"
		// 					required=""
		// 					onChange={handleCat}
		// 				/>
		// 				<label
		// 					for={cat.name}
		// 					class="inline-flex justify-between items-center px-5 py-1 w-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 peer-checked:border-grape hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
		// 				>
		// 					<div class="block">
		// 						<div class="w-full text-sm font-semibold">{cat.name}</div>
		// 					</div>
		// 				</label>
		// 			</div>
		// 		);
		// 	})}
		// </div>
		<>
			<Dropdown label="Categories" dismissOnClick={false}>
				{categories?.map((cat) => {
					return (
						<Dropdown.Item key={cat.id} onClick={() => getCategoryData(cat.id)}>
							{cat.name}
						</Dropdown.Item>
					);
				})}
			</Dropdown>
		</>
	);
}
