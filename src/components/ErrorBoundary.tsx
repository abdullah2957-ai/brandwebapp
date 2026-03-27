import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-black text-red-500 mb-4 tracking-tighter uppercase">System Failure</h1>
            <p className="text-gray-400 mb-8">
              An unexpected error has occurred. Please refresh the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              REBOOT SYSTEM
            </button>
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-left text-xs text-red-400 overflow-auto max-h-48">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
