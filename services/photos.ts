import { nextApi } from './serverConfig';
import { CreatePhoto, UpdatePhoto } from '@/types/photo';

export async function getPhotos(sectionId?: string) {
  const url = sectionId ? `/photos?sectionId=${sectionId}` : '/photos';
  const result = await nextApi.get(url);
  return result.data;
}

export async function getPhotoById(id: string) {
  const result = await nextApi.get(`/photos/${id}`);
  return result.data;
}

export async function createPhoto(body: CreatePhoto) {
  const result = await nextApi.post('/photos', body);
  return result.data;
}

export async function updatePhoto(id: string, body: UpdatePhoto) {
  const result = await nextApi.patch(`/photos/${id}`, body);
  return result.data;
}

export async function deletePhoto(id: string) {
  const result = await nextApi.delete(`/photos/${id}`);
  return result.data;
}
