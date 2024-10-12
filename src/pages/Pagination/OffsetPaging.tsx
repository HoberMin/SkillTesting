import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { useGetOffsetPagingAPI } from '@/apis/offsetPaging';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import useDomainStore from '@/store';

import AlertBox from '../../components/AlertBox';
import TodoItem from '../CRUD/components/TodoItem';

const TodoContainer = () => {
  const { ref, inView: isInview } = useInView();
  const { domain } = useDomainStore();

  const { todos, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useGetOffsetPagingAPI(domain);

  useEffect(() => {
    if (isInview && hasNextPage) {
      fetchNextPage();
    }
  }, [isInview, hasNextPage, fetchNextPage]);

  if (!domain) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>Offset Paging</span>
          <Button>
            <Link to='/paging/2'>Change to Cursor</Link>
          </Button>
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
        <span>Offset Paging</span>
        <Button>
          <Link to='/paging/2'>Change to Cursor</Link>
        </Button>
      </div>
      <main className='flex w-full grow flex-col justify-center'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          {!isError && todos && (
            <>
              <div className='max-h-[500px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
                {todos.map(({ content, id }) => (
                  <TodoItem
                    todo={content}
                    todoId={id}
                    key={`${content}-${id}`}
                    isInfinity={true}
                  />
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
