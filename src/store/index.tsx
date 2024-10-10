import { create } from 'zustand';

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

const useDomainStore = create<DomainStore>(set => ({
  domain: undefined,
  setDomain: (newDomain: string) => set({ domain: newDomain }),
}));

export default useDomainStore;
