import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";
import logo from "../images/logo.png";
import { AiFillCalculator, AiFillHome } from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import { FaUserPlus, FaWeight } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoFastFood, IoLogOut } from "react-icons/io5";
import { HiUser } from "react-icons/hi";

export default function SideNav() {
	// Get auth data from context, and set tab for profile page
	const { user, setUser, cookies, removeCookie, setTab } =
		useContext(AuthContext);

	// To redirect
	const navigate = useNavigate();

	// Get url path
	const location = useLocation();

	// Styling for active nav item
	const activeNav = "bg-gray-100 text-grape";
	const inactiveNav = "text-white hover:bg-gray-100 hover:text-grape";

	// Log out the user
	const handleLogout = () => {
		// axios.get("/sanctum/csrf-cookie").then((response) => {
		axios
			.get("/api/logout", {
				headers: {
					Authorization: `Bearer ${cookies.Token}`,
				},
			})
			.then((res) => {
				removeCookie("Token");
				setUser({ name: "", email: "" });
				navigate("/register");
			})
			.catch((err) => {
				console.log(err);
			});
		// });
	};
	return (
		<>
			{/* {hide ? (
				""
			) : (
				<> */}
			<aside
				className="hidden md:block w-32 md:w-48 lg:w-56 "
				aria-label="Sidebar"
			>
				<div className="sticky top-0 flex flex-col gap-11  overflow-y-auto py-4 px-3 bg-grape rounded-tr-[94px] dark:bg-gray-800 h-screen">
					<Link to="/">
						<img src={logo} alt="" className="w-10/12 -mt-2" />
					</Link>
					<ul className="space-y-2 pl-3">
						<li>
							<Link
								to={"/"}
								className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
									location.pathname == "/" ? activeNav : inactiveNav
								}`}
							>
								<AiFillHome size="22" />
								<span className="ml-3">Home</span>
							</Link>
						</li>
						<li>
							<Link
								to="/workouts"
								className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
									location.pathname == "/workouts" ? activeNav : inactiveNav
								}`}
							>
								{/* <CgGym size="22" /> */}
								<GiWeightLiftingUp size="22" />
								<span className="flex-1 ml-3 whitespace-nowrap">Workouts</span>
							</Link>
						</li>
						<li>
							<Link
								to="/bmi"
								className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
									location.pathname == "/bmi" ? activeNav : inactiveNav
								}`}
							>
								<FaWeight size="20" />
								<span className="flex-1 ml-3 whitespace-nowrap">
									BMI calculator
								</span>
							</Link>
						</li>
						<li>
							<Link
								to="/nutrition"
								className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
									location.pathname == "/nutrition" ? activeNav : inactiveNav
								}`}
							>
								<IoFastFood size="22" />
								<span className="flex-1 ml-3 whitespace-nowrap">Nutrition</span>
							</Link>
						</li>
						<li>
							<Link
								className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
									location.pathname == "/calc" ? activeNav : inactiveNav
								}`}
							>
								<AiFillCalculator size="22" />
								<span className="flex-1 ml-3 whitespace-nowrap">
									Calories Calc
								</span>
							</Link>
						</li>
						{user.name ? (
							<>
								<li>
									<Link
										onClick={() => setTab("logs")}
										to="/profile"
										className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
											location.pathname == "/profile" ? activeNav : inactiveNav
										}`}
									>
										<HiUser size="22" />
										<span className="flex-1 ml-3 whitespace-nowrap">
											User Dashboard
										</span>
									</Link>
								</li>
								<li>
									<button
										className={`flex items-center p-2 text-base font-normal  rounded-lg  ${inactiveNav}`}
										onClick={handleLogout}
									>
										<IoLogOut size="22" />
										<span className="flex-1 ml-3 whitespace-nowrap">
											Logout
										</span>
									</button>
								</li>
							</>
						) : (
							<li>
								<Link
									to="/register"
									className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
										location.pathname == "/register" ? activeNav : inactiveNav
									}`}
								>
									<FaUserPlus size="22" />
									<span className="flex-1 ml-3 whitespace-nowrap">Sign Up</span>
								</Link>
							</li>
						)}
					</ul>
					{user.name && (
						<h1 className="text-white font-bold absolute bottom-5 left-8">
							Hi, {user.name}{" "}
						</h1>
					)}
				</div>
			</aside>

			<aside className="block md:hidden w-full" aria-label="Sidebar">
				<div className="fixed bottom-0 left-0 right-0 z-10 py-6 px-3 bg-grape rounded-t-[20px] dark:bg-gray-800 ">
					{/* <img
						src={logo}
						alt=""
						className="w-20 h-10 object-cover absolute left-2"
					/> */}
					<div className="flex justify-center gap-2 sm:gap-5 ">
						<Link
							to={"/"}
							className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
								location.pathname == "/" ? activeNav : inactiveNav
							}`}
						>
							<AiFillHome size="25" />
						</Link>

						<Link
							to="/workouts"
							className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
								location.pathname == "/workouts" ? activeNav : inactiveNav
							}`}
						>
							{/* <CgGym size="25" /> */}
							<GiWeightLiftingUp size="25" />
						</Link>

						<Link
							to="/bmi"
							className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
								location.pathname == "/bmi" ? activeNav : inactiveNav
							}`}
						>
							<FaWeight size="23" />
						</Link>

						<Link
							to="/nutrition"
							className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
								location.pathname == "/nutrition" ? activeNav : inactiveNav
							}`}
						>
							<IoFastFood size="25" />
						</Link>

						<Link
							className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
								location.pathname == "/calc" ? activeNav : inactiveNav
							}`}
						>
							<AiFillCalculator size="25" />
						</Link>

						{user.name ? (
							<>
								<Link
									onClick={() => setTab("logs")}
									to="/profile"
									className={`flex items-center p-2 text-base font-normal  rounded-lg  ${
										location.pathname == "/profile" ? activeNav : inactiveNav
									}`}
								>
									<HiUser size="25" />
								</Link>

								<button
									className={`flex items-center p-2 text-base font-normal  rounded-lg  ${inactiveNav}`}
									onClick={handleLogout}
								>
									<IoLogOut size="25" />
								</button>
							</>
						) : (
							<Link
								to="/register"
								className="flex items-center p-2 text-base font-normal  rounded-lg  "
							>
								<FaUserPlus size="25" />
							</Link>
						)}
					</div>
				</div>
			</aside>
			{/* </>
			)} */}
		</>
	);
}
