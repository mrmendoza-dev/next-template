"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () =>
		setTheme(resolvedTheme === "dark" ? "light" : "dark");

	return (
		<Button
			id="theme-toggle"
			type="button"
			size="icon"
			variant="ghost"
			className="text-foreground hover:text-foreground"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			{!mounted ? (
				<Sun className="size-4 opacity-0" aria-hidden />
			) : resolvedTheme === "dark" ? (
				<Sun className="size-4" aria-hidden />
			) : (
				<Moon className="size-4" aria-hidden />
			)}
		</Button>
	);
};
