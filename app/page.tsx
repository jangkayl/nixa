import Feed from "@/components/Feed";
import Input from "@/components/Input";
import MobileSidebar from "@/components/MobileSidebar";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Home() {
	return (
		<main className="w-full">
			<div className="px-3 py-2 font-bold text-lg border-b mb-3 flex justify-between sticky top-0 bg-white sm:static items-center">
				<p className="hidden sm:block">Home</p>
				<Link href={"/"}>
					<Image
						className="block sm:hidden hover:scale-105 transition-all duration-150 cursor-pointer"
						src={logo}
						width={30}
						height={30}
						alt="logo"
						unoptimized
					/>
				</Link>
				<MobileSidebar />
			</div>
			<Input />
			<Feed />
		</main>
	);
}
