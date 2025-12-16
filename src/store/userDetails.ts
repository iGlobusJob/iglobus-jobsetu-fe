import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'candidate' | 'vendor' | 'admin' | 'recruiter' | null;

type AuthStore = {
  email: string | null;
  userRole: UserRole;
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;

  setAuth: (data: {
    email: string;
    userRole: UserRole;
    token: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
  }) => void;

  updateProfilePicture: (profilePicture: string) => void;
  clearAuth: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      email: null,
      userRole: null,
      token: null,
      firstName: null,
      lastName: null,
      profilePicture: null,

      setAuth: ({
        email,
        userRole,
        token,
        firstName = null,
        lastName = null,
        profilePicture = null,
      }) =>
        set({
          email,
          userRole,
          token,
          firstName,
          lastName,
          profilePicture,
        }),

      updateProfilePicture: (profilePicture: string) =>
        set((state) => ({ ...state, profilePicture })),

      clearAuth: () =>
        set({
          email: null,
          userRole: null,
          token: null,
          firstName: null,
          lastName: null,
          profilePicture: null,
        }),

      isLoggedIn: () => {
        const { email, token } = get();
        return Boolean(email && token);
      },
    }),
    {
      name: 'auth-store',
    }
  )
);
