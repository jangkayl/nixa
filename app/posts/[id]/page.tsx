import { app } from "@/app/firebase";
import Post from "@/components/Post";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { IoArrowBack } from "react-icons/io5";

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
			<div className="flex items-center gap-2 p-3 border-b">
				<Link href={"/"}>
					<IoArrowBack
						size={30}
						className="hover:bg-gray-100 rounded-full p-1 transition-all duration-150"
					/>
				</Link>
				<p>Back</p>
			</div>
			<div>
				<Post
					post={data}
					id={data.id}
				/>
			</div>
		</div>
	);
};

export default PostImage;
