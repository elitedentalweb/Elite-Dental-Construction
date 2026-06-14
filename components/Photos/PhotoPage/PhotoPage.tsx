'use client';
import { useEffect, useState } from 'react';
import { usePhotoStore } from '@/store/photoStore';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import css from './PhotoPage.module.css';

type Props = {
  photoId: string;
  sectionId: string;
};

const PhotoPage = ({ photoId, sectionId }: Props) => {
  const router = useRouter();
  const { currentPhoto, fetchPhotoById, deletePhoto } = usePhotoStore();
  const { user } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    fetchPhotoById(photoId);
  }, [photoId]);

  if (!currentPhoto) return <p className={css['loading']}>Loading...</p>;

  const handleDelete = async () => {
    await deletePhoto(photoId);
    router.push(`/sections/${sectionId}`);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIndex === null) return;
    setPreviewIndex(
      previewIndex === 0 ? currentPhoto.urls.length - 1 : previewIndex - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewIndex === null) return;
    setPreviewIndex(
      previewIndex === currentPhoto.urls.length - 1 ? 0 : previewIndex + 1
    );
  };

  return (
    <div className={css['page']}>
      <button className={css['back']} onClick={() => router.back()}>
        ← Back
      </button>

      <div className={css['header']}>
        <h1 className={css['title']}>{currentPhoto.title}</h1>
        {isAdmin && (
          <div className={css['actions']}>
            <Link
              href={`/sections/${sectionId}/photos/${photoId}/edit`}
              className={css['editButton']}
            >
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

      {currentPhoto.description && (
        <div className={css['section']}>
          <h2 className={css['sectionTitle']}>Description</h2>
          <p className={css['description']}>{currentPhoto.description}</p>
        </div>
      )}

      {currentPhoto.urls && currentPhoto.urls.length > 0 && (
        <div className={css['photos']}>
          {currentPhoto.urls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`photo-${i}`}
              className={css['photo']}
              onClick={() => setPreviewIndex(i)}
            />
          ))}
        </div>
      )}

      {previewIndex !== null && (
        <div className={css['overlay']} onClick={() => setPreviewIndex(null)}>
          <button className={css['navBtn']} onClick={handlePrev}>
            <ChevronLeft size={28} />
          </button>
          <img
            src={currentPhoto.urls[previewIndex]}
            alt="preview"
            className={css['previewImg']}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={css['navBtn']} onClick={handleNext}>
            <ChevronRight size={28} />
          </button>
          <button
            className={css['closeBtn']}
            onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex(null);
            }}
          >
            <X size={20} />
          </button>
          <span className={css['counter']}>
            {previewIndex + 1} / {currentPhoto.urls.length}
          </span>
        </div>
      )}

      {showConfirm && (
        <div className={css['overlay']}>
          <div className={css['modal']}>
            <p className={css['modalText']}>
              Are you sure you want to delete this photo?
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

export default PhotoPage;
