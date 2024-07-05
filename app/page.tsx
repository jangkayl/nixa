import Feed from "@/components/Feed";
import Input from "@/components/Input";
import MobileSidebar from "@/components/MobileSidebar";
import LogoDark from "@/components/ThemeSwitch/LogoDark";

export default function Home() {
	return (
		<main className="w-full">
			<div
				className="px-3 py-2 font-bold text-lg border-b mb-3 flex justify-between sticky top-0 bg-white sm:static items-center dark:bg-zinc-900"
				id="home">
				<p className="hidden sm:block">Home</p>
				<LogoDark />
				<MobileSidebar />
			</div>
			<Input />
			<Feed />
		</main>
	);
}
