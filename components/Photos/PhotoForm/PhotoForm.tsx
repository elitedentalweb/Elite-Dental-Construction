'use client';
import { useState } from 'react';
import { usePhotoStore } from '@/store/photoStore';
import { useRouter } from 'next/navigation';
import css from './PhotoForm.module.css';

type Props = {
  mode: 'create' | 'edit';
  sectionId: string;
  photoId?: string;
  initialTitle?: string;
  initialDescription?: string;
  initialUrls?: string[];
};

const PhotoForm = ({
  mode,
  sectionId,
  photoId,
  initialTitle = '',
  initialDescription = '',
  initialUrls = [],
}: Props) => {
  const { createPhoto, updatePhoto } = usePhotoStore();
  const router = useRouter();

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) newUrls.push(data.url);
      }
      setUrls((prev) => [...prev, ...newUrls]);
    } catch {
      setError('Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title || urls.length === 0) {
      setError('Please fill in title and upload at least one photo');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'create') {
        await createPhoto({ title, description, urls, sectionId });
        router.push(`/sections/${sectionId}`);
      } else if (mode === 'edit' && photoId) {
        await updatePhoto(photoId, { title, description, urls });
        router.push(`/sections/${sectionId}/photos/${photoId}`);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css['photoForm']}>
      <button className={css['back']} onClick={() => router.back()}>
        ← Back
      </button>
      <h1 className={css['title']}>
        {mode === 'create' ? 'Add Photo' : 'Edit Photo'}
      </h1>
      <form className={css['form']} onSubmit={handleSubmit}>
        <div className={css['field']}>
          <label className={css['label']}>Title *</label>
          <input
            className={css['input']}
            type="text"
            placeholder="e.g. First floor wiring"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={css['field']}>
          <label className={css['label']}>Photos *</label>
          <div className={css['grid']}>
            {urls.map((url, i) => (
              <div key={i} className={css['photoItem']}>
                <img src={url} alt={`photo-${i}`} className={css['preview']} />
                <button
                  type="button"
                  className={css['removeBtn']}
                  onClick={() => handleRemove(i)}
                >
                  ✕
                </button>
              </div>
            ))}
            <label className={css['uploadLabel']}>
              {uploading ? '...' : '+'}
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>
        </div>

        <div className={css['field']}>
          <label className={css['label']}>Description</label>
          <textarea
            className={css['textarea']}
            placeholder="Describe this photo..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {error && <p className={css['error']}>{error}</p>}

        <button
          className={css['submitButton']}
          type="submit"
          disabled={loading || uploading}
        >
          {loading
            ? 'Saving...'
            : mode === 'create'
              ? 'Add Photo'
              : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default PhotoForm;
