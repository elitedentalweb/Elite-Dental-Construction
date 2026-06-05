import { create } from 'zustand';
import {
  getPhotos,
  getPhotoById,
  createPhoto,
  updatePhoto,
  deletePhoto,
} from '@/services/photos';
import { Photo, CreatePhoto, UpdatePhoto } from '@/types/photo';

type PhotoStore = {
  photos: Photo[];
  currentPhoto: Photo | null;
  isLoading: boolean;

  fetchPhotos: (sectionId?: string) => Promise<void>;
  fetchPhotoById: (id: string) => Promise<void>;
  createPhoto: (photo: CreatePhoto) => Promise<void>;
  updatePhoto: (id: string, photo: UpdatePhoto) => Promise<void>;
  deletePhoto: (id: string) => Promise<void>;
};

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  currentPhoto: null,
  isLoading: false,

  fetchPhotos: async (sectionId) => {
    set({ isLoading: true });
    try {
      const data = await getPhotos(sectionId);
      set({ photos: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPhotoById: async (id) => {
    set({ isLoading: true });
    try {
      const data = await getPhotoById(id);
      set({ currentPhoto: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPhoto: async (photo) => {
    set({ isLoading: true });
    try {
      const newPhoto = await createPhoto(photo);
      set({ photos: [newPhoto, ...get().photos] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updatePhoto: async (id, photo) => {
    set({ isLoading: true });
    try {
      const updated = await updatePhoto(id, photo);
      set({
        photos: get().photos.map((el) => (el._id === id ? updated : el)),
        currentPhoto: updated,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deletePhoto: async (id) => {
    set({ isLoading: true });
    try {
      await deletePhoto(id);
      set({ photos: get().photos.filter((el) => el._id !== id) });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
