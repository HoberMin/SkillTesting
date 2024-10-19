import { useQuery } from '@tanstack/react-query';

import { Domain } from '@/store';

export interface Article {
  title: string;
  createdAt: string;
  id: number;
}

interface OffsetPagingData {
  articles: Article[];
  currentPageNumber: number;
  totalPage: number;
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

const getOffsetPaging = async (size = '10', page: string, domain: Domain) => {
  const params = new URLSearchParams({ size, page }).toString();

  return await fetch(`${domain}/articles/paging/offset?${params}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as OffsetPagingData);
};

export const useGetOffsetPagingAPI = (domain: Domain, page: string) =>
  useQuery({
    queryKey: ['offset-paging', domain],
    queryFn: () => getOffsetPaging('6', page, domain),
  });
