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
		</>
	);
}
