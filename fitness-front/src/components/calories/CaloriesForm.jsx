import axios from "axios";
import React, { useState } from "react";
import CaloriesTable from "./CaloriesTable";

export default function CaloriesForm() {
	// Take input from user
	const [query, setQuery] = useState();

	// Save data from api
	const [exercises, setExercises] = useState();

	// Get data from api
	const getInfo = (e) => {
		e.preventDefault();
		axios
			.post(
				"https://trackapi.nutritionix.com/v2/natural/exercise",
				{
					query: query,
				},
				{
					withCredentials: false,

					headers: {
						"x-app-id": "d6cc6cb1",
						"x-app-key": "78f8ccc42978b0f10cfb8a1f52aa17fb",
					},
				}
			)
			.then((res) => {
				console.log(res);

				setExercises(res.data.exercises);
			})
			.catch((err) => {
				console.log(err);
				setExercises("noexercises");
			});
	};

	return (
		<div class="relative z-0 w-full flex flex-col gap-10">
			<form onSubmit={getInfo} className="flex flex-col gap-3 items-center">
				<input
					type="text"
					name="search"
					id="search"
					class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none  focus:outline-none focus:ring-0 focus:border-grape peer text-center placeholder:text-center"
					placeholder="I ran for an hour..."
					onChange={(e) => {
						setQuery(e.target.value);
					}}
				/>
				<button
					type="submit"
					class={` focus:ring-4 focus:outline-none focus:ring-creamy font-medium rounded-lg text-sm px-10 py-2.5 text-center mx-auto mb-2 ${
						query
							? "text-grape hover:text-white border border-grape hover:bg-grape"
							: "text-white bg-grapeSh cursor-not-allowed "
					}`}
					disabled={query ? false : true}
				>
					Submit
				</button>
			</form>
			{!exercises ? (
				""
			) : exercises === "noexercises" ? (
				<div
					class="flex p-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300"
					role="alert"
				>
					<svg
						aria-hidden="true"
						class="flex-shrink-0 inline w-5 h-5 mr-3"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						></path>
					</svg>
					<span class="sr-only">Info</span>
					<div>
						<span class="font-medium">Sorry!</span> Your query didn't match any
						exercise!
					</div>
				</div>
			) : (
				<CaloriesTable exercises={exercises} />
			)}
		</div>
	);
}
