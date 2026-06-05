import { create } from 'zustand';
import {
  getSections,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
} from '@/services/sections';
import { Section, CreateSection, UpdateSection } from '@/types/section';

type SectionStore = {
  sections: Section[];
  currentSection: Section | null;
  isLoading: boolean;

  fetchSections: () => Promise<void>;
  fetchSectionById: (id: string) => Promise<void>;
  createSection: (section: CreateSection) => Promise<void>;
  updateSection: (id: string, section: UpdateSection) => Promise<void>;
  deleteSection: (id: string) => Promise<void>;
};

export const useSectionStore = create<SectionStore>((set, get) => ({
  sections: [],
  currentSection: null,
  isLoading: false,

  fetchSections: async () => {
    set({ isLoading: true });
    try {
      const data = await getSections();
      set({ sections: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSectionById: async (id) => {
    set({ isLoading: true });
    try {
      const data = await getSectionById(id);
      set({ currentSection: data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  createSection: async (section) => {
    set({ isLoading: true });
    try {
      const newSection = await createSection(section);
      set({ sections: [newSection, ...get().sections] });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateSection: async (id, section) => {
    set({ isLoading: true });
    try {
      const updated = await updateSection(id, section);
      set({
        sections: get().sections.map((el) => (el._id === id ? updated : el)),
        currentSection: updated,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSection: async (id) => {
    set({ isLoading: true });
    try {
      await deleteSection(id);
      set({ sections: get().sections.filter((el) => el._id !== id) });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
