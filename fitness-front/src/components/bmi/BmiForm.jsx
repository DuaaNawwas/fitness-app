import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authcontext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function BmiForm() {
	const { user, cookies, setTab } = useContext(AuthContext);
	const navigate = useNavigate();
	const [saved, setSaved] = useState(false);
	const [data, setData] = useState({
		weight: 0,
		height: 0,
		BMI: null,
		unit: "metric",
	});

	function handleSubmit(event) {
		event.preventDefault();
		let result = 0;
		if (data.unit == "metric") {
			result = data.weight / (data.height / 100) ** 2;
		} else {
			result = (data.weight / (data.height / 100) ** 2) * 702;
		}
		setData({ ...data, BMI: result });
	}
	const token = cookies.Token;
	const saveUserData = () => {
		axios
			.post(
				"/api/bodyLogs",
				{ weight: data.weight, bmi: data.BMI },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				console.log(res);
				setSaved(true);
				swal("Thank you", "Your data was saved successfully", "success");
				setTab("logs");
				navigate("/profile");
			});
	};
	console.log(saved);
	return (
		<div className="flex flex-col w-full gap-10 ">
			<form className="space-y-2" onSubmit={handleSubmit}>
				<div className="flex gap-5 ">
					<div class="relative z-0 w-full">
						<input
							type="text"
							name="weight"
							id="weight"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-grape peer"
							placeholder=" "
							onChange={(e) => {
								setData({ ...data, weight: e.target.value });
							}}
						/>
						<label
							for="weight"
							class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-grape peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Weight (Kgs)
						</label>
					</div>

					<div class="relative z-0 w-full">
						<input
							type="text"
							name="height"
							id="height"
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-gray-600  focus:outline-none focus:ring-0 focus:border-grape peer"
							placeholder=" "
							onChange={(e) => setData({ ...data, height: e.target.value })}
						/>
						<label
							for="height"
							class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-grape peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>
							Height (cm)
						</label>
					</div>
				</div>

				<button
					type="submit"
					class="text-grape hover:text-white border border-grape hover:bg-grape focus:ring-4 focus:outline-none focus:ring-creamy font-medium rounded-lg text-sm px-10 py-2.5 text-center mx-auto mb-2"
				>
					Calculate
				</button>
			</form>
			{data.BMI && (
				<div>
					<h1 className="text-3xl text-grape font-black mb-3">Your Results:</h1>
					<div>
						<p>BMI: {data.BMI}</p>
						<p>
							You are:{" "}
							{data.BMI < 18.5
								? "Underweight"
								: data.BMI < 24.9
								? "Normal Weight"
								: data.BMI < 29.9
								? "Overweight"
								: "Obese"}
						</p>
					</div>
				</div>
			)}
			{data.BMI && user.name && (
				<button
					onClick={saveUserData}
					type="button"
					className={`text-white bg-grape hover:bg-creamy hover:text-grape hover:border-2 hover:border-grape focus:ring-4 focus:outline-none focus:ring-grape  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
						saved ? "hidden" : ""
					}`}
				>
					Save Your Weight and BMI
				</button>
			)}
		</div>
	);
}
