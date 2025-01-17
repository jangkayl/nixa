import Image from "next/image";
import Link from "next/link";
import React from "react";
import Icons from "@/components/Icons";
import EditPost from "../EditPost";

const ComProfile = ({ post, id }: any) => {
	return (
		<div className="border-b p-3 hover:bg-gray-50 overflow-x-hidden dark:hover:bg-zinc-900">
			<div className="flex items-start justify-between relative">
				{post.image ? (
					<div>
						<span className="w-0.5 h-[50%] absolute left-[1.2rem] top-[20%] bg-gray-300 bottom-3" />
						<span className="w-1 h-[3%] absolute left-[1.15rem] top-[80%] bg-gray-300 bottom-1 rounded-full" />
					</div>
				) : (
					<div>
						<span className="w-0.5 h-[35%] absolute left-[1.2rem] top-15 bg-gray-300 bottom-3" />
						<span className="w-1 h-[5%] absolute left-[1.15rem] top-15 bg-gray-300 bottom-1 rounded-full" />
					</div>
				)}
				<Link href={`/user/${post.uid}`}>
					<Image
						src={post?.profileImg}
						alt="profile"
						width={40}
						height={40}
						className="rounded-full p-[1px] border-gray-300 border"
					/>
				</Link>
				<div className="flex-1 pl-3 truncate">
					<div className="flex items-center gap-1 truncate">
						<Link
							href={`/user/${post.uid}`}
							className="text-sm font-bold">
							{post.name}
						</Link>
						<Link
							href={`/user/${post.uid}`}
							className="text-xs text-gray-400 truncate">
							@{post.username}
						</Link>
					</div>
					<Link href={`/posts/${id}`}>
						<p className="text-sm pt-2">{post.text}</p>
						{post.image && (
							<Image
								src={post.image}
								alt={post.name}
								width={500}
								height={500}
								className="w-full rounded-2xl mt-3"
								priority
							/>
						)}
					</Link>
					<Icons
						id={id}
						uid={post.uid}
					/>
				</div>
				<EditPost post={post} />
			</div>
		</div>
	);
};

export default ComProfile;
