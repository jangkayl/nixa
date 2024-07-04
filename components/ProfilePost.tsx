import React from "react";
import Post from "./Post";
import { BsEmojiGrin } from "react-icons/bs";

const ProfilePost = ({ posts }: any) => {
	const sortedPosts = posts.sort((a: any, b: any) => b.timestamp - a.timestamp);

	return (
		<div className="pt-2">
			{sortedPosts.length > 0 ? (
				sortedPosts.map((post: any) => (
					<Post
						key={post.id}
						post={post}
						id={post.id}
					/>
				))
			) : (
				<div className="flex flex-col justify-center items-center gap-3 h-[7rem]">
					<BsEmojiGrin size={30} />
					<p>No comments yet</p>
				</div>
			)}
		</div>
	);
};

export default ProfilePost;
