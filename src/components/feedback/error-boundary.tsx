"use client";

import { ErrorGeneric } from "@/components/feedback/error-generic";
import React, { type ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  label?: string;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error: Error | null; errorInfo?: ErrorInfo }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.info(this.props.label);

    this.setState({ hasError: true, error, errorInfo });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorGeneric onRetry={this.reset} />;
    }

    return this.props.children;
  }
}
