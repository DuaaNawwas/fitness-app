import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<div className="bg-glass fixed flex justify-center gap-5 bottom-0 z-20 w-1/2 left-1/2 right-1/2 -translate-x-1/2 rounded-t-2xl text-xs py-1 text-white">
			<span>&copy; DN</span>
			<Link>About</Link>
			<Link>Contact</Link>
		</div>
	);
}
