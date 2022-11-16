import React from "react";
import { Link } from "react-router-dom";

export default function WorkoutCard({ workout }) {
	return (
		<Link to={`/workouts/${workout.id}`} key={workout.id}>
			<div className="bg-white rounded-lg shadow h-28 relative">
				<div className="px-5 pt-4 pb-8 flex flex-col gap-1">
					<p className="text-lg font-bold text-grape">{workout.name}</p>
					<p className="text-sm font-medium text-gray-500">
						{workout.equipment.map((eq) => {
							return `${eq.name} `;
						})}
					</p>
					<span class="bg-main text-grape text-sm font-medium mr-2 px-2.5 py-0.5 rounded absolute right-2 bottom-2">
						{workout.category.name}
					</span>
				</div>
			</div>
		</Link>
	);
}
