'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import css from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      await checkAuth();
      router.push('/');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css['loginForm']}>
      <form onSubmit={handleSubmit} className={css['form']}>
        <div className={css['formHeader']}>
          <h2>Log in</h2>
          <p>Enter your email and password</p>
        </div>
        <div className={css['inputs']}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link href="/auth/forgot-password" className={css['forgotLink']}>
          Forgot password?
        </Link>
        {error && <p className={css['error']}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </button>
        <p className={css['footer']}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className={css['link']}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
