import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) router.push('/login');
  }, [user, router]);

  if (!user) return null; // or a loading spinner

  return (
    <div>
      <h1>Welcome, {user.displayName}</h1>
      <h2>Dashboard</h2>
      <p>This is a protected page.</p>
      <p>Here you can manage your account settings, view your data, etc.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}