import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

export default function WeightLog({ token }) {
	// Save user data
	const [data, setData] = useState();
	const [bmis, setBmis] = useState();
	const [wts, setWts] = useState();
	const [dates, setDates] = useState();

	const [loading, setLoading] = useState(true);
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
				setDates(
					res.data.data.map((i) => i.attributes.created_at.split("T")[0])
				);
				setBmis(res.data.data.map((i) => i.attributes.bmi));
				setWts(res.data.data.map((i) => i.attributes.weight));
				setLoading(false);
			});
	}, []);

	// useEffect(() => {
	// 	setDates(data.map((i) => i.attributes.created_at.split("T")[0]));
	// 	setBmis(data.map((i) => i.attributes.bmi));
	// 	setWts(data.map((i) => i.attributes.weight));
	// }, [data]);

	const series = [
		//data on the y-axis
		{
			name: "BMI",
			data: bmis,
		},
		{
			name: "Weights",
			data: wts,
		},
	];

	const options = {
		//data on the x-axis
		chart: {
			height: 350,
			background: "#f3f3f3",
			type: "line",
			dropShadow: {
				enabled: true,
				color: "#000",
				top: 18,
				left: 7,
				blur: 10,
				opacity: 0.2,
			},
			toolbar: {
				show: false,
			},
		},
		colors: ["#77B6EA", "#545454"],
		dataLabels: {
			enabled: true,
		},
		stroke: {
			curve: "smooth",
		},

		grid: {
			borderColor: "#e7e7e7",
			row: {
				colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
				opacity: 0.5,
			},
		},
		markers: {
			size: 1,
		},
		xaxis: {
			categories: dates,
		},
	};

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

	return (
		<>
			{loading ? (
				<div role="status" className="flex justify-center py-5">
					<svg
						class="inline mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-grape"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span class="sr-only">Loading...</span>
				</div>
			) : data?.length > 0 ? (
				<div className="flex flex-wrap gap-5 items-start justify-center">
					<Chart
						options={options}
						series={series}
						type="line"
						width="450"
						className="hidden md:block"
					/>

					<Table hoverable={true}>
						<Table.Head>
							<Table.HeadCell>Date</Table.HeadCell>
							<Table.HeadCell>Weight</Table.HeadCell>
							<Table.HeadCell>BMI</Table.HeadCell>
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
				</div>
			) : (
				<h1 className="text-center">You didn't add any data</h1>
			)}
		</>
	);
}
