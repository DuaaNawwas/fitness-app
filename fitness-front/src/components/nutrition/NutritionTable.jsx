import React from "react";

export default function NutritionTable({ foods }) {
	return (
		<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Food
						</th>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Qty
						</th>

						<th scope="col" class="py-3 px-3 lg:px-6">
							Calories
						</th>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Weight
						</th>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Total Sugars
						</th>
						<th scope="col" class="py-3 px-3 lg:px-6">
							Total Fat
						</th>
					</tr>
				</thead>
				<tbody>
					{foods?.map((food, i) => {
						return (
							<tr
								key={i}
								class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
							>
								<th
									scope="row"
									class="flex items-center py-4 px-3 lg:px-6 text-gray-900 whitespace-nowrap dark:text-white"
								>
									<img
										class="w-10 h-10 rounded"
										src={food.photo.thumb}
										alt=""
									/>
									<div class="pl-3">
										<div class="text-base font-semibold">{food.food_name}</div>
										<div class="font-normal text-gray-500">
											{food.serving_unit}
										</div>
									</div>
								</th>
								<td class="py-4 px-3 lg:px-6">{food.serving_qty}</td>
								<td class="py-4 px-3 lg:px-6">
									<div class="flex items-center">{food.nf_calories} Kcal</div>
								</td>
								<td class="py-4 px-3 lg:px-6">{food.serving_weight_grams} g</td>
								<td class="py-4 px-3 lg:px-6">{food.nf_sugars} g</td>
								<td class="py-4 px-3 lg:px-6">{food.nf_total_fat} g</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
