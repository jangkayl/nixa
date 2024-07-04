import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const useResolvedTheme = () => {
	const { resolvedTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

	useEffect(() => {
		if (resolvedTheme) {
			setIsDarkMode(resolvedTheme === "dark");
		}
	}, [resolvedTheme]);

	return isDarkMode;
};

export default useResolvedTheme;
