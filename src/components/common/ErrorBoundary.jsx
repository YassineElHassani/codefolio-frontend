import { Component } from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-night via-night to-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md w-full mx-4 p-8 rounded-3xl border border-white/10 bg-white/6 shadow-glass backdrop-blur text-center"
          >
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-sand mb-2">Something went wrong</h1>
            <p className="text-sand/70 mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/20 text-left overflow-auto max-h-40">
                <p className="font-mono text-xs text-danger/80 wrap-balance">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-3 flex-col sm:flex-row">
              <Button variant="secondary" onClick={() => window.location.reload()} className="flex-1">
                🔄 Refresh Page
              </Button>
              <Button variant="primary" onClick={() => window.location.href = '/'} className="flex-1">
                🏠 Go Home
              </Button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
