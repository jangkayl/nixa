import { atom } from "recoil";
export const modalState = atom({
	key: "modalState",
	default: false,
});

export const postIdState = atom({
	key: "postIdState",
	default: "",
});

export const likeCommentIdState = atom({
	key: "likeCommentIdState",
	default: "",
});

export const comReplyModalState = atom({
	key: "comReplyModalState",
	default: false,
});
