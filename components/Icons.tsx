"use client";
import { FaRegCommentDots } from "react-icons/fa6";
import { HiOutlineHeart, HiHeart, HiOutlineTrash } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
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
import { app } from "@/app/firebase";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "@/app/atom/modalAtom";
import useLongPress from "@/app/hooks/UseLongPress";
import LikeModal from "./LikeModal";

const Icon = ({ id, uid }: any) => {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState<DocumentData[]>([]);
	const [modal, setModal] = useState(false);
	const [open, setOpen] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	const [comments, setComments] = useState<DocumentData[]>([]);
	const [isModalVisible, setModalVisible] = useState(false);

	const showModal = () => setModalVisible(true);
	const hideModal = () => setModalVisible(false);

	const longPressEvent = useLongPress(showModal, 500, id);

	const likePost = async () => {
		if (session && session.user && session.user.uid) {
			if (isLiked) {
				await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
			} else {
				await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
					userImg: session.user.image,
					username: session.user.username,
					name: session.user.name,
					timestamp: serverTimestamp(),
					uid: session.user.uid,
				});
			}
		} else {
			signIn();
		}
	};

	const deleteModal = () => {
		setModal(true);
	};

	const deletePost = async () => {
		deleteDoc(doc(db, "posts", id))
			.then(() => {
				console.log("Nix deleted successfully");
				window.location.reload();
			})
			.catch((error) => {
				console.log(error);
				window.location.reload();
			});
	};

	useEffect(() => {
		onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
			setLikes(snapshot.docs);
		});
	}, [db, id]);

	useEffect(() => {
		onSnapshot(collection(db, "posts", id, "comments"), (snapshot) => {
			setComments(snapshot.docs);
		});
	}, [db, id]);

	useEffect(() => {
		if (session) {
			setIsLiked(
				likes.findIndex((like) => like.id === session.user.uid) !== -1
			);
		}
	}, [likes, session, session?.user.uid]);

	return (
		<div>
			<div className="flex gap-7 text-gray-500 items-center pt-2">
				<div className="flex items-center">
					<FaRegCommentDots
						size={32}
						className="cursor-pointer hover:bg-sky-100 hover:text-sky-400 p-2 rounded-full transition-all duration-150 dark:hover:bg-gray-800"
						onClick={() => {
							if (!session) {
								signIn();
							} else {
								setOpen(!open);
								setPostId(id);
							}
						}}
					/>
					{comments.length > 0 && <p className="text-sm">{comments.length}</p>}
				</div>
				<div
					className="flex items-center cursor-pointer"
					onClick={likePost}
					{...longPressEvent}>
					{isLiked ? (
						<HiHeart
							size={33}
							className="cursor-pointer hover:bg-red-100 hover:text-red-400 dark:hover:bg-red-950 p-2 text-red-600 rounded-full transition-all duration-150"
						/>
					) : (
						<HiOutlineHeart
							size={33}
							className="cursor-pointer hover:bg-red-100 hover:text-red-400 dark:hover:bg-red-950 p-2 rounded-full transition-all duration-150"
						/>
					)}
					{likes.length > 0 && (
						<p className={`text-xs ${isLiked && "text-red-500"}`}>
							{likes.length}
						</p>
					)}
				</div>
				{session?.user.uid === uid && (
					<HiOutlineTrash
						size={33}
						className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150 dark:hover:bg-red-950"
						onClick={deleteModal}
					/>
				)}
			</div>
			{/* Modal */}
			{modal && (
				<Modal
					isOpen={true}
					onRequestClose={() => setModal(false)}
					ariaHideApp={false}
					className="fixed bg-white p-5 rounded-lg top-40 left-[50%]
					translate-x-[-50%] border w-[20rem] justify-center items-center flex flex-col text-gray-500 text-center gap-4 shadow-lg outline-none dark:bg-zinc-900"
					overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<IoClose
						size={30}
						className="absolute top-2 right-2 hover:text-black cursor-pointer p-1 hover:bg-gray-200  dark:text-white rounded-xl dark:hover:bg-gray-800"
						onClick={(e) => setModal(false)}
					/>
					<AiOutlineExclamationCircle
						size={70}
						className="dark:text-gray-300"
					/>
					<p className="dark:text-gray-300">
						Are you sure you want to delete this nix?
					</p>
					<div className="space-x-[1rem] text-sm">
						<button
							className="px-5 py-2 bg-red-500 rounded-lg text-white hover:scale-105 transition-all duration-150"
							onClick={deletePost}>
							Yes, Nix
						</button>
						<button
							className="px-5 py-2 border rounded-lg text-black hover:scale-105 hover:bg-blue-300 hover:text-white transition-all duration-150 dark:text-gray-300 dark:hover:bg-blue-900"
							onClick={(e) => setModal(false)}>
							No, cancel
						</button>
					</div>
				</Modal>
			)}
			<LikeModal
				isVisible={isModalVisible}
				onClose={hideModal}
				className="z-20"
			/>
		</div>
	);
};

export default Icon;
