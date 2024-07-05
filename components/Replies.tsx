import { app } from "@/app/firebase";
import {
	collection,
	DocumentData,
	getFirestore,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import RepliesIcon from "./RepliesIcon";

const Replies = ({ commentId, comment, originalId }: any) => {
	const db = getFirestore(app);
	const [replies, setReplies] = useState<DocumentData>([]);
	const [isExpanded, setIsExpanded] = useState(false);
	const [reply, setReply] = useState("");

	const toggleExpand = () => {};

	useEffect(() => {
		const q = query(
			collection(db, "posts", originalId, "comments", commentId, "replies"),
			orderBy("timestamp", "desc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setReplies(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, [commentId, db, originalId]);

	return (
		<div>
			{replies.map((rep: any) => (
				<div key={rep.id}>
					<div className="border-b p-3 hover:bg-gray-50 dark:hover:bg-zinc-900">
						<div className="flex items-start justify-between ml-4">
							<Link
								href={`/user/${rep.uid}`}
								className="flex items-center gap-2">
								<PiArrowBendDownRightBold size={15} />
								<Image
									src={rep?.userImg}
									alt="profile"
									width={35}
									height={35}
									className="rounded-full p-[1px] border-gray-300 border"
								/>
							</Link>
							<div className="flex-1 pl-3 overflow-x-hidden">
								<Link
									href={`/user/${rep.uid}`}
									className="flex items-center gap-1 truncate">
									<p className="text-sm font-bold truncate">{rep.name}</p>
									<p className="text-xs text-gray-400 truncate">
										@{rep.username}
									</p>
								</Link>
								{rep.username === comment.username ? (
									<p className="text-[0.7rem] text-gray-400">
										- replied to himself
									</p>
								) : (
									<p className="text-[0.7rem] text-gray-400">
										- replied to @{comment.username}
									</p>
								)}
								<div className="flex items-center pt-2 gap-2 w-auto ">
									<p
										className={`text-[0.84rem] max-w-[12.5rem] sm:max-w-xs cursor-pointer ${
											isExpanded ? "" : "truncate"
										}`}
										onClick={toggleExpand}>
										{rep.comment}
									</p>
									<Moment
										fromNow
										className="text-[0.71rem] text-gray-400">
										{rep?.timestamp?.toDate()}
									</Moment>
								</div>
								<RepliesIcon
									commentId={commentId}
									comment={comment}
									originalId={originalId}
									reply={rep}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Replies;
