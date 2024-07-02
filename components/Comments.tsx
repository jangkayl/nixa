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
import Comment from "./Comment";

const Comments = ({ id }: any) => {
	const db = getFirestore(app);
	const [comments, setComments] = useState<DocumentData>([]);
	useEffect(() => {
		onSnapshot(
			query(
				collection(db, "posts", id, "comments"),
				orderBy("timestamp", "desc")
			),
			(snapshot) => {
				setComments(snapshot.docs);
			}
		);
	}, [db, id]);

	return (
		<div>
			{comments.map((comment: any) => (
				<Comment
					key={comment.id}
					commentId={comment.id}
					comment={comment.data()}
					originalId={id}
				/>
			))}
		</div>
	);
};

export default Comments;
