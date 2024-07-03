import {
	collection,
	query,
	where,
	getDocs,
	getFirestore,
} from "firebase/firestore";
import { app } from "@/app/firebase";
import Back from "@/app/posts/[id]/Back";
import Profile from "@/components/Profile";

const UserPage = async ({ params }: any) => {
	const db = getFirestore(app);
	const q = query(collection(db, "posts"), where("uid", "==", params.id));
	const querySnapshot = await getDocs(q);

	if (querySnapshot.empty) {
		return (
			<div>
				<Back />
				<p className="font-semibold p-3 text-center">{`"User not found"`}</p>
			</div>
		);
	}

	let posts = querySnapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return (
		<div>
			<Profile posts={posts} />
		</div>
	);
};

export default UserPage;
