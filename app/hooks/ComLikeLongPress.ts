import { useRecoilState } from "recoil";
import { likeCommentIdState, postIdState } from "../atom/modalAtom";
import { useCallback, useEffect, useState } from "react";

const useComLikeLongPress = (callback = () => {}, ms = 300, id: any) => {
	const [startLongPress, setStartLongPress] = useState(false);
	const [likeComment, setLikeComment] = useRecoilState(likeCommentIdState);

	useEffect(() => {
		let timerId: any;
		if (startLongPress) {
			timerId = setTimeout(() => {
				callback();
				setLikeComment(id);
			}, ms);
		} else {
			clearTimeout(timerId);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [callback, id, ms, setLikeComment, startLongPress]);

	const start = useCallback(() => {
		setStartLongPress(true);
		setLikeComment(id);
	}, [id, setLikeComment]);
	const stop = useCallback(() => setStartLongPress(false), []);

	return {
		onMouseDown: start,
		onMouseUp: stop,
		onMouseLeave: stop,
		onTouchStart: start,
		onTouchEnd: stop,
	};
};

export default useComLikeLongPress;
