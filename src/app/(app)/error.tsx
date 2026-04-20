"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ErrorScreenShell } from "@/components/feedback/error-screen-shell";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AppError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<ErrorScreenShell>
			<div
				className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm"
				role="alert"
			>
				<h1 className="text-lg font-semibold tracking-tight text-foreground">
					Something went wrong
				</h1>
				<p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
					{error.message}
				</p>
				<div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
					<Button type="button" variant="default" onClick={() => reset()}>
						Try again
					</Button>
					<Link
						href="/"
						className={cn(
							buttonVariants({ variant: "outline", size: "default" }),
							"inline-flex",
						)}
					>
						Back to home
					</Link>
				</div>
			</div>
		</ErrorScreenShell>
	);
}
