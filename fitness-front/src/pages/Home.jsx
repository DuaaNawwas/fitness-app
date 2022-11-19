import React from "react";
import HomeCards from "../components/home/HomeCards";
import SideNav from "../components/SideNav";

export default function Home() {
	return (
		<>
			<div className="md:flex gap-8 pb-24 md:pb-0">
				<SideNav />
				<div className="p-10 flex flex-col mx-auto items-center justify-center gap-12">
					<h1 className="text-5xl text-grape font-black">
						Welcome to DN Fitness!
						<div className="text-lg text-black font-bold text-center pt-2">
							Find the workout for you and keep an eye on your health!
						</div>
					</h1>
					<HomeCards />
				</div>
			</div>
		</>
	);
}
