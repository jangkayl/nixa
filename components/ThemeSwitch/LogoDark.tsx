"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/public/logo.png";
import darkX from "@/public/dark-x.png";
import useResolvedTheme from "@/app/hooks/useResolvedTheme";

const LogoDark = () => {
	const isDarkMode = useResolvedTheme();
	return (
		<div>
			<Link
				href="#home"
				scroll={false}>
				{isDarkMode ? (
					<Image
						className="block sm:hidden hover:scale-105 transition-all duration-150 cursor-pointer"
						src={darkX}
						width={30}
						height={30}
						alt="logo"
						unoptimized
					/>
				) : (
					<Image
						className="block sm:hidden hover:scale-105 transition-all duration-150 cursor-pointer"
						src={logo}
						width={30}
						height={30}
						alt="logo"
						unoptimized
					/>
				)}
			</Link>
		</div>
	);
};

export default LogoDark;
