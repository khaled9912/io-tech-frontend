import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="bg-brown-900 flex items-center justify-center p-8 text-center text-white">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong.</h2>
            <p>
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
