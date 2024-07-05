"use client";
import React, { useState } from "react";
import ProfilePost from "./ProfilePost";
import CommentProfile from "./CommentProfile";

const ButtonsProfile = ({ posts, comments }: any) => {
	const [selected, setSelected] = useState("Posts");

	const handleSelect = (buttonName: string) => {
		setSelected(buttonName);
	};

	return (
		<div>
			<div className="sticky top-0 bg-white dark:bg-[#121212] z-[1]">
				<div className="w-full border-b px-4 py-3 text-sm font-semibold space-x-7 text-center">
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
			</div>
			<div className={`${selected === "Posts" ? "block" : "hidden"}`}>
				<ProfilePost posts={posts} />
			</div>
			<div className={`${selected === "Comments" ? "block" : "hidden"}`}>
				<CommentProfile
					username={posts[0].username}
					comments={comments}
				/>
			</div>
		</div>
	);
};

export default ButtonsProfile;
