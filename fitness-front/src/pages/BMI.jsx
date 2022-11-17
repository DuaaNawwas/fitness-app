import { useContext } from "react";
import BmiForm from "../components/BmiForm";
import SideNav from "../components/SideNav";
import { AuthContext } from "../context/authcontext";

export default function BMI() {
	return (
		<div className="md:flex gap-8 pb-20 md:pb-5 pt-2">
			<SideNav />
			<div className="p-10 flex flex-col mx-auto items-center justify-center gap-12">
				<h1 className="text-5xl text-grape font-black">
					Calculate Your Body Mass Index
				</h1>
				<BmiForm />
			</div>
		</div>
	);
}
