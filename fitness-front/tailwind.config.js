/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				main: "rgba(217, 137, 181, 0.32)",
				grape: "rgba(134, 58, 111, 1)",
				grapeSh: "rgba(134, 58, 111, 0.6)",
				creamy: "rgba(255, 255, 255, 0.68)",
				glass: "rgba(0,0,0,0.2)",
			},
			display: ["group-hover"],
		},
	},
	plugins: [require("flowbite/plugin")],
};
