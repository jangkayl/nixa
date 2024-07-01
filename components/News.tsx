"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import noImage from "@/public/no-image.png";

interface Article {
	source: {
		id: string | null;
		name: string;
	};
	author: string | null;
	title: string;
	description: string;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string;
}

const News = () => {
	const [news, setNews] = useState<Article[]>([]);
	const [articleNum, setArticleNum] = useState(3);

	useEffect(() => {
		fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
			.then((res) => res.json())
			.then((data) => {
				console.log("Fetched data:", data);
				if (data.articles) setNews(data.articles);
				else setNews([]);
			})
			.catch((error) => {
				console.error("Error fetching news:", error);
				setNews([]);
			});
	}, []);

	return (
		<div className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
			<h1 className="font-bold text-lg pb-2">Whats happening</h1>
			{news.slice(0, articleNum).map((article, index) => (
				<a
					key={index}
					href={article.url}
					className="py-2 flex items-center space-x-2 hover:bg-gray-200 transition-all duration-200">
					<div>
						<h1 className="text-sm font-bold">{article.title}</h1>
						<span className="text-xs font-medium text-gray-500">
							{article.author}
						</span>
					</div>
					<Image
						src={article.urlToImage || noImage}
						width={80}
						height={20}
						alt={article.title}
						className="rounded-xl"
					/>
				</a>
			))}
			<button
				className="text-xs text-blue-400"
				onClick={() => setArticleNum(articleNum + 3)}>
				Load more...
			</button>
		</div>
	);
};

export default News;
