"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/logo.png";
import profile from "@/public/profile.png";
import Link from "next/link";

const MobileSidebar = () => {
	const { data: session } = useSession();
	const [menu, setMenu] = useState(false);

	const showMenu = () => {
		setMenu(!menu);
	};

	return (
		<>
			{!session && (
				<Image
					src={logo || ""}
					alt="user-profile"
					width={30}
					height={30}
					className="rounded-full cursor-pointer hover:scale-110 transition-all duration-150 sm:hidden block"
					onClick={() => signIn()}
				/>
			)}
			{session && (
				<div>
					<div>
						<Image
							src={session?.user.image || profile}
							alt="user-profile"
							width={30}
							height={30}
							className="rounded-full cursor-pointer hover:scale-110 transition-all duration-150 sm:hidden block"
							onClick={showMenu}
						/>
					</div>

					<div
						className={`${
							menu ? "block" : "hidden"
						}  z-50 my-4 list-none bg-white divide-y divide-gray-100 rounded-lg shadow fixed top-7 right-3 transition-all duration-150 hover:scale-105 font-semibold`}>
						<div className="px-4 py-3">
							<span className="block text-sm font-bold">
								{session.user.name}
							</span>
							<span className="block text-xs text-gray-400 truncate font-medium">
								{session.user.email}
							</span>
						</div>
						<ul className="py-2">
							<li>
								<Link
									href={`/user/${session?.user?.uid}`}
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ">
									Profile
								</Link>
							</li>
							<li>
								<p
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
									onClick={() => signOut()}>
									Sign out
								</p>
							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	);
};

export default MobileSidebar;