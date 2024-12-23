import { useEffect } from 'react';

import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useGetCursorPagingAPI } from '@/apis/cursorPaging';
import AlertBox from '@/components/AlertBox/ResponseErrorAlertBox';
import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import MakeArticle from '@/components/MakeArticle';
import { Button } from '@/components/ui/button';
import useDomainStore from '@/store';

import ArticleItem from './components/ArticleItem';

const TodoList = () => {
  const { ref, inView: isInview } = useInView();
  const { domain } = useDomainStore();
  const { articles, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useGetCursorPagingAPI(domain);

  useEffect(() => {
    if (isInview && hasNextPage) {
      fetchNextPage();
    }
  }, [isInview, hasNextPage, fetchNextPage]);

  if (isError) {
    return <AlertBox />;
  }

  if (!articles) {
    return null;
  }

  return (
    <div className='w-full'>
      <div className='relative flex max-h-[600px] flex-col rounded-lg border border-zinc-200 bg-white'>
        <div className='flex-1 divide-y divide-zinc-100 overflow-y-auto'>
          {articles.map(({ title, createdAt, id }) => (
            <ArticleItem key={id} title={title} createdAt={createdAt} />
          ))}

          <div ref={ref} className='h-16'>
            {isFetchingNextPage && (
              <div className='flex h-full items-center justify-center border-t border-zinc-100 bg-zinc-50'>
                <div className='flex items-center gap-2 text-sm text-zinc-500'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  <span>다음 게시글 불러오는 중...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-4 text-center text-sm text-zinc-500'>
        Made By HoberMin / songhaeunsong
      </div>
    </div>
  );
};

const TodoContainer = () => {
  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='무한 스크롤 게시글'
        description='스크롤을 내리면 자동으로 새로운 게시글이 로드됩니다. 커서 기반 페이징으로 빠르고 효율적인 데이터 로딩을 제공합니다.'
      >
        <Button
          variant='outline'
          className='gap-2 border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
          asChild
        >
          <Link to='/paging/offset/1'>
            <ArrowRightLeft className='h-4 w-4' />
            오프셋 기반으로 변경
          </Link>
        </Button>
        <MakeArticle />
        <InfoModal file='paging' />
      </MainLayout.Header>

      <MainLayout.Content>
        <TodoList />
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default TodoContainer;
