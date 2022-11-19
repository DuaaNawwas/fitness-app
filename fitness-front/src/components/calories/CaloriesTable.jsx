import React from "react";
import workoutimg from "../../images/workoutimg.jpg";

export default function CaloriesTable({ exercises }) {
	return (
		<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Exercise
						</th>
						<a
							href="https://en.wikipedia.org/wiki/Metabolic_equivalent_of_task"
							target="_blank"
						>
							<th scope="col" class="py-3 px-3 lg:px-6">
								MET
							</th>
						</a>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Duration
						</th>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Calories Burnt
						</th>
					</tr>
				</thead>
				<tbody>
					{exercises?.map((exercise, i) => {
						return (
							<tr
								key={i}
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									class="flex items-center py-4 px-3 lg:px-6 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<img class="w-10 h-10 rounded" src={workoutimg} alt="" />
									<div class="pl-3">
										<div class="text-base font-semibold">{exercise.name}</div>
									</div>
								</th>

								<td class="py-4 px-3 lg:px-6">{exercise.met}</td>

								<td class="py-4 px-3 lg:px-6">{exercise.duration_min} mins</td>
								<td class="py-4 px-3 lg:px-6">
									<div class="flex items-center">
										{exercise.nf_calories} Kcal
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
