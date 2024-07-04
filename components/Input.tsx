"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import profile from "@/public/profile.png";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "@/app/firebase";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
} from "firebase/firestore";

const Input = () => {
	const { data: session } = useSession();
	const [image, setImage] = useState<File | null>();
	const [imageUrl, setImageUrl] = useState<string | null>();
	const imageRef = useRef<HTMLInputElement>(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [text, setText] = useState("");
	const [uploadLoading, setUploadLoading] = useState(false);
	const db = getFirestore(app);

	const addImagePost = (e: any) => {
		const file = e.target.files[0];
		setImage(file);
		setImageUrl(URL.createObjectURL(file));
	};

	useEffect(() => {
		const uploadImageToStorage = () => {
			if (!image) return;
			setImageLoading(true);
			const storage = getStorage(app);
			const fileName = new Date().getTime() + "-" + image?.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, image);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Uploading is " + progress + "%");
				},
				(error) => {
					console.log(error);
					setImageLoading(false);
					setImageUrl(null);
					setImage(null);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
						setImageUrl(downloadUrl);
						setImageLoading(false);
					});
				}
			);
		};

		if (image) {
			uploadImageToStorage();
		}
	}, [image]);

	const handleSubmit = async () => {
		setUploadLoading(true);
		const docRef = await addDoc(collection(db, "posts"), {
			uid: session?.user.uid,
			name: session?.user.name,
			username: session?.user.username,
			text,
			profileImg: session?.user.image,
			timestamp: serverTimestamp(),
			image: imageUrl || null,
		});
		setImageLoading(false);
		setImage(null);
		setImageUrl(null);
		setText("");
		setUploadLoading(false);

		window.location.reload();
	};

	if (!session) return null;
	return (
		<div className="flex flex-1 border-b">
			<div className="px-5">
				<Image
					src={session?.user?.image || profile}
					alt="userImage"
					width={48}
					height={1}
					className="rounded-full"
				/>
			</div>
			<div className="w-full pr-5 divide-y">
				<div>
					<textarea
						rows={2}
						placeholder="What's happening?"
						className="tracking-wide outline-none w-full text-sm"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					{imageUrl && (
						<div>
							<Image
								src={imageUrl}
								alt="image"
								width={60}
								height={1}
								className={`max-h-[20rem] w-full object-contain ${
									imageLoading ? "animate-pulse" : ""
								}`}
								onClick={() => setImageUrl(null)}
								unoptimized
							/>
						</div>
					)}
				</div>
				<div className="flex justify-between">
					<HiOutlinePhotograph
						size={40}
						className="p-2 rounded-full hover:bg-blue-50 my-2 transition-all duration-150 cursor-pointer text-blue-400 dark:hover:bg-gray-800"
						onClick={() => imageRef?.current?.click()}
					/>
					<input
						type="file"
						hidden
						ref={imageRef}
						accept="image/*"
						onChange={addImagePost}
					/>
					<button
						disabled={text.trim() == "" || imageLoading || uploadLoading}
						className="py-2 px-5 text-sm my-2 rounded-full bg-blue-400 text-white font-medium disabled:cursor-not-allowed disabled:bg-blue-300"
						onClick={handleSubmit}>
						Post
					</button>
				</div>
			</div>
		</div>
	);
};

export default Input;
