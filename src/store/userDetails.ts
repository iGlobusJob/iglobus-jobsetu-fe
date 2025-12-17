import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'candidate' | 'client' | 'admin' | 'recruiter' | null;

type AuthStore = {
  email: string | null;
  userRole: UserRole;
  token: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage?: string | null;

  setAuth: (data: {
    email: string;
    userRole: UserRole;
    token: string;
    firstName?: string;
    lastName?: string;
    profileImage?: string;
  }) => void;

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
      profileImage: null,

      setAuth: ({
        email,
        userRole,
        token,
        firstName = null,
        lastName = null,
        profileImage = null,
      }) =>
        set({
          email,
          userRole,
          token,
          firstName,
          lastName,
          profileImage,
        }),

      clearAuth: () =>
        set({
          email: null,
          userRole: null,
          token: null,
          firstName: null,
          lastName: null,
          profileImage: null,
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
