import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to display fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log the error if needed
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any fallback UI
            return <h2>Something went wrong.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
