"use client";
import { app } from "@/app/firebase";
import {
	collection,
	DocumentData,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Comment from "@/components/Comment";
import { useRecoilState } from "recoil";
import { postIdState } from "@/app/atom/modalAtom";

const ComComProfile = ({ id, reply }: any) => {
	const [postId, setPostId] = useRecoilState(postIdState);
	const db = getFirestore(app);
	const [comments, setComments] = useState<DocumentData>([]);
	useEffect(() => {
		setPostId(id);
		onSnapshot(
			query(
				collection(db, "posts", id, "comments"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => {
				setComments(snapshot.docs);
			}
		);
	}, [db, id, setPostId]);

	return (
		<div>
			{comments.map((comment: any) => {
				const commentData = comment.data();
				return (
					<div key={comment.id}>
						{commentData.username === reply && (
							<Comment
								commentId={comment.id}
								comment={commentData}
								originalId={id}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default ComComProfile;
