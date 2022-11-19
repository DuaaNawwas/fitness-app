import React from "react";
import SideNav from "../components/SideNav";

export default function About() {
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="md:w-1/2 p-10 flex flex-col mx-auto items-center justify-center gap-6">
				<h1 className="text-5xl text-grape font-black">About Us</h1>
				<h5 className="text-lg text-black font-bold text-center">
					DN Fitness is a collection of services for the best of your health!
					You can browse a variety of exercises, calculate your body mass index
					and find out how many calories you consumed and burnt based on your
					natural description of what you ate or did as an exercise!
				</h5>
				<h5 className="text-lg text-black font-bold text-center">
					Users can save their favorite exercises to come to them later and keep
					track of their weight and bmi.
				</h5>
			</div>
		</div>
	);
}
