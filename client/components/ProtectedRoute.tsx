import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // ⏳ while checking auth (on refresh)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking authentication...
      </div>
    );
  }

  // 🔒 not authenticated → redirect to auth page
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // ✅ authenticated → render page
  return <>{children}</>;
}
