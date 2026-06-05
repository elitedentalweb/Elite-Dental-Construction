import { create } from 'zustand';
import { User } from '@/types/user';
import { nextApi } from '@/services/serverConfig';

type UserStore = {
  users: User[];
  isLoading: boolean;

  fetchUsers: () => Promise<void>;
  approveUser: (email: string) => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  setRole: (email: string, role: 'user' | 'admin') => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,

  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const result = await nextApi.get('/users');
      set({ users: result.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  approveUser: async (email) => {
    try {
      await nextApi.post('/users/approve', { email });
      set({
        users: get().users.map((el) =>
          el.email === email ? { ...el, isApproved: true } : el
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteUser: async (email) => {
    try {
      await nextApi.delete('/users/delete', { data: { email } });
      set({ users: get().users.filter((el) => el.email !== email) });
    } catch (error) {
      console.log(error);
    }
  },

  setRole: async (email, role) => {
    try {
      await nextApi.post('/users/set-role', { email, role });
      set({
        users: get().users.map((el) =>
          el.email === email ? { ...el, role } : el
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
