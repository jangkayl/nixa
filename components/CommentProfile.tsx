import React, { useEffect, useState } from "react";
import ComProfile from "./ProfileComments/ComProfile";
import ComComProfile from "./ProfileComments/ComComProfile";

const CommentProfile = ({ username, comments }: any) => {
	const [filteredComments, setFilteredComments] = useState<any[]>([]);

	useEffect(() => {
		if (comments) {
			const filtered = comments.filter((com: any) =>
				com.comments.some((reply: any) => reply.username === username)
			);
			setFilteredComments(filtered);
		}
	}, [comments, username]);

	if (!comments) return null;
	return (
		<div>
			{filteredComments.map((com: any) => (
				<div key={com.id}>
					{com.comments.map((reply: any) => (
						<div key={reply.id}>
							{reply.username === username && (
								<div>
									<div>
										<ComProfile
											post={com}
											id={com.id}
										/>
										<ComComProfile
											id={com.id}
											reply={reply.username}
										/>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default CommentProfile;
