"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (resolvedTheme === "dark")
		return (
			<div
				className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-800 transition-all duration-200 rounded-full lg:w-full sm:w-fit md:w-fit"
				onClick={() => setTheme("light")}>
				<IoSunnyOutline className="text-xl sm:text-3xl" />
				<p className="font-bold hidden lg:block">Light</p>
			</div>
		);

	if (resolvedTheme === "light")
		return (
			<div
				className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200 lg:w-full sm:w-fit md:w-fit"
				onClick={() => setTheme("dark")}>
				<FiMoon className="text-xl sm:text-3xl" />
				<p className="font-bold hidden lg:block">Dark</p>
			</div>
		);
};

export default ThemeSwitch;
