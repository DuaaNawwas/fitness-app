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
		<Table hoverable={true}>
			<Table.Head>
				<Table.HeadCell>Workout</Table.HeadCell>
				<Table.HeadCell>Category</Table.HeadCell>
				<Table.HeadCell>Equipments</Table.HeadCell>
				<Table.HeadCell>
					<span className="sr-only">View</span>
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
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{log.attributes.workout_name}
							</Table.Cell>
							<Table.Cell>{log.attributes.workout_categ}</Table.Cell>
							<Table.Cell>{log.attributes.workout_equip}</Table.Cell>

							<Table.Cell>
								<Link
									to={`/workouts/${log.attributes.workout_id}`}
									className="font-medium text-grape hover:underline "
								>
									View
								</Link>
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
