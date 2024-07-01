import { app } from "@/app/firebase";
import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from "firebase/firestore";
import React from "react";
import Post from "./Post";

const Feed = async () => {
	const db = getFirestore(app);
	const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
	const querySnapshot = await getDocs(q);
	let data: any[] = [];
	querySnapshot.forEach((doc) => {
		data.push({ id: doc.id, ...doc.data() });
	});

	return (
		<div>
			{data.map((post) => (
				<Post
					post={post}
					key={post.id}
					id={post.id}
				/>
			))}
		</div>
	);
};

export default Feed;
