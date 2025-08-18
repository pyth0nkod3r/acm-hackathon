import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout';
import { AppRouter, Breadcrumb } from './components/routing';
import { NotificationProvider } from './contexts';
import { Toaster } from './components/ui/sonner';
import { useImagePreloading } from './hooks/useImagePreloading';
import { ErrorBoundary, SkipLinks } from './components/common';

function AppContent() {
  // Initialize image preloading
  useImagePreloading();

  return (
    <>
      {/* Skip links for keyboard navigation */}
      <SkipLinks />

      <Layout>
        <div className="min-h-screen">
          {/* Breadcrumb navigation */}
          <ErrorBoundary isolateErrors={true}>
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <Breadcrumb />
              </div>
            </div>
          </ErrorBoundary>

          {/* Main content with routing */}
          <ErrorBoundary isolateErrors={true}>
            <main id="main-content" role="main" tabIndex={-1}>
              <AppRouter />
            </main>
          </ErrorBoundary>
        </div>
      </Layout>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo, errorId) => {
        // Global error handling - could send to analytics, etc.
        console.error('Global error caught:', { error, errorInfo, errorId });
      }}
    >
      <NotificationProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
