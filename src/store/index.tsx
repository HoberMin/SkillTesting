import { create } from 'zustand';

interface Domain {
  domain: string | undefined;
  setDomain: (newDomain: string) => void;
}

const useDomainStore = create<Domain>(set => ({
  domain: undefined,
  setDomain: (newDomain: string) => set({ domain: newDomain }),
}));

export default useDomainStore;
