import { nextApi } from './serverConfig';
import { CreateSection, UpdateSection } from '@/types/section';

export async function getSections() {
  const result = await nextApi.get('/sections');
  return result.data;
}

export async function getSectionById(id: string) {
  const result = await nextApi.get(`/sections/${id}`);
  return result.data;
}

export async function createSection(body: CreateSection) {
  const result = await nextApi.post('/sections', body);
  return result.data;
}

export async function updateSection(id: string, body: UpdateSection) {
  const result = await nextApi.patch(`/sections/${id}`, body);
  return result.data;
}

export async function deleteSection(id: string) {
  const result = await nextApi.delete(`/sections/${id}`);
  return result.data;
}
