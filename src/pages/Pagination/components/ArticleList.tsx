import { Link, useParams } from 'react-router-dom';

import { useGetOffsetPagingAPI } from '@/apis/offsetPaging';
import AlertBox from '@/components/AlertBox';
import { Button } from '@/components/button';
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
    return null;
  }

  if (isError) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>Offset Paging</span>
          <Button>
            <Link to='/paging/cursor'>Change to Cursor</Link>
          </Button>
        </div>
        <main className='flex w-full grow flex-col justify-center gap-[30px]'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            {isError && <AlertBox />}
          </div>
        </main>
      </>
    );
  }

  const { articles, currentPageNumber, totalPage } = data;
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
        <PaginationItem>
          <PaginationLink href='1'>1</PaginationLink>
        </PaginationItem>,
      );
      paginationItems.push(<PaginationEllipsis />);
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink href={`${i}`} isActive={currentPageNumber === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPage) {
      paginationItems.push(<PaginationEllipsis />);
      paginationItems.push(
        <PaginationItem key='last'>
          <PaginationLink href={`${totalPage}`}>{totalPage}</PaginationLink>
        </PaginationItem>,
      );
    }

    return paginationItems;
  };

  return (
    <main className='flex w-full grow flex-col justify-center gap-[30px]'>
      <div className='mx-auto flex w-[600px] flex-col gap-5'>
        <div className='overflow-x-hidden border border-gray-200'>
          {!isError &&
            !isPending &&
            articles &&
            articles.map(({ title, createdAt, id }, i) => (
              <ArticleItem
                title={title}
                createdAt={createdAt}
                key={`${i}-${id}`}
              />
            ))}
        </div>
        {isError && <AlertBox />}
      </div>
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
    </main>
  );
};

export default ArticleList;
