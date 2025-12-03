import { create } from 'zustand';

import { IUser, UseUsersStoreProps } from '@/store/users/type';

export const useUsersStore = create<UseUsersStoreProps>((set, get) => ({
  users: [],
  loading: false,
  error: null,
  hasFetched: false,
  fetchUsers: async () => {
    if (get().hasFetched) {
      return;
    }

    try {
      set({ loading: true, error: null });

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error('Failed to download the users list');
      }

      const data = (await response.json()) as IUser[];

      set({ users: data, hasFetched: true });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));

