import React from "react";

export default function LoadingCard() {
	return (
		<div class="flex animate-pulse justify-center items-center rounded-lg shadow h-28  bg-creamy lg:w-48 xl:w-60">
			<div className="px-5 pt-4 pb-8 flex flex-col gap-1">
				<p className="text-sm lg:text-lg font-bold text-grape">Loading...</p>

				<p className="text-sm md:text-xs lg:text-sm font-medium text-gray-500">
					Loading...
				</p>
			</div>
		</div>
	);
}
