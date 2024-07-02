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
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const Comment = ({ commentId, comment, originalId }: any) => {
	const { data: session } = useSession();
	const db = getFirestore(app);
	const [isLiked, setIsLiked] = useState(false);
	const [likes, setLikes] = useState<DocumentData[]>([]);

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

	return (
		<div>
			<div className="border-b p-3 hover:bg-gray-50">
				<div className="flex items-start justify-between ml-4">
					<div>
						<Image
							src={comment?.userImg}
							alt="profile"
							width={35}
							height={1}
							className="rounded-full p-[1px] border-gray-300 border"
						/>
					</div>
					<div className=" flex-1 pl-3">
						<div className="flex items-center gap-1">
							<p className="text-sm font-bold truncate">{comment.name}</p>
							<p className="text-xs text-gray-400 truncate">
								@{comment.username}
							</p>
						</div>
						<p className="text-[0.84rem] pt-2">{comment.comment}</p>
						<div className="flex items-center pt-1 text-gray-500">
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
					</div>
					<BsThreeDots
						size={17}
						className="cursor-pointer"
					/>
				</div>
			</div>
		</div>
	);
};

export default Comment;
