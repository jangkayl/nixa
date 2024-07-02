"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Back = () => {
	const router = useRouter();
	return (
		<div className="flex items-center gap-2 p-3 border-b">
			<button
				onClick={() => router.back()}
				className="flex items-center gap-2">
				<IoArrowBack
					size={30}
					className="hover:bg-gray-100 rounded-full p-1 transition-all duration-150"
				/>
			</button>
			<p>Back</p>
		</div>
	);
};

export default Back;
