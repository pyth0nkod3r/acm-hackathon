import { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import { NotFound } from '../../pages';
import {
  ProtectedRoute,
  PageTransition,
  ErrorBoundary,
  RouteLoading,
} from './';
import { PageErrorBoundary } from '../common';
import {
  useDocumentTitle,
  useDocumentMeta,
} from '../../hooks/useDocumentTitle';
import HackathonGuide from '../../pages/HackathonGuide';

const AppRouter = () => {
  const location = useLocation();

  // Set document title and meta tags based on current route
  useDocumentTitle();
  useDocumentMeta();

  return (
    <ErrorBoundary>
      <PageTransition>
        <Suspense fallback={<RouteLoading />}>
          <Routes location={location} key={location.pathname}>
            {routes.map(route => {
              const Component = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PageErrorBoundary
                      pageName={
                        route.path === '/'
                          ? 'home'
                          : route.path.replace('/', '')
                      }
                    >
                      <ProtectedRoute
                        isProtected={route.isProtected}
                        redirectTo="/"
                      >
                        <Component />
                      </ProtectedRoute>
                    </PageErrorBoundary>
                  }
                />
              );
            })}

            {/* Add new route */}
            <Route path="/hackathon-guide" element={<HackathonGuide />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </ErrorBoundary>
  );
};

export default AppRouter;
