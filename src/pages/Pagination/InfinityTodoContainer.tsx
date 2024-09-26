import { useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useGetInfinityScrollAPI } from '@/apis/infinityScroll';
import useDomainStore from '@/store';

import AlertBox from '../CRUD/components/AlertBox';
import ServerInputModal from '../CRUD/components/ServerInputModal';
import TodoItem from '../CRUD/components/TodoItem';

const TodoContainer = () => {
  const { ref, inView: isInview } = useInView();
  const { domain } = useDomainStore();

  const { todos, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useGetInfinityScrollAPI(domain);

  useEffect(() => {
    if (isInview && hasNextPage) {
      fetchNextPage();
    }
  }, [isInview, hasNextPage, fetchNextPage]);

  return (
    <main className='flex h-full w-full flex-col justify-center'>
      <div className='mx-auto flex w-[600px] flex-col gap-5'>
        <div className='flex justify-end'>
          <ServerInputModal />
        </div>
        {!isError && todos && (
          <>
            <div className='max-h-[600px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
              {todos.map(({ content, completed, id }) => (
                <TodoItem
                  checked={completed}
                  todo={content}
                  todoId={id}
                  key={`${content}-${id}`}
                />
              ))}
              {isFetchingNextPage && <div>로딩중...</div>}
              <div ref={ref} className='h-[20px]'></div>
            </div>
            <span className='mt-[40px]'>Made By HoberMin / songhaeunsong</span>
          </>
        )}
        {isError && <AlertBox />}
      </div>
    </main>
  );
};

export default TodoContainer;
