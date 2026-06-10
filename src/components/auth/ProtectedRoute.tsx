import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If no session, redirect to login
  // Note: For now we're keeping it relaxed during development, but eventually
  // we will enforce login. For testing the UI, we'll allow bypassing if we have a fake storage flag
  const isDevBypass = localStorage.getItem('dev_bypass_auth') === 'true';

  if (!session && !isDevBypass) {
    // Save the attempted url so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
