import { useQuery } from '@tanstack/react-query';

import { Domain } from '@/store';

interface Todo {
  content: string;
  completed: boolean;
  id: number;
}

interface OffsetPaginglData {
  todos: Todo[];
  currentPageNumber: number;
  totalPage: number;
  size: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

const getOffsetPaging = async (size = '10', page: string, domain: Domain) => {
  const params = new URLSearchParams({ size, page }).toString();

  return await fetch(`${domain}/paging/offset?${params}`, {
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
    .then(data => data as OffsetPaginglData);
};

export const useGetOffsetPagingAPI = (domain: Domain, page: string) =>
  useQuery({
    queryKey: ['offset-paging', domain],
    queryFn: () => getOffsetPaging('10', page, domain),
  });
