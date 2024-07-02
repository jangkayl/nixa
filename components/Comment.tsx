import { app } from "@/app/firebase";
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getFirestore,
	onSnapshot,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { HiHeart, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
import Moment from "react-moment";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Comment = ({ commentId, comment, originalId }: any) => {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState<DocumentData[]>([]);
	const [modal, setModal] = useState(false);

	const likePost = async () => {
		if (session && session.user && session.user.uid) {
			if (isLiked) {
				await deleteDoc(
					doc(
						db,
						"posts",
						originalId,
						"comments",
						commentId,
						"likes",
						session.user.uid
					)
				);
			} else {
				await setDoc(
					doc(
						db,
						"posts",
						originalId,
						"comments",
						commentId,
						"likes",
						session.user.uid
					),
					{
						username: session.user.username,
						timestamp: serverTimestamp(),
					}
				);
			}
		} else {
			signIn();
		}
	};

	useEffect(() => {
		onSnapshot(
			collection(db, "posts", originalId, "comments", commentId, "likes"),
			(snapshot) => {
				setLikes(snapshot.docs);
			}
		);
	}, [commentId, db, originalId]);

	useEffect(() => {
		if (session) {
			setIsLiked(
				likes.findIndex((like) => like.id === session.user.uid) !== -1
			);
		}
	}, [likes, session, session?.user.uid]);

	const deleteModal = () => {
		setModal(true);
	};

	const deletePost = async () => {
		deleteDoc(doc(db, "posts", originalId, "comments", commentId))
			.then(() => {
				console.log("Nix deleted successfully");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
				window.location.reload();
			});
	};

	console.log(session?.user.uid);
	console.log(comment.uid);

	return (
		<div>
			<div className="border-b p-3 hover:bg-gray-50">
				<div className="flex items-start justify-between ml-4">
					<div>
						<Image
							src={comment?.userImg}
							alt="profile"
							width={35}
							height={35}
							className="rounded-full p-[1px] border-gray-300 border"
						/>
					</div>
					<div className="flex-1 pl-3">
						<div className="flex items-center gap-1 truncate max-w-[15.8rem] sm:max-w-full">
							<p className="text-sm font-bold truncate">{comment.name}</p>
							<p className="text-xs text-gray-400 truncate">
								@{comment.username}
							</p>
						</div>
						<div className="flex items-center pt-2 gap-2">
							<p className="text-[0.84rem]">{comment.comment}</p>
							<Moment
								fromNow
								className="text-[0.71rem] text-gray-400">
								{comment?.timestamp?.toDate()}
							</Moment>
						</div>
						<div className="flex items-center pt-1 text-gray-500 gap-6">
							<div className="flex items-center">
								{isLiked ? (
									<HiHeart
										size={33}
										className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 text-red-600 rounded-full transition-all duration-150"
										onClick={likePost}
									/>
								) : (
									<HiOutlineHeart
										size={33}
										className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150"
										onClick={likePost}
									/>
								)}
								{likes.length > 0 && (
									<p className={`text-xs ${isLiked && "text-red-500"}`}>
										{likes.length}
									</p>
								)}
							</div>
							{session?.user.uid === comment.uid && (
								<HiOutlineTrash
									size={33}
									className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150"
									onClick={deleteModal}
								/>
							)}
						</div>
					</div>
					<BsThreeDots
						size={17}
						className="cursor-pointer"
					/>
				</div>
			</div>
			{/* Modal */}
			{modal && (
				<Modal
					isOpen={true}
					onRequestClose={() => setModal(false)}
					ariaHideApp={false}
					className="fixed bg-white p-5 rounded-lg top-40 left-[50%]
					translate-x-[-50%] border w-[20rem] justify-center items-center flex flex-col text-gray-500 text-center gap-4 shadow-lg outline-none">
					<IoClose
						size={30}
						className="absolute top-2 right-2 hover:text-black cursor-pointer p-1 hover:bg-gray-200 rounded-xl"
						onClick={(e) => setModal(false)}
					/>
					<AiOutlineExclamationCircle size={70} />
					<p>Are you sure you want to delete this nix?</p>
					<div className="space-x-[1rem] text-sm">
						<button
							className="px-5 py-2 bg-red-500 rounded-lg text-white hover:scale-105 transition-all duration-150"
							onClick={deletePost}>
							Yes, Nix
						</button>
						<button
							className="px-5 py-2 border rounded-lg text-black hover:scale-105 hover:bg-blue-300 hover:text-white transition-all duration-150"
							onClick={(e) => setModal(false)}>
							No, cancel
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default Comment;
