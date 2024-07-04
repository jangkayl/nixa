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
import { useRecoilState } from "recoil";
import {
	likeCommentIdState,
	modalState,
	postIdState,
} from "@/app/atom/modalAtom";
import ComLikeModal from "./ComLikeModal";
import useComLikeLongPress from "@/app/hooks/ComLikeLongPress";

const Comment = ({ commentId, comment, originalId }: any) => {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState<DocumentData[]>([]);
	const [modal, setModal] = useState(false);
	const [open, setOpen] = useRecoilState(modalState);
	const [likeComment, setLikeComment] = useRecoilState(likeCommentIdState);
	const [isModalVisible, setModalVisible] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [postId, setPostId] = useRecoilState(postIdState);

	const showModal = () => setModalVisible(true);
	const hideModal = () => setModalVisible(false);

	const id = commentId;
	const longPressEvent = useComLikeLongPress(showModal, 500, id);

	const likePost = async () => {
		if (session && session.user && session.user.uid) {
			setLikeComment(commentId);
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
						userImg: session.user.image,
						username: session.user.username,
						name: session.user.name,
						timestamp: serverTimestamp(),
						uid: session.user.uid,
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
			})
			.catch((error) => {
				console.log(error);
				window.location.reload();
			});
	};

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<div
				className="border-b p-3 hover:bg-gray-50 dark:hover:bg-zinc-900"
				onPointerDown={() => setPostId(originalId)}>
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
					<div className="flex-1 pl-3 overflow-x-hidden">
						<div className="flex items-center gap-1 truncate">
							<p className="text-sm font-bold truncate">{comment.name}</p>
							<p className="text-xs text-gray-400 truncate">
								@{comment.username}
							</p>
						</div>
						<div className="flex items-center pt-2 gap-2 w-auto ">
							<p
								className={`text-[0.84rem] max-w-[12.5rem] sm:max-w-xs cursor-pointer ${
									isExpanded ? "" : "truncate"
								}`}
								onClick={toggleExpand}>
								{comment.comment}
							</p>
							<Moment
								fromNow
								className="text-[0.71rem] text-gray-400">
								{comment?.timestamp?.toDate()}
							</Moment>
						</div>
						<div className="flex items-center pt-1 text-gray-500 gap-6">
							<div
								className="flex items-center cursor-pointer"
								onClick={likePost}
								{...longPressEvent}>
								{isLiked ? (
									<HiHeart
										size={33}
										className="hover:bg-red-100 hover:text-red-400 p-2 text-red-600 rounded-full transition-all duration-150 dark:hover:bg-red-950"
									/>
								) : (
									<HiOutlineHeart
										size={33}
										className="hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150 dark:hover:bg-red-950"
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
									className="cursor-pointer hover:bg-red-100 hover:text-red-400 p-2 rounded-full transition-all duration-150 dark:hover:bg-red-950"
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
					translate-x-[-50%] border w-[20rem] justify-center items-center flex flex-col text-gray-500 text-center gap-4 shadow-lg outline-none dark:bg-zinc-900 "
					overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<IoClose
						size={30}
						className="absolute top-2 right-2 hover:text-black cursor-pointer p-1 hover:bg-gray-200 rounded-xl dark:text-white dark:hover:bg-gray-800"
						onClick={(e) => setModal(false)}
					/>
					<AiOutlineExclamationCircle size={70} className="dark:text-gray-300"/>
					<p className="dark:text-gray-300">Are you sure you want to delete this nix?</p>
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
			<ComLikeModal
				isVisible={isModalVisible}
				onClose={hideModal}
			/>
		</div>
	);
};

export default Comment;
