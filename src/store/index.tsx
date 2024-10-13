import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type Domain = string | undefined;

interface DomainStore {
  domain: Domain;
  setDomain: (newDomain: string) => void;
}

interface QAStore {
  isQA: boolean;
  setIsQA: () => void;
}

export const useQAStore = create<QAStore>(set => ({
  isQA: false,
  setIsQA: () => set({ isQA: true }),
}));

const useDomainStore = create(
  persist<DomainStore>(
    set => ({
      domain: undefined,
      setDomain: (newDomain: string) => set({ domain: newDomain }),
    }),
    {
      name: 'domain-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useDomainStore;
