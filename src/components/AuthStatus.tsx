'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';

export default function AuthStatus() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  if (pathname === '/login') return;

  if (!user) {
    return (
      <Link href="/login">
        <button className="px-2 py-1 bg-blue-500 text-white rounded">
          Sign in
        </button>
      </Link>
    );
  }
  return (
    <div className="flex items-center space-x-2">
      <span>Hi, {user.displayName || user.email}</span>
      <button onClick={signOut} className="px-2 py-1 bg-red-500 text-white rounded">
        Sign out
      </button>
    </div>
  );
}