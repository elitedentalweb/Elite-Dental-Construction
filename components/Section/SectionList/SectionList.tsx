'use client';
import { useEffect } from 'react';
import { useSectionStore } from '@/store/sectionStore';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import css from './SectionList.module.css';

const SectionList = () => {
  const { sections, fetchSections } = useSectionStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className={css['sectionList']}>
      <div className={css['header']}>
        <h1 className={css['title']}>Sections</h1>
        {isAdmin && (
          <Link href="/sections/create" className={css['addButton']}>
            + Add Section
          </Link>
        )}
      </div>
      <div className={css['list']}>
        {sections.length === 0 && (
          <p className={css['empty']}>No sections yet</p>
        )}
        {sections.map((section) => (
          <Link
            key={section._id}
            href={`/sections/${section._id}`}
            className={css['card']}
          >
            <h2 className={css['cardTitle']}>{section.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionList;
