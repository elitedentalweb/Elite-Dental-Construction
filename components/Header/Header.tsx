'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuth, checkAuth, logout } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <>
      <div className={css['header']}>
        <button className={css['burger']} onClick={() => setIsOpen(true)}>
          ☰
        </button>
        <Link href="/" className={css['logo']}>
          <svg width={136} height={23} className={css['logoSvg']}>
            <use href="/logo-sprite.svg#icon-header-logo"></use>
          </svg>
        </Link>
        <div className={css['placeholder']} />
      </div>

      {isOpen && (
        <div className={css['overlay']} onClick={() => setIsOpen(false)}>
          <div className={css['sidebar']} onClick={(e) => e.stopPropagation()}>
            <div className={css['sidebarHeader']}>
              <Link
                href="/"
                className={css['sidebarLogo']}
                onClick={() => setIsOpen(false)}
              >
                <svg width={136} height={23} className={css['logoSvg']}>
                  <use href="/logo-sprite.svg#icon-header-logo"></use>
                </svg>
              </Link>
              <button className={css['close']} onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>
            <nav className={css['nav']}>
              <Link href="/" onClick={() => setIsOpen(false)}>
                Sections
              </Link>
              {isAdmin && (
                <Link href="/users" onClick={() => setIsOpen(false)}>
                  Users
                </Link>
              )}
            </nav>
            {isAuth ? (
              <button className={css['logout']} onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className={css['logout']}
                onClick={() => setIsOpen(false)}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
