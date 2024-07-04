import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { likeCommentIdState, postIdState } from "../atom/modalAtom";

const useLongPress = (callback = () => {}, ms = 300, id: any) => {
	const [startLongPress, setStartLongPress] = useState(false);
	const [postId, setPostId] = useRecoilState(postIdState);

	useEffect(() => {
		let timerId: any;
		if (startLongPress) {
			timerId = setTimeout(() => {
				callback();
				setPostId(id);
			}, ms);
		} else {
			clearTimeout(timerId);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [callback, id, ms, setPostId, startLongPress]);

	const start = useCallback(() => {
		setStartLongPress(true);
		setPostId(id);
	}, [id, setPostId]);
	const stop = useCallback(() => setStartLongPress(false), []);

	return {
		onMouseDown: start,
		onMouseUp: stop,
		onMouseLeave: stop,
		onTouchStart: start,
		onTouchEnd: stop,
	};
};

export default useLongPress;
