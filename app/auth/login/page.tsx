import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import css from './page.module.css';
import Link from 'next/link';

const Page = () => {
  return (
    <div className={css['page']}>
      <div className={css['left']}>
        <Link href="/" className={css['logo']}>
          <svg width={136} height={140} className={css['logoSvg']}>
            <use href="/logo-sprite.svg#icon-auth-logo"></use>
          </svg>
        </Link>
      </div>
      <div className={css['right']}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
