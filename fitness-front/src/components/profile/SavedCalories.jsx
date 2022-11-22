import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
export default function SavedCalories({ token }) {
	const [dates, setDates] = useState();
	const [calories, setCalories] = useState();

	const [dates2, setDates2] = useState();
	const [caloriesOut, setCaloriesOut] = useState();

	// Get user data from database
	useEffect(() => {
		axios
			.get("/api/caloriesin", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				// Get data
				const dataV = res.data.data.map((i) => i.attributes);

				// Get data with formatted dates
				const data = dataV.map((i) => {
					return { ...i, created_at: i.created_at.split("T")[0] };
				});

				// Get an array of dates
				const allDates = res.data.data.map(
					(i) => i.attributes.created_at.split("T")[0]
				);

				// Remove duplicate dates
				const uniqueDates = [...new Set(allDates)];
				// setDates(uniqueDates);

				// Get calories sum for each date
				const cals = Object.values(
					data.reduce((a, { calories, created_at }) => {
						a[created_at] = a[created_at] || { created_at, calories: 0 };
						a[created_at].calories = a[created_at].calories + calories;

						return a;
					}, {})
				);
				setDates(cals.map((i) => i.created_at));
				setCalories(cals.map((i) => i.calories));
				// console.log(allDates);
				console.log(dataV);
				console.log(cals);
				console.log(uniqueDates);
			});
	}, []);
	// Get user data from database
	useEffect(() => {
		axios
			.get("/api/caloriesout", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data.data);
				// Get data
				const dataV = res.data.data.map((i) => i.attributes);

				// Get data with formatted dates
				const data = dataV.map((i) => {
					return { ...i, created_at: i.created_at.split("T")[0] };
				});

				// Get calories sum for each date
				const cals = Object.values(
					data.reduce((a, { calories, created_at }) => {
						a[created_at] = a[created_at] || { created_at, calories: 0 };
						a[created_at].calories = a[created_at].calories + calories;

						return a;
					}, {})
				);
				setDates2(cals.map((i) => i.created_at));
				setCaloriesOut(cals.map((i) => i.calories));
			});
	}, []);

	// Data for Chart
	const series = [
		//data on the y-axis
		{
			name: "Calories consumed",
			data: calories,
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
	// Data for Chart
	const series2 = [
		//data on the y-axis
		{
			name: "Calories burnt",
			data: caloriesOut,
		},
	];

	const options2 = {
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
		colors: ["#37403d", "#545454"],
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
			categories: dates2,
		},
	};
	return (
		<>
			{calories?.length > 0 || caloriesOut?.length > 0 ? (
				<div className="flex flex-wrap gap-10">
					<div className="flex flex-col">
						<p>Calories Consumed</p>
						<Chart options={options} series={series} type="line" width="450" />
					</div>
					<div className="flex flex-col">
						<p>Calories Burnt</p>
						<Chart
							options={options2}
							series={series2}
							type="line"
							width="450"
						/>
					</div>
				</div>
			) : (
				<h1 className="text-center">You didn't add any data</h1>
			)}
		</>
	);
}
