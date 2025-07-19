'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('User:', user);
    if (user) router.push('/dashboard');
  }, [user, router]);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      console.error(err);
      alert('Sign in failed');
    }
  }

  async function handleEmailSignUp(e: React.FormEvent) {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
    } catch (err) {
      console.error(err);
      alert('Sign up failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-md space-y-6">
        <h2 className="text-2xl text-center">Sign In / Sign Up</h2>
        <button
          onClick={signInWithGoogle}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Sign in with Google
        </button>
        <div className="text-center text-gray-500">or use email</div>
        <form className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-between">
            <button
              onClick={handleEmailSignIn}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Sign In
            </button>
            <button
              onClick={handleEmailSignUp}
              className="px-4 py-2 bg-yellow-600 text-white rounded"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}