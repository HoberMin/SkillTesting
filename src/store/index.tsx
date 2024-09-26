import { create } from 'zustand';

interface Domain {
  domain: string;
  setDomain: (newDomain: string) => void;
}

const useDomainStore = create<Domain>(set => ({
  domain: '',
  setDomain: (newDomain: string) => set({ domain: newDomain }),
}));

export default useDomainStore;
