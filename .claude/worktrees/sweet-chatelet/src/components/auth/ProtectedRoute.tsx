/**
 * @fileoverview Client-side route protection wrapper.
 * Redirects unauthenticated users to the login page.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Container from "@/components/layout/Container";

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Optional required role — if set, user must have this role */
  requiredRole?: "fan" | "star";
}

/**
 * Wraps page content that requires authentication.
 * Shows loading spinner while checking auth, redirects to /prijava if not logged in.
 */
export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/prijava");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && user && requiredRole && user.role !== requiredRole) {
      // Wrong role — redirect to home
      router.replace("/");
    }
  }, [user, loading, requiredRole, router]);

  if (loading) {
    return (
      <Container>
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary-500" />
            <p className="mt-4 text-sm text-slate-500">Provera pristupa...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!user) {
    return null; // Will redirect via useEffect
  }

  if (requiredRole && user.role !== requiredRole) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}
