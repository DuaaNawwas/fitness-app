import React from "react";
import NutritionForm from "../components/nutrition/NutritionForm";
import SideNav from "../components/SideNav";

export default function Nutrition() {
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="p-10 flex flex-col mx-auto items-center justify-center gap-12">
				<h1 className="text-5xl text-grape font-black">
					Tell Us What You Ate Today!
				</h1>

				<NutritionForm />
			</div>
		</div>
	);
}
