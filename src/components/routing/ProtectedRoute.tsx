import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  isProtected?: boolean | undefined;
  redirectTo?: string;
  condition?: boolean;
}

const ProtectedRoute = ({
  children,
  isProtected = false,
  redirectTo = '/',
  condition = true,
}: ProtectedRouteProps) => {
  const location = useLocation();

  // If route is not protected, render children
  if (!isProtected) {
    return <>{children}</>;
  }

  // If route is protected but condition is not met, redirect
  if (isProtected && !condition) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Render children if all conditions are met
  return <>{children}</>;
};

export default ProtectedRoute;
