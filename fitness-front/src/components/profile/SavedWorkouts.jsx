import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function SavedWorkouts({ token }) {
	// Save user's workouts
	const [data, setData] = useState();
	// Get saved workouts from database
	useEffect(() => {
		axios
			.get("/api/workouts", {
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
			text: "Once deleted, you will not be able to recover this workout!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				deleteWorkout(id);
				const newData = data?.filter((i) => i.id != id);
				setData(newData);
				swal("Poof! Your workout has been deleted!", {
					icon: "success",
				});
			} else {
				swal("Your workout is safe!");
			}
		});
	};

	// Delete a workout
	const deleteWorkout = (id) => {
		axios
			.delete(`/api/workouts/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res);
			});
	};
	return (
		<>
			{data?.length > 0 ? (
				<div class="overflow-x-scroll  relative shadow-md sm:rounded-lg">
					<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" class="py-3 px-2 lg:px-6">
									Workout
								</th>
								<th scope="col" class="py-3 px-2 lg:px-6">
									Category
								</th>
								<th scope="col" class="py-3 px-2 lg:px-6">
									Equipments
								</th>
								<th scope="col" class="py-3 px-2 lg:px-6">
									{/* <span class="sr-only">View</span> */}
								</th>
								{/* <th scope="col" class="py-3 px-6">
							<span class="sr-only">Delete</span>
						</th> */}
							</tr>
						</thead>
						<tbody>
							{data?.map((log) => {
								return (
									<tr
										class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
										key={log.id}
									>
										<th
											scope="row"
											class="py-4 px-2 lg:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
										>
											{log.attributes.workout_name}
										</th>
										<td class="py-4 px-2 lg:px-6">
											{log.attributes.workout_categ}
										</td>
										<td class="py-4 px-2 lg:px-6">
											{log.attributes.workout_equip}
										</td>
										<td class="py-4 px-2 lg:px-6 flex gap-4">
											<Link
												to={`/workouts/${log.attributes.workout_id}`}
												className="font-medium text-grape hover:underline "
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
												</svg>
											</Link>
											<button
												className="font-medium text-red-500 hover:underline "
												onClick={() => alertDel(log.id)}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="w-6 h-6"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</button>
										</td>
										{/* <td class="py-4 px-2 lg:px-6 text-right">
								</td> */}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			) : (
				<h1 className="text-center">You didn't add any data</h1>
			)}
		</>
		// <div className="overflow-x-scroll">
		// 	<Table hoverable={true} className="overflow-x-scroll">
		// 		<Table.Head>
		// 			<Table.HeadCell>Workout</Table.HeadCell>
		// 			<Table.HeadCell>Category</Table.HeadCell>
		// 			<Table.HeadCell>Equipments</Table.HeadCell>
		// 			<Table.HeadCell>
		// 				<span className="sr-only">View</span>
		// 			</Table.HeadCell>
		// 			<Table.HeadCell>
		// 				<span className="sr-only">Delete</span>
		// 			</Table.HeadCell>
		// 		</Table.Head>
		// 		<Table.Body className="divide-y">
		// 			{data?.map((log) => {
		// 				return (
		// 					<Table.Row
		// 						key={log.id}
		// 						className="bg-white dark:border-gray-700 dark:bg-gray-800"
		// 					>
		// 						<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
		// 							{log.attributes.workout_name}
		// 						</Table.Cell>
		// 						<Table.Cell>{log.attributes.workout_categ}</Table.Cell>
		// 						<Table.Cell>{log.attributes.workout_equip}</Table.Cell>

		// 						<Table.Cell>
		// 							<Link
		// 								to={`/workouts/${log.attributes.workout_id}`}
		// 								className="font-medium text-grape hover:underline "
		// 							>
		// 								View
		// 							</Link>
		// 						</Table.Cell>
		// 						<Table.Cell>
		// 							<button
		// 								className="font-medium text-red-500 hover:underline "
		// 								onClick={() => alertDel(log.id)}
		// 							>
		// 								Delete
		// 							</button>
		// 						</Table.Cell>
		// 					</Table.Row>
		// 				);
		// 			})}
		// 		</Table.Body>
		// 	</Table>
		// </div>
	);
}
