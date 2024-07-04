"use client";
import { app } from "@/app/firebase";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";

const EditComment = ({ commentId, comment, postId }: any) => {
	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);
	const [newCom, setNewCom] = useState("");
	const db = getFirestore(app);

	useEffect(() => {
		setNewCom(comment.comment);
		if (!isOpen) setNewCom("");
	}, [comment.comment, comment.text, isOpen]);

	const handleUpdatePost = async () => {
		const postDocRef = doc(db, "posts", postId, "comments", commentId);
		try {
			await updateDoc(postDocRef, {
				comment: newCom,
			});
			setIsOpen(false);
		} catch (error) {
			console.error("Error updating post: ", error);
		}
	};

	return (
		<div>
			{session?.user.uid === comment.uid && (
				<FiEdit2
					size={15}
					className="cursor-pointer"
					onClick={() => setIsOpen(true)}
				/>
			)}
			<Modal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				ariaHideApp={false}
				className="bg-white p-4 rounded-xl border-gray-300 border fixed top-30 left-[50%] translate-x-[-50%] outline-none max-w-sm w-full h-auto max-h-[35rem] dark:bg-zinc-900"
				overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
				<IoClose
					size={20}
					onClick={() => setIsOpen(false)}
					className="cursor-pointer fixed right-3 top-3"
				/>
				<p className="font-semibold pb-2 mb-2 border-b">Edit Post</p>
				<div>
					<div className="flex items-center gap-2 py-2">
						<Image
							src={session?.user.image || ""}
							alt="profileImg"
							width={40}
							height={40}
							unoptimized
							className="rounded-full"
						/>
						<p className="text-sm font-semibold">{comment.name}</p>
						<p className="truncate text-xs text-gray-400">
							@{comment.username}
						</p>
					</div>
					{comment.image && (
						<Image
							src={comment.image}
							alt={comment.username}
							width={500}
							height={500}
							className="max-h-[20rem] object-contain"
						/>
					)}
					<textarea
						rows={2}
						value={newCom}
						onChange={(e) => setNewCom(e.target.value)}
						className="w-full p-2 mt-2 text-sm rounded-lg mb-2"
					/>
					<div className="w-full text-right">
						<button
							className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed text-sm"
							disabled={newCom === comment.comment || newCom.trim() === ""}
							onClick={handleUpdatePost}>
							Edit
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default EditComment;
