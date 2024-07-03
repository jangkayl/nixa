import React from "react";
import {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
	orderBy,
} from "firebase/firestore";
import { app } from "@/app/firebase";
import Back from "@/app/posts/[id]/Back";
import Profile from "@/components/Profile";

interface Post {
	id: string;
	username: string;
	timestamp: Date;
	uid: string;
}

const UserPage = async ({ params }: any) => {
	const db = getFirestore(app);

	// Posts Query
	const q = query(collection(db, "posts"), where("uid", "==", params.id));
	const querySnapshot = await getDocs(q);

	let posts = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Post, "id">),
	}));

	if (querySnapshot.empty) {
		return (
			<div>
				<Back />
				<p className="font-semibold p-3 text-center">{"User not found"}</p>
			</div>
		);
	}

	// Query to get all posts from the database
	const comQ = query(collection(db, "posts"), orderBy("timestamp", "desc"));
	const comQuerySnapshot = await getDocs(comQ);

	let postsWithComments = [];

	for (const doc of comQuerySnapshot.docs) {
		const postId = doc.id;
		const postData = doc.data();

		// Query to get all comments for the specific post
		const commentsQ = query(
			collection(db, "posts", postId, "comments"),
			orderBy("timestamp", "desc")
		);
		const commentsSnapshot = await getDocs(commentsQ);

		let comments = commentsSnapshot.docs.map((commentDoc) => ({
			id: commentDoc.id,
			...commentDoc.data(),
		}));

		postsWithComments.push({
			id: postId,
			...postData,
			comments: comments,
		});
	}

	// Convert timestamps in posts and postsWithComments
	posts = posts.map((post) => convertTimestamps(post));
	postsWithComments = postsWithComments.map((post) => ({
		...convertTimestamps(post),
		comments: post.comments.map((comment) => convertTimestamps(comment)),
	}));

	return (
		<div>
			<Profile
				posts={posts}
				comments={postsWithComments}
			/>
		</div>
	);
};

export default UserPage;

function convertTimestamps(data: any) {
	if (
		data.timestamp &&
		data.timestamp.seconds !== undefined &&
		data.timestamp.nanoseconds !== undefined
	) {
		data.timestamp = new Date(
			data.timestamp.seconds * 1000 + data.timestamp.nanoseconds / 1000000
		);
	}
	return data;
}
