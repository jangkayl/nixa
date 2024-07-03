import React from "react";
import Post from "./Post";

const ProfilePost = ({ posts }: any) => {
	return (
		<div className="pt-2">
			{posts.length > 0 ? (
				posts.map((post: any) => (
					<Post
						key={post.id}
						post={post}
						id={post.id}
					/>
				))
			) : (
				<div>No post yet</div>
			)}
		</div>
	);
};

export default ProfilePost;
