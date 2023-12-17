import { create } from "zustand";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useSubsriptionModal = create<Props>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useSubsriptionModal };
