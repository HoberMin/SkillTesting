import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useGetCursorPagingAPI } from '@/apis/cursorPaging';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import useDomainStore from '@/store';

import AlertBox from '../../components/AlertBox';
import ArticleItem from './components/ArticleItem';

const TodoContainer = () => {
  const { ref, inView: isInview } = useInView();
  const { domain } = useDomainStore();

  const { articles, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useGetCursorPagingAPI(domain);

  useEffect(() => {
    if (isInview && hasNextPage) {
      fetchNextPage();
    }
  }, [isInview, hasNextPage, fetchNextPage]);

  if (!domain) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>Cursor Paging</span>
          <div className='flex items-center gap-[10px]'>
            <Button>
              <Link to='/paging/offset/1'>Change to Offset</Link>
            </Button>
            {/* <InfoModal file='' /> */}
          </div>
        </div>
        <main className='flex h-full w-full flex-col justify-center'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            <NotDomainAlertBox />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
        <span>Cursor Paging</span>
        <div className='flex items-center gap-[10px]'>
          <Button>
            <Link to='/paging/offset/1'>Change to Offset</Link>
          </Button>
          {/* <InfoModal /> */}
        </div>
      </div>
      <main className='flex w-full grow flex-col items-center justify-center'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          {!isError && articles && (
            <>
              <div className='max-h-[500px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
                {articles.map(({ title, createdAt, id }) => (
                  <ArticleItem key={id} title={title} createdAt={createdAt} />
                ))}
                {isFetchingNextPage && <div></div>}
                <div ref={ref} className='h-[10px]'></div>
              </div>
              <span className='mt-[40px]'>
                Made By HoberMin / songhaeunsong
              </span>
            </>
          )}
          {isError && <AlertBox />}
        </div>
      </main>
    </>
  );
};

export default TodoContainer;
