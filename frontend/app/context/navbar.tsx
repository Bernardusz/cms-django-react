import { create } from "zustand";

interface Navbar {
    isOpen: boolean;
    toggleIsOpen: () => void;
}

const useNavbar = create<Navbar>((set) => ({
    isOpen: false,
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
export default useNavbar;