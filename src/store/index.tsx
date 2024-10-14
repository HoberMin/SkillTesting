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

interface TokenTypeStore {
  tokenType: number | undefined;
  setTokenType: (newType: number) => void;
}

interface TokenStore {
  refreshToken: string | undefined;
  setRefreshToken: (newType: string) => void;
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

export const useTokenTypeStore = create(
  persist<TokenTypeStore>(
    set => ({
      tokenType: undefined,
      setTokenType: (newType: number) => set({ tokenType: newType }),
    }),
    {
      name: 'tokenType-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useRefreshTokenStore = create(
  persist<TokenStore>(
    set => ({
      refreshToken: undefined,
      setRefreshToken: (newToken: string) => set({ refreshToken: newToken }),
    }),
    {
      name: 'refreshtoken-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDomainStore;
