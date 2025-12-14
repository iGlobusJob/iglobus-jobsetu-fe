import { create } from 'zustand';

type OtpModalState = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useOtpModalStore = create<OtpModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));
