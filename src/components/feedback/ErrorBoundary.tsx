"use client";

import React, { type ErrorInfo } from "react";
import { ErrorGeneric } from "@/components/feedback/ErrorGeneric";

interface ErrorBoundaryProps {
	children: React.ReactNode;
	label?: string;
}

export class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	{
		hasError: boolean;
		error: Error | null;
		errorInfo?: ErrorInfo;
		/** Bumps on recovery so children remount (fixes stale state that re-throws). */
		resetKey: number;
	}
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null, resetKey: 0 };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.info(this.props.label);

		this.setState({ hasError: true, error, errorInfo });
	}

	reset = () => {
		this.setState((s) => ({
			hasError: false,
			error: null,
			resetKey: s.resetKey + 1,
		}));
	};

	render() {
		const { hasError, resetKey } = this.state;
		if (hasError) {
			return <ErrorGeneric onRetry={this.reset} />;
		}

		return (
			<React.Fragment key={resetKey}>{this.props.children}</React.Fragment>
		);
	}
}
