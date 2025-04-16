import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const FirebaseAuthUI = dynamic(() => import('../components/FirebaseAuthUI'), { ssr: false });

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  // Redirect to dashboard if user is already logged in
  useEffect(() => {
      if (user) {
        router.replace('/dashboard');
      }
    }, [user, router]);
  
  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h1>Login</h1>
      <FirebaseAuthUI />
    </div>
  );
}