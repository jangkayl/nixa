import Image from "next/image";
import React from "react";
import ButtonsProfile from "./ButtonsProfile";
import BackProfile from "./BackProfile";

const Profile = ({ posts, comments }: any) => {
	const user = posts[0];

	console.log(user.profileImg);
	return (
		<div>
			<BackProfile />
			<div className="w-full h-[14rem]">
				<div className="w-full bg-slate-300 h-full max-h-[8rem] relative">
					{user.profileImg && (
						<div className="flex flex-col items-center absolute bottom-[-60%] left-[50%] translate-x-[-50%]">
							<Image
								src={user.profileImg}
								alt="profileImg"
								width={80}
								height={80}
								className="rounded-full"
								unoptimized
							/>
							<div className="text-center">
								<p className="text-base font-semibold">{user.name}</p>
								<p className="text-xs text-gray-400">@{user.username}</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<ButtonsProfile
				posts={posts}
				comments={comments}
			/>
		</div>
	);
};

export default Profile;
