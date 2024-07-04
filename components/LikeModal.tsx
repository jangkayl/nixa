import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { app } from "@/app/firebase";
import {
	getFirestore,
	collection,
	getDocs,
	onSnapshot,
} from "firebase/firestore";
import { modalState, postIdState } from "@/app/atom/modalAtom";
import Moment from "react-moment";
import moment from "moment";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaRegFaceSadCry } from "react-icons/fa6";

moment.updateLocale("en", {
	relativeTime: {
		future: "in %s",
		past: "%s ago",
		s: "s", // seconds
		ss: "%ss", // seconds
		m: "1m", // a minute
		mm: "%dm", // minutes
		h: "1h", // an hour
		hh: "%dh", // hours
		d: "1d", // a day
		dd: "%dd", // days
		M: "1M", // a month
		MM: "%dM", // months
		y: "1y", // a year
		yy: "%dy", // years
	},
});

interface LikeProps {
	id: string;
	timestamp: any;
	username: string;
	userImg: string;
	name: string;
}

const LikeModal = ({ isVisible, onClose }: any) => {
	const [open, setOpen] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	const [likes, setLikes] = useState<LikeProps[]>([]);
	const db = getFirestore(app);

	useEffect(() => {
		const fetchData = async () => {
			if (!postId) return;

			const likesRef = collection(db, `posts/${postId}/likes`);

			const unsubscribe = onSnapshot(likesRef, (querySnapshot) => {
				const updatedLikes: LikeProps[] = [];
				querySnapshot.forEach((doc) =>
					updatedLikes.push({
						id: doc.id,
						...(doc.data() as Omit<LikeProps, "id">),
					})
				);
				setLikes(updatedLikes);
			});

			return () => unsubscribe();
		};

		fetchData();
	}, [db, postId]);

	return (
		<Modal
			isOpen={isVisible}
			onRequestClose={onClose}
			ariaHideApp={false}
			className="bg-white p-4 rounded-xl border-gray-300 border fixed top-32 left-[50%] translate-x-[-50%] outline-none max-w-sm w-full h-auto max-h-[20rem] dark:bg-zinc-900"
			overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
			<IoClose
				size={20}
				onClick={onClose}
				className="cursor-pointer fixed right-3 top-3"
			/>
			<p className="font-semibold pb-2 mb-2 border-b">Likes</p>
			{likes.length > 0 ? (
				likes.map((like: LikeProps) => (
					<div
						key={like.id}
						className="flex text-sm gap-2 py-1 w-full items-center justify-between">
						<div>
							<Image
								src={like.userImg}
								alt={like.username}
								width={30}
								height={30}
								className="rounded-full"
							/>
						</div>
						<div className="truncate flex-1">
							<p className="truncate">{like.name}</p>
							<p className="text-xs text-gray-400 truncate">@{like.username}</p>
						</div>
						<Moment
							fromNow
							className="text-[0.71rem] text-gray-400">
							{like.timestamp?.toDate()}
						</Moment>
					</div>
				))
			) : (
				<div className="flex flex-col justify-center items-center gap-3 pt-2">
					<FaRegFaceSadCry size={30} />
					<p>No likes yet</p>
				</div>
			)}
		</Modal>
	);
};

export default LikeModal;
