import React from "react";
import SideNav from "../components/SideNav";

export default function Unauthorized() {
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="flex flex-col justify-center mx-auto items-center gap-8">
				<h1 className="text-5xl text-grape font-black w-1/2 text-center">
					You Are Not Authorized to Make This Action
				</h1>
				<h1 className="text-5xl text-black font-black">403</h1>
			</div>
		</div>
	);
}
