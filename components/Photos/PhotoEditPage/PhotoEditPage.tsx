'use client';
import { useEffect } from 'react';
import { usePhotoStore } from '@/store/photoStore';
import PhotoForm from '../PhotoForm/PhotoForm';

const PhotoEditPage = ({
  sectionId,
  photoId,
}: {
  sectionId: string;
  photoId: string;
}) => {
  const { currentPhoto, fetchPhotoById } = usePhotoStore();

  useEffect(() => {
    fetchPhotoById(photoId);
  }, [photoId]);

  if (!currentPhoto) return null;

  return (
    <PhotoForm
      mode="edit"
      sectionId={sectionId}
      photoId={photoId}
      initialTitle={currentPhoto.title}
      initialDescription={currentPhoto.description}
      initialUrls={currentPhoto.urls}
    />
  );
};

export default PhotoEditPage;
