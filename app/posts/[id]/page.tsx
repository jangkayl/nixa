import { app } from "@/app/firebase";
import Post from "@/components/Post";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
import Back from "./Back";
import Comments from "@/components/Comments";

const PostImage = async ({ params }: any) => {
	const db = getFirestore(app);
	const querySnapshot = await getDoc(doc(db, "posts", params.id));

	if (!querySnapshot.exists()) {
		return (
			<div>
				<Back />
				<p className="font-semibold p-3 text-center">{`"No post found"`}</p>
			</div>
		);
	}

	let data: any = [];

	data = {
		id: querySnapshot.id,
		...querySnapshot.data(),
	};

	if (data.timestamp) {
		data.timestamp = data.timestamp.toMillis();
	}

	return (
		<div>
			<Back />
			<div>
				<Post
					post={data}
					id={data.id}
				/>
				<Comments id={params.id} />
			</div>
		</div>
	);
};

export default PostImage;
