import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import SideNav from "../components/SideNav";

export default function Contact() {
	return (
		<div className="md:flex gap-8 pb-24 md:pb-0">
			<SideNav />
			<div className="w-3/4 lg:w-1/2 p-10 flex flex-col mx-auto items-center justify-center gap-10 text-start">
				<h1 className="text-5xl text-grape font-black">Contact Us</h1>
				<div className="flex flex-col gap-2">
					<h5 className="text-lg text-black font-bold">Duaa Nawwas</h5>
					<h5 className="text-lg text-black font-bold">
						duaa.nawwas@gmail.com
					</h5>
					<h5 className="text-lg text-black font-bold">0778086357</h5>
					<div className=" border-t h-px  border-slate-400"></div>
					<div className="flex gap-5 justify-start pt-5">
						<a
							href="https://github.com/DuaaNawwas"
							className="hover:drop-shadow-lg"
							target="_blank"
						>
							<FaGithub size="35" />
						</a>
						<a
							href="https://www.linkedin.com/in/duaanawwas/"
							className="hover:drop-shadow-lg"
							target="_blank"
						>
							<FaLinkedin size="35" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
