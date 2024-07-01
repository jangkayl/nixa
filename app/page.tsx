import Feed from "@/components/Feed";
import Input from "@/components/Input";
import { CgFeed } from "react-icons/cg";

export default function Home() {
	return (
		<main className="w-full">
			<p className="p-2 font-bold text-lg border-b mb-3 ">Home</p>
			<Input />
			<Feed />
		</main>
	);
}
