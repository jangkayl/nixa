import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Icons from "./Icons";

const Post = ({ post, id }: any) => {
	return (
		<div className="border-b p-3 hover:bg-gray-50">
			<div className="flex items-start justify-between">
				<div>
					<Image
						src={post?.profileImg}
						alt="profile"
						width={40}
						height={1}
						className="rounded-full p-[1px] border-gray-300 border"
					/>
				</div>
				<div className=" flex-1 pl-3">
					<div className="flex items-center gap-1">
						<p className="text-sm font-bold truncate">{post.name}</p>
						<p className="text-xs text-gray-400 truncate">@{post.username}</p>
					</div>
					<Link href={`/post/${id}`}>
						<p className="text-sm pt-2">{post.text}</p>
					</Link>
					{post.image ? (
						<Link href={`/post/${id}`}>
							<Image
								src={post.image}
								alt={post.name}
								width={1}
								height={1}
								className="w-full rounded-2xl mt-3"
								unoptimized
							/>
						</Link>
					) : (
						""
					)}
					<Icons />
				</div>
				<BsThreeDots
					size={17}
					className="cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default Post;
