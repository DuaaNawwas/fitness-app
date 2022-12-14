import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../context/authcontext";

export default function WorkoutCard({ workout }) {
	const navigate = useNavigate();
	const { cookies, setTab } = useContext(AuthContext);
	const token = cookies.Token;

	let equips = "";
	const saveWorkout = () => {
		axios
			.post(
				"/api/workouts",
				{
					workout_id: workout.id,
					workout_name: workout.name,
					workout_categ: workout.category.name,
					workout_equip: equips,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				console.log(res);

				swal("Thank you", "Your data was saved successfully", "success");
				setTab("workouts");
				navigate("/profile");
			});
	};

	return (
		<>
			<div className="bg-white rounded-lg shadow h-28 relative group">
				<div className="px-5 pt-4 pb-8 flex flex-col gap-1">
					<p className="text-sm lg:text-lg font-bold text-grape">
						{workout.name}
					</p>
					<p className="text-sm md:text-xs lg:text-sm font-medium text-gray-500">
						{workout.equipment.map((eq) => {
							equips += eq.name + ",";
							return `${eq.name} `;
						})}
					</p>
					<span class="bg-main text-grape text-sm font-medium mr-2 px-2.5 py-0.5 rounded absolute right-2 bottom-2">
						{workout.category.name}
					</span>
					<div className="absolute inset-0 bg-creamy hidden group-hover:block"></div>
					<div className="gap-3 absolute  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex">
						<Link
							to={`/workouts/${workout.id}`}
							type="button"
							className="text-white bg-grape hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-creamy font-medium rounded-full text-sm p-2.5 text-center  items-center mr-2 inline-flex"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</Link>
						{token && (
							<button
								type="button"
								onClick={saveWorkout}
								className="text-white bg-grape hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-creamy font-medium rounded-full text-sm p-2.5 text-center  items-center mr-2 inline-flex"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-4 h-4"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
