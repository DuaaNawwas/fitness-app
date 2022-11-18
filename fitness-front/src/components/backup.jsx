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
				console.log(res.data);
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
		<div className="flex gap-3">
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
		// <>
		// 	<Dropdown label="Categories" dismissOnClick={false}>
		// 		{categories?.map((cat) => {
		// 			return (
		// 				<Dropdown.Item key={cat.id} onClick={() => getCategoryData(cat.id)}>
		// 					{cat.name}
		// 				</Dropdown.Item>
		// 			);
		// 		})}
		// 	</Dropdown>
		// </>
	);
}
// to get all categories---------------------------------
// axios
// 			.get("https://wger.de/api/v2/exercisecategory", {
// 				withCredentials: false,
// 			})
// 			.then((res) => {
// 				console.log(res.data);
// 				setCategories(res.data.results);
// 			});
// to get all categories---------------------------------
// to get all exercise from category---------------------------------
// axios
// .get(`https://wger.de/api/v2/exercise/?category=${id}`, {
//     withCredentials: false,
// })
// .then((res) => {
//     // console.log(res);
//     handleCategory(res.data.results);
// });
// to get all exercise from category---------------------------------

import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export function WeightLog({ token }) {
	// Save user data
	const [data, setData] = useState();

	// Show inputs to edit
	const [showInput, setShowInput] = useState(false);

	// New data to edit
	const [newValue, setNewValue] = useState();

	// Identify inputs
	const myRefs = useRef({});
	const weightRefs = useRef({});

	// Get user data from database
	useEffect(() => {
		axios
			.get("/api/bodyLogs", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				setData(res.data.data);
			});
	}, []);

	// Confirm if user wants to delete
	const alertDel = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this weight entry!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteLog(id);
				const newData = data?.filter((i) => i.id != id);
				setData(newData);
				swal("Poof! Your weight entry has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your weight entry is safe!");
			}
		});
	};

	// Delete a log
	const deleteLog = (id) => {
		axios
			.delete(`/api/bodyLogs/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
			});
	};

	// Show specific input
	const showOneInput = (id) => {
		if (myRefs.current[id].id == id || weightRefs.current[id].id == id) {
			setShowInput(id);
			console.log(id);
		}
	};

	// Handle new value
	const handleNewValue = (id) => {
		setNewValue(weightRefs.current[id].innerText);
		editInput(id);
		setShowInput(false);
	};

	// console.log(newValue);

	// Edit an input
	const editInput = (id) => {
		const col = weightRefs.current[id].title;
		console.log("hi");
		console.log(col);
		const data = { [col]: newValue };
		axios
			.put(`/api/bodyLogs/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => console.log(res));
	};

	return (
		<Table hoverable={true}>
			<Table.Head>
				<Table.HeadCell>Date</Table.HeadCell>
				<Table.HeadCell>Weight</Table.HeadCell>
				<Table.HeadCell>BMI</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Edit</span>
				</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">Delete</span>
				</Table.HeadCell>
			</Table.Head>
			<Table.Body className="divide-y">
				{data?.map((log) => {
					return (
						<Table.Row
							key={log.id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell
								onDoubleClick={() => showOneInput(log.id)}
								onBlur={() => handleNewValue(log.id)}
								onClick={() => console.log(myRefs.current[log.id].title)}
								className={`whitespace-nowrap font-medium text-gray-900 dark:text-white`}
							>
								<span
									type="text"
									title="created_at"
									autofocus={true}
									// onChange={() => setNewValue(myRefs.current[log.id].innerText)}
									className={`${
										showInput == log.id
											? "focus:ring-0 border-t-0 border-x-0 border-b-2 focus:border-grape"
											: "border-none"
									} w-auto bg-transparent`}
									role={`${showInput == log.id ? "textbox" : ""} `}
									contenteditable={`${showInput == log.id ? "true" : "false"}`}
									id={log.id}
									ref={(el) => (myRefs.current[log.id] = el)}
								>
									{log.attributes.created_at.split("T")[0]}
								</span>
							</Table.Cell>

							<Table.Cell
								onDoubleClick={() => showOneInput(log.id)}
								onBlur={() => handleNewValue(log.id)}
								onClick={() => console.log(weightRefs.current[log.id].title)}
							>
								{" "}
								<span
									type="number"
									title="weight"
									autofocus={true}
									className={`${
										showInput == log.id
											? "focus:ring-0 border-t-0 border-x-0 border-b-2 focus:border-grape"
											: "border-none"
									} w-auto bg-transparent`}
									role={`${showInput == log.id ? "textbox" : ""} `}
									contenteditable={`${showInput == log.id ? "true" : "false"}`}
									id={log.id}
									ref={(el) => (weightRefs.current[log.id] = el)}
								>
									{log.attributes.weight}
								</span>
							</Table.Cell>
							<Table.Cell>{log.attributes.bmi}</Table.Cell>

							<Table.Cell>
								<a
									href="/tables"
									className="font-medium text-grape hover:underline "
								>
									Edit
								</a>
							</Table.Cell>
							<Table.Cell>
								<button
									className="font-medium text-red-500 hover:underline "
									onClick={() => alertDel(log.id)}
								>
									Delete
								</button>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table>
	);
}
