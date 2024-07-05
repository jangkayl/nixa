"use client";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

const BackProfile = () => {
	const router = useRouter();
	return (
		<div className="flex items-center p-2 fixed top-0 z-10">
			<button
				onClick={() => router.back()}
				className="flex items-center gap-2">
				<IoArrowBack
					size={30}
					className="hover:bg-gray-100 rounded-full p-1 transition-all duration-150 dark:hover:bg-gray-900"
				/>
			</button>
		</div>
	);
};

export default BackProfile;
