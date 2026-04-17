"use client";

import { ErrorScreenShell } from "@/components/feedback/error-screen-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

export default function AppError({
  error,
  reset: _reset,
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
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default", size: "default" }),
            "mt-6 inline-flex"
          )}
        >
          Back to home
        </Link>
      </div>
    </ErrorScreenShell>
  );
}
