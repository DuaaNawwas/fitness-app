import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
export default function SavedCalories({ token }) {
	const [inData, setInData] = useState();
	const [outData, setOutData] = useState();

	const [dates, setDates] = useState();
	const [calories, setCalories] = useState();

	const [dates2, setDates2] = useState();
	const [caloriesOut, setCaloriesOut] = useState();

	const [loading1, setLoading1] = useState(true);
	const [loading2, setLoading2] = useState(true);

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

				// // Remove duplicate dates
				// const uniqueDates = [...new Set(allDates)];

				// Get calories sum for each date
				const cals = Object.values(
					data.reduce((a, { calories, created_at }) => {
						a[created_at] = a[created_at] || { created_at, calories: 0 };
						a[created_at].calories = a[created_at].calories + calories;

						return a;
					}, {})
				);
				setInData(cals);
				setDates(cals.map((i) => i.created_at));
				setCalories(cals.map((i) => i.calories));
				setLoading1(false);
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
				setOutData(cals);

				setDates2(cals.map((i) => i.created_at));
				setCaloriesOut(cals.map((i) => i.calories));
				setLoading2(false);
			});
	}, []);

	// Merge data from calories in and out based on date
	const mergedData = inData?.map((i) => {
		const date = outData?.find(({ created_at }) => created_at == i.created_at);
		// console.log(date);
		if (!date) {
			return { ...i, caloriesOut: 0 };
		} else {
			return { ...i, caloriesOut: date.calories };
		}
	});
	console.log("--------------");
	console.log(inData);
	console.log(outData);
	console.log(mergedData);

	// Data for Chart
	const series = [
		//data on the y-axis
		{
			name: "Calories consumed",
			data: mergedData?.map((i) => i.calories),
		},
		{
			name: "Calories burnt",
			data: mergedData?.map((i) => i.caloriesOut),
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

	return (
		<>
			{loading1 && loading2 ? (
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
			) : calories?.length > 0 || caloriesOut?.length > 0 ? (
				<div className="flex flex-col">
					<Chart options={options} series={series} type="line" width="450" />
				</div>
			) : (
				<h1 className="text-center">You didn't add any data</h1>
			)}
		</>
	);
}
