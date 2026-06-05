'use client';
import { useState } from 'react';
import { useSectionStore } from '@/store/sectionStore';
import { useRouter } from 'next/navigation';
import css from './SectionForm.module.css';

type Props = {
  mode: 'create' | 'edit';
  id?: string;
  initialTitle?: string;
  initialDescription?: string;
};

const SectionForm = ({
  mode,
  id,
  initialTitle = '',
  initialDescription = '',
}: Props) => {
  const { createSection, updateSection } = useSectionStore();
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title) {
      setError('Please enter a title');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'create') {
        await createSection({ title, description });
        router.push('/');
      } else if (mode === 'edit' && id) {
        await updateSection(id, { title, description });
        router.push(`/sections/${id}`);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css['sectionForm']}>
      <button className={css['back']} onClick={() => router.back()}>
        ← Back
      </button>
      <h1 className={css['title']}>
        {mode === 'create' ? 'Add Section' : 'Edit Section'}
      </h1>
      <form className={css['form']} onSubmit={handleSubmit}>
        <div className={css['field']}>
          <label className={css['label']}>Title *</label>
          <input
            className={css['input']}
            type="text"
            placeholder="e.g. Electrical"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={css['field']}>
          <label className={css['label']}>Description</label>
          <textarea
            className={css['textarea']}
            placeholder="Describe this section..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        {error && <p className={css['error']}>{error}</p>}
        <button
          className={css['submitButton']}
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Saving...'
            : mode === 'create'
              ? 'Create Section'
              : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default SectionForm;
