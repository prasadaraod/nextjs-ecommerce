// src/app/dashboard/page.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="rounded bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:opacity-90"
        >
          Logout
        </button>
      </div>

      <div className="rounded-lg border p-6 bg-card">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name || 'Developer'}!</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This dashboard is server-protected via Next.js Middleware and JWT validation.
        </p>
        <div className="space-y-2 text-sm">
          <p><strong>Email:</strong> {user?.email || 'dev@devvault.com'}</p>
          <p><strong>Role:</strong> <span className="capitalize">{user?.role || 'buyer'}</span></p>
        </div>
      </div>
    </div>
  );
}