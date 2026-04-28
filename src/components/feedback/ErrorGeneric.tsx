"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ErrorScreenShell } from "@/components/feedback/ErrorScreenShell";
import { Button } from "@/components/ui/button";

export type ErrorGenericProps = {
	/** Clears the nearest React error boundary (SPA recovery without full reload). */
	onRetry?: () => void;
};

export const ErrorGeneric = ({ onRetry }: ErrorGenericProps) => {
	const router = useRouter();

	const goHome = () => {
		onRetry?.();
		router.replace("/");
	};

	return (
		<ErrorScreenShell>
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center shadow-sm">
				<div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
					<AlertCircle className="size-7" aria-hidden />
				</div>
				<h1 className="text-xl font-semibold tracking-tight text-foreground">
					Something broke
				</h1>
				<p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
					This part of the app hit an unexpected error. You can go back home or
					reload the page.
				</p>
				<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button type="button" variant="default" size="lg" onClick={goHome}>
						Back to home
					</Button>
					<Button
						type="button"
						variant="outline"
						size="lg"
						onClick={() => window.location.reload()}
					>
						Reload page
					</Button>
				</div>
				{process.env.NODE_ENV === "development" ? (
					<p className="mt-6 text-xs text-muted-foreground">
						Dev:{" "}
						<Link
							href="/dev/error-boom"
							className="font-medium text-primary underline-offset-4 hover:underline"
						>
							/dev/error-boom
						</Link>{" "}
						triggers the route-level error page (may differ from this screen).
					</p>
				) : null}
			</div>
		</ErrorScreenShell>
	);
};
