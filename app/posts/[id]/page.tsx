import { app } from "@/app/firebase";
import Post from "@/components/Post";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import Back from "./Back";
import Comments from "@/components/Comments";

interface PostProps {
	id: string;
}

const PostImage = async ({ params }: any) => {
	const db = getFirestore(app);
	let data: PostProps = { id: "" };
	const querySnapshot = await getDoc(doc(db, "posts", params.id));
	data = { ...querySnapshot.data(), id: querySnapshot.id };

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
