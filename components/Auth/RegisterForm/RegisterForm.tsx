'use client';
import { useState } from 'react';
import { register } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import css from './RegisterForm.module.css';

const RegisterForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('invite');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nickname || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await register({
        nickname,
        email,
        password,
        adminCode: adminCode || undefined,
        inviteToken: inviteToken || undefined,
      });
      router.push('/auth/login');
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css['registerForm']}>
      <form onSubmit={handleSubmit} className={css['form']}>
        <div className={css['formHeader']}>
          <h2>Register</h2>
          <p>Create your account</p>
        </div>
        <div className={css['inputs']}>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
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
          {!inviteToken && (
            <input
              type="password"
              placeholder="Admin code (optional)"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
          )}
        </div>
        {error && <p className={css['error']}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className={css['footer']}>
          Already have an account?{' '}
          <Link href="/auth/login" className={css['link']}>
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
