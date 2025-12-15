import { create } from 'zustand';

type OtpModalState = {
  open: boolean;
  openModal: (jobId?: string) => void;
  redirectJobId: string | null;
  closeModal: () => void;
};

export const useOtpModalStore = create<OtpModalState>((set) => ({
  open: false,
  redirectJobId: null,
  openModal: (jobId?: string) =>
    set({
      open: true,
      redirectJobId: jobId ?? null,
    }),

  closeModal: () =>
    set({
      open: false,
      redirectJobId: null,
    }),
}));
