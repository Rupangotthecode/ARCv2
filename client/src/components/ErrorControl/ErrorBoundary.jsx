import React, { Component } from "react";
import ErrorModal from "./ErrorModal";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  handleClose = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    return (
      <>
        {hasError && (
          <ErrorModal
            isOpen={hasError}
            onClose={this.handleClose}
            errorMessage={error?.toString()}
          />
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
