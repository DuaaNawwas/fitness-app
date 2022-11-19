import React from "react";
import SideNav from "../components/SideNav";

export default function NotFound() {
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="flex flex-col justify-center mx-auto items-center gap-8">
				<h1 className="text-5xl text-grape font-black w-1/2 text-center">
					<span className="text-black"> Oops! </span> This Page Does Not Exist
				</h1>
				<h1 className="text-5xl text-black font-black">404</h1>
			</div>
		</div>
	);
}
