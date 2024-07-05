import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";
import { Providers } from "./Providers";

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Nixa",
	description: "NIXA baby",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<head>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="manifest"
					href="/site.webmanifest"
				/>
			</head>
			<body className={`${poppins.className} smooth-scroll`}>
				<Providers>
					<SessionWrapper>
						<div className="flex justify-between max-w-6xl mx-auto">
							<div className="border-r h-screen px-3 hidden sm:block sticky top-0">
								<Sidebar />
							</div>
							<div className="w-16 flex-1">{children}</div>
							<div className="pt-7 border-l px-6 hidden sm:block w-[19rem] md:block lg:w-[25rem]">
								<input
									type="text"
									placeholder="Search"
									className="w-full py-2 mb-3 px-3 rounded-full bg-gray-100 shadow-sm text-sm border sticky top-2 dark:text-inherit dark:bg-zinc-800"
								/>
								<News />
							</div>
						</div>
						<CommentModal />
					</SessionWrapper>
				</Providers>
			</body>
		</html>
	);
}
