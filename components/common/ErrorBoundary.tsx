"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  message: string;
};

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: "" };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-cardBorder bg-paper p-8 text-center">
            <p className="font-cormorant text-xl font-semibold text-charcoal">
              Something went wrong
            </p>
            <p className="mt-2 text-s text-slate">{this.state.message}</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
