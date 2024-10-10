import { create } from 'zustand';

export type Domain = string | undefined;

interface DomainStore {
  domain: Domain;
  setDomain: (newDomain: string) => void;
}

const useDomainStore = create<DomainStore>(set => ({
  domain: undefined,
  setDomain: (newDomain: string) => set({ domain: newDomain }),
}));

export default useDomainStore;
