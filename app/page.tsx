import Feed from "@/components/Feed";
import Input from "@/components/Input";
import MobileSidebar from "@/components/MobileSidebar";

export default function Home() {
	return (
		<main className="w-full">
			<div className="px-3 py-2 font-bold text-lg border-b mb-3 flex justify-between sticky top-0 bg-white sm:static">
				<p>Home</p>
				<MobileSidebar />
			</div>
			<Input />
			<Feed />
		</main>
	);
}
