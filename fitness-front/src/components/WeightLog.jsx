import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function WeightLog({ token }) {
	// Save user data
	const [data, setData] = useState();

	// Get user data from database
	useEffect(() => {
		axios
			.get("/api/logs", {
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
			.delete(`/api/logs/${id}`, {
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
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{log.attributes.created_at.split("T")[0]}
							</Table.Cell>
							<Table.Cell>{log.attributes.weight}</Table.Cell>
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
