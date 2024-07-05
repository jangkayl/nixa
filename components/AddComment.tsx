"use client";
import { comReplyModalState } from "@/app/atom/modalAtom";
import { app } from "@/app/firebase";
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import { useRouter } from "next/navigation";

const AddComment = ({
	replyOpen,
	setReplyOpen,
	commentId,
	comment,
	originalId,
}: any) => {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [input, setInput] = useState("");
	const router = useRouter();

	const addComment = async () => {
		addDoc(
			collection(db, "posts", originalId, "comments", commentId, "replies"),
			{
				name: session?.user.name,
				username: session?.user.username,
				userImg: session?.user.image,
				comment: input,
				uid: session?.user.uid,
				timestamp: serverTimestamp(),
			}
		)
			.then(() => {
				setInput("");
				router.push(`/posts/${originalId}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{replyOpen && (
				<Modal
					isOpen={replyOpen}
					ariaHideApp={false}
					onRequestClose={() => setReplyOpen(false)}
					className="max-w-lg w-[90%] absolute top-24 left-[50%] bg-white translate-x-[-50%] border px-5 py-3 outline-none rounded-lg shadow-xl border-gray-300 dark:bg-zinc-900"
					overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="w-[99%] border-b py-3 flex items-center gap-3">
						<IoClose
							size={20}
							onClick={() => setReplyOpen(false)}
							className="cursor-pointer"
						/>
						<p>Reply</p>
					</div>
					{comment && (
						<div onClick={(e) => e.stopPropagation()}>
							<div className="p-2 flex flex-col">
								<span className="w-0.5 h-[35%] z-[-1] absolute left-[2.9rem] top-15 bg-gray-300" />
								<div className="flex text-sm items-center gap-2">
									<Image
										src={session?.user?.image || ""}
										alt="userImage"
										width={40}
										height={1}
										className="rounded-full"
									/>
									<p className="font-bold truncate dark:text-white">
										{comment?.name}
									</p>
									<p className="text-gray-500 truncate">@{comment?.username}</p>
								</div>
								<p className="pl-12 text-[0.85rem] text-gray-500">
									{comment?.comment}
								</p>
								<div className="flex">
									<div>
										<Image
											src={session?.user?.image || ""}
											alt="userImage"
											width={40}
											height={1}
											className="rounded-full"
										/>
									</div>
									<div className="pb-1 w-full border-b pl-1">
										<textarea
											rows={2}
											placeholder="Post your reply"
											className="p-2 w-full outline-none dark:bg-inherit"
											value={input}
											onChange={(e) => setInput(e.target.value)}
											onClick={(e) => e.stopPropagation()}
										/>
									</div>
								</div>
							</div>
							<div className="text-right">
								<button
									className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
									disabled={input.trim() === ""}
									onClick={() => {
										addComment();
										setReplyOpen(false);
									}}>
									Reply
								</button>
							</div>
						</div>
					)}
				</Modal>
			)}
		</div>
	);
};

export default AddComment;
