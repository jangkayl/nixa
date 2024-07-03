"use client";
import React, { useState } from "react";
import ProfilePost from "./ProfilePost";

const ButtonsProfile = ({ posts }: any) => {
	const [selected, setSelected] = useState("Posts");

	const handleSelect = (buttonName: string) => {
		setSelected(buttonName);
	};

	return (
		<div>
			<div className="w-full border-b px-4 py-2 text-sm font-semibold space-x-7">
				<button
					className={`group relative w-max ${
						selected === "Posts" ? "text-blue-500" : "text-gray-500"
					}`}
					onClick={() => handleSelect("Posts")}>
					<span>Posts</span>
					<span
						className={`absolute -bottom-[.20rem] left-1/2 w-0 transition-all h-0.5 bg-blue-400 group-hover:w-3/6 ${
							selected === "Posts" ? "w-3/6" : ""
						}`}></span>
					<span
						className={`absolute -bottom-[.20rem] right-1/2 w-0 transition-all h-0.5 bg-blue-400 group-hover:w-3/6 ${
							selected === "Posts" ? "w-3/6" : ""
						}`}></span>
				</button>
				<button
					className={`group relative w-max ${
						selected === "Comments" ? "text-blue-500" : "text-gray-500"
					}`}
					onClick={() => handleSelect("Comments")}>
					<span>Comments</span>
					<span
						className={`absolute -bottom-[.20rem] left-1/2 w-0 transition-all h-0.5 bg-blue-400 group-hover:w-3/6 ${
							selected === "Comments" ? "w-3/6" : ""
						}`}></span>
					<span
						className={`absolute -bottom-[.20rem] right-1/2 w-0 transition-all h-0.5 bg-blue-400 group-hover:w-3/6 ${
							selected === "Comments" ? "w-3/6" : ""
						}`}></span>
				</button>
			</div>
			<ProfilePost posts={posts} />
		</div>
	);
};

export default ButtonsProfile;
