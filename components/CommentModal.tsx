"use client";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/app/atom/modalAtom";
import { useSession } from "next-auth/react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import {
	addDoc,
	collection,
	doc,
	getFirestore,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore";
import { app } from "@/app/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PostProps {
	profileImg: string;
	username: string;
	name: string;
	text: string;
}

const CommentModal = () => {
	const [open, setOpen] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	const [post, setPost] = useState<PostProps | null>(null);
	const db = getFirestore(app);
	const { data: session } = useSession();
	const [input, setInput] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (postId !== "") {
			const postRef = doc(db, "posts", postId);
			const unsubscribe = onSnapshot(postRef, (snapshot) => {
				const postData = snapshot.data() as PostProps;
				if (snapshot.exists()) {
					setPost(postData);
				} else {
					console.log("No such document!");
				}
			});
			return () => unsubscribe();
		}
	}, [db, postId, setPostId]);

	const addComment = async () => {
		addDoc(collection(db, "posts", postId, "comments"), {
			name: session?.user.name,
			username: session?.user.username,
			userImg: session?.user.image,
			comment: input,
			uid: session?.user.uid,
			timestamp: serverTimestamp(),
		})
			.then(() => {
				setInput("");
				setOpen(false);
				router.push(`/posts/${postId}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{open && (
				<Modal
					isOpen={open}
					ariaHideApp={false}
					onRequestClose={() => setOpen(false)}
					className="max-w-lg w-[90%] absolute top-24 left-[50%] bg-white translate-x-[-50%] border px-5 py-3 outline-none rounded-lg shadow-xl border-gray-300 dark:bg-zinc-900"
					overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="w-[99%] border-b py-3">
						<IoClose
							size={20}
							onClick={() => setOpen(false)}
							className="cursor-pointer"
						/>
					</div>
					{post && (
						<div>
							<div className="p-2 flex flex-col gap-10">
								<span className="w-0.5 h-[35%] z-[-1] absolute left-[2.9rem] top-15 bg-gray-300" />
								<div className="flex text-sm items-center gap-2">
									<Image
										src={post.profileImg}
										alt="userImage"
										width={40}
										height={1}
										className="rounded-full"
									/>
									<p className="font-bold truncate dark:text-white">
										{post?.name}
									</p>
									<p className="text-gray-500 truncate">@{post?.username}</p>
								</div>
								<p className="ml-12 mt-11 absolute text-[0.85rem] text-gray-500">
									{post?.text}
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
											className="p-2 w-full outline-none"
											value={input}
											onChange={(e) => setInput(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="text-right">
								<button
									className="bg-blue-500 text-white px-5 py-2 rounded-full font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed"
									disabled={input.trim() === ""}
									onClick={addComment}>
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

export default CommentModal;
