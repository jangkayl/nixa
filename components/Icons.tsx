"use client";
import { FaRegCommentDots } from "react-icons/fa6";
import { HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

import React from "react";

const Icon = () => {
	return (
		<div className="flex gap-7 text-gray-500 items-center pt-2">
			<FaRegCommentDots
				size={32}
				className="cursor-pointer hover:bg-sky-100 hover:text-sky-400 p-2 rounded-full transition-all duration-150"
			/>
			<HiOutlineHeart
				size={33}
				className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150"
			/>
			<HiOutlineTrash
				size={33}
				className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150"
			/>
		</div>
	);
};

export default Icon;
