import React from "react";
import { AiFillCalculator } from "react-icons/ai";
import { FaWeight } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function HomeCards() {
	return (
		<div className="lg:w-9/12 grid gap-4 grid-cols-2 justify-items-center">
			<Link
				to="/workouts"
				class="block rounded-xl shadow-lg border-2 border-grape p-4  hover:shadow-2xl focus:outline-none focus:ring focus:ring-creamy"
			>
				<span class="inline-block rounded-lg bg-gray-50 p-3">
					<GiWeightLiftingUp size="25" />
				</span>

				<h2 class="mt-2 font-bold">Workouts</h2>

				<p class="sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
					Browse a collection of exercises and save your favorite ones!
				</p>
			</Link>
			<Link
				to="/bmi"
				class=" block rounded-xl shadow-lg border-2 border-grape p-4  hover:shadow-2xl focus:outline-none focus:ring focus:ring-creamy"
			>
				<span class="inline-block rounded-lg bg-gray-50 p-3">
					<FaWeight size="23" />
				</span>

				<h2 class="mt-2 font-bold">BMI Calculator</h2>

				<p class="sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
					Calculate your body mass index and keep track of your weight!
				</p>
			</Link>
			<Link
				to="/nutrition"
				class=" block rounded-xl shadow-lg border-2 border-grape p-4  hover:shadow-2xl focus:outline-none focus:ring focus:ring-creamy"
			>
				<span class="inline-block rounded-lg bg-gray-50 p-3">
					<IoFastFood size="25" />
				</span>

				<h2 class="mt-2 font-bold">Nutrition</h2>

				<p class="sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
					Find out how many calories you consumed today!
				</p>
			</Link>
			<Link
				to="/calories"
				class=" block rounded-xl shadow-lg border-2 border-grape p-4  hover:shadow-2xl focus:outline-none focus:ring focus:ring-creamy"
			>
				<span class="inline-block rounded-lg bg-gray-50 p-3">
					<AiFillCalculator size="25" />
				</span>

				<h2 class="mt-2 font-bold">Burnt Calories</h2>

				<p class="sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
					Find out how many calories you burnt today!
				</p>
			</Link>
		</div>
	);
}
