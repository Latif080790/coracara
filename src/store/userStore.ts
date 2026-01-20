
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  initials: string;
  avatarUrl?: string;
  email?: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  collaborators: User[];
  login: (email: string, name: string) => Promise<void>;
  logout: () => void;
  addCollaborator: (newUser: User) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      collaborators: [
        { name: 'Steve Rogers', initials: 'SR', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
        { name: 'Tony Stark', initials: 'TS', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
        { name: 'Natasha Romanoff', initials: 'NR', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
      ],
      login: async (email, name) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        set({ 
            currentUser: { name, email, initials }, 
            isAuthenticated: true 
        });
      },
      logout: () => {
        set({ currentUser: null, isAuthenticated: false });
      },
      addCollaborator: (newUser) =>
        set((state) => ({
          collaborators: [...state.collaborators, newUser],
        })),
    }),
    {
      name: 'user-auth-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ 
        currentUser: state.currentUser, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);

export default useUserStore;
