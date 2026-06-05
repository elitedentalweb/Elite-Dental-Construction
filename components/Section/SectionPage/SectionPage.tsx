'use client';
import { useEffect, useState } from 'react';
import { useSectionStore } from '@/store/sectionStore';
import { usePhotoStore } from '@/store/photoStore';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import css from './SectionPage.module.css';

type Props = {
  id: string;
};

const SectionPage = ({ id }: Props) => {
  const router = useRouter();
  const { currentSection, fetchSectionById, deleteSection } = useSectionStore();
  const { photos, fetchPhotos } = usePhotoStore();
  const { user } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchSectionById(id);
    fetchPhotos(id);
  }, [id]);

  if (!currentSection) return <p className={css['loading']}>Loading...</p>;

  const handleDelete = async () => {
    await deleteSection(id);
    router.push('/');
  };

  return (
    <div className={css['page']}>
      <button className={css['back']} onClick={() => router.back()}>
        ← Back
      </button>

      <div className={css['header']}>
        <h1 className={css['title']}>{currentSection.title}</h1>
        {isAdmin && (
          <div className={css['actions']}>
            <Link href={`/sections/${id}/edit`} className={css['editButton']}>
              ✏️ Edit
            </Link>
            <button
              className={css['deleteButton']}
              onClick={() => setShowConfirm(true)}
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>

      {currentSection.description && (
        <p className={css['description']}>{currentSection.description}</p>
      )}

      <div className={css['photosSection']}>
        <h2 className={css['sectionTitle']}>Photos</h2>
        <div className={css['grid']}>
          {photos.length === 0 && <p className={css['empty']}>No photos yet</p>}
          {photos.map((photo) => (
            <Link
              key={photo._id}
              href={`/sections/${id}/photos/${photo._id}`}
              className={css['photoCard']}
            >
              <img
                src={photo.urls?.[0]}
                alt={photo.title}
                className={css['photo']}
              />
              <p className={css['photoTitle']}>{photo.title}</p>
            </Link>
          ))}
        </div>
        {isAdmin && (
          <Link
            href={`/sections/${id}/photos/create`}
            className={css['addPhoto']}
          >
            + Add Photo
          </Link>
        )}
      </div>

      {showConfirm && (
        <div className={css['overlay']}>
          <div className={css['modal']}>
            <p className={css['modalText']}>
              Are you sure you want to delete this section?
            </p>
            <div className={css['modalButtons']}>
              <button
                className={css['cancelButton']}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className={css['confirmButton']} onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionPage;
