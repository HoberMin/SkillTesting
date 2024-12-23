import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';

import { useGetOffsetPagingAPI } from '@/apis/offsetPaging';
import ResponseErrorAlertBox from '@/components/AlertBox/ResponseErrorAlertBox';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useDomainStore from '@/store';

import ArticleItem from './ArticleItem';

const ArticleList = () => {
  const { domain } = useDomainStore();
  const { pagingId } = useParams() as { pagingId: string };

  const { data, isError, isPending } = useGetOffsetPagingAPI(domain, pagingId);

  if (isPending) {
    return (
      <div className='flex h-[calc(100vh-180px)] items-center justify-center'>
        <div className='flex items-center gap-2 text-zinc-500'>
          <Loader2 className='h-5 w-5 animate-spin' />
          <span>불러오는 중...</span>
        </div>
      </div>
    );
  }

  if (isError || data.articles === undefined) {
    return (
      <div className='mx-auto flex max-w-2xl flex-col px-8 py-6'>
        <ResponseErrorAlertBox />
      </div>
    );
  }

  const { articles, totalPage } = data;
  const currentPageNumber = Number(pagingId);
  const hasPrevious = currentPageNumber > 1;
  const hasNext = currentPageNumber < totalPage;

  const renderPaginationItems = () => {
    const paginationItems = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      currentPageNumber - Math.floor(maxVisiblePages / 2),
      1,
    );
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      paginationItems.push(
        <PaginationItem key='first'>
          <PaginationLink href='1'>1</PaginationLink>
        </PaginationItem>,
      );
      if (startPage > 2) {
        paginationItems.push(<PaginationEllipsis key='ellipsis1' />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`${i}`}
            isActive={currentPageNumber === i}
            className={
              currentPageNumber === i
                ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                : ''
            }
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        paginationItems.push(<PaginationEllipsis key='ellipsis2' />);
      }
      paginationItems.push(
        <PaginationItem key='last'>
          <PaginationLink href={`${totalPage}`}>{totalPage}</PaginationLink>
        </PaginationItem>,
      );
    }

    return paginationItems;
  };

  return (
    <div className='mx-auto mt-[20px] flex max-w-2xl flex-col px-8 py-6'>
      <div className='mb-6 rounded-lg border border-zinc-200 bg-white shadow-sm'>
        <div className='divide-y divide-zinc-100'>
          {articles.map(({ title, createdAt, id }, i) => (
            <ArticleItem
              title={title}
              createdAt={createdAt}
              key={`${i}-${id}`}
            />
          ))}
        </div>
      </div>

      <div className='flex justify-center'>
        <Pagination>
          <PaginationContent>
            {hasPrevious && (
              <PaginationItem>
                <PaginationPrevious href={`${+pagingId - 1}`} />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {hasNext && (
              <PaginationItem>
                <PaginationNext href={`${+pagingId + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ArticleList;
