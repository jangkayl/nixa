"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { HiMiniHome } from "react-icons/hi2";
import { signIn, signOut, useSession } from "next-auth/react";
import profile from "@/public/profile.png";
import { HiUser } from "react-icons/hi2";
import ThemeSwitch from "./ThemeSwitch/ThemeSwitch";
import darkX from "@/public/dark-x.png";
import useResolvedTheme from "@/app/hooks/useResolvedTheme";

const Sidebar = () => {
	const { data: session } = useSession();
	const isDarkMode = useResolvedTheme();

	return (
		<div className="flex flex-col justify-between h-screen">
			<div className="flex flex-col gap-2 pt-4 items-center lg:items-start">
				<Link href="/">
					{isDarkMode ? (
						<Image
							src={darkX}
							alt="logo"
							priority
							className="w-16 h-16 rounded-full p-2 transition-all duration-200 dark:hover:bg-gray-800"
						/>
					) : (
						<Image
							src={logo}
							alt="logo"
							priority
							className="w-16 h-16 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
						/>
					)}
				</Link>
				<Link
					href="/"
					className="flex gap-2 items-center hover:bg-gray-100 rounded-full p-2 transition-all duration-200 sm:w-fit md:w-fit lg:w-full dark:hover:bg-gray-800">
					<HiMiniHome size={30} />
					<h1 className="font-bold text-md hidden lg:block">Home</h1>
				</Link>
				{session ? (
					<Link
						href={`/user/${session?.user?.uid}`}
						className="flex gap-2 items-center hover:bg-gray-100 rounded-full p-2 transition-all duration-200  lg:w-full sm:w-fit md:w-fit dark:hover:bg-gray-800">
						<HiUser size={30} />
						<h1 className="font-bold text-md hidden lg:block">Profile</h1>
					</Link>
				) : (
					<button
						onClick={() => signIn()}
						className="flex gap-2 items-center hover:bg-gray-100 rounded-full p-2 transition-all duration-200  lg:w-full sm:w-fit md:w-fit">
						<HiUser size={30} />
						<h1 className="font-bold text-md hidden lg:block">Profile</h1>
					</button>
				)}
				{session ? (
					<button
						className="font-medium text-md rounded-full h-9 w-48 text-white bg-blue-400 hover:bg-blue-500 transition-all duration-200 lg:block hidden shadow-md"
						onClick={() => signOut()}>
						Sign Out
					</button>
				) : (
					<button
						className="font-medium text-md rounded-full h-9 w-48 text-white bg-blue-400 hover:bg-blue-500 transition-all duration-200 lg:block hidden shadow-md"
						onClick={() => signIn()}>
						Sign In
					</button>
				)}
			</div>
			{session && (
				<div className="flex flex-col items-center">
					<ThemeSwitch />
					<div className="flex justify-between items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-200 rounded-full dark:hover:bg-gray-800">
						<Image
							src={session?.user?.image || profile}
							alt="user-image"
							width={40}
							height={40}
							className="rounded-full w-fit"
						/>
						<div className="hidden lg:block">
							<p className="text-sm font-semibold">{session?.user?.name}</p>
							<p className="text-xs text-gray-400 font-medium">
								@{session?.user?.username}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
