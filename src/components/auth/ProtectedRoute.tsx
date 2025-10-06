import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Simple passthrough ProtectedRoute — always allows access
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <>{children}</>;
};

export default ProtectedRoute;
