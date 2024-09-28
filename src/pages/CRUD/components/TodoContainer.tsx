import { useGetTodoAPI } from '@/apis/todo';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import useDomainStore from '@/store';

import AlertBox from '../../../components/AlertBox';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  const { domain } = useDomainStore();
  const { data, isError, isPending } = useGetTodoAPI(domain);

  if (isPending) {
    return <div>loading...</div>;
  }

  if (!domain) {
    return (
      <main className='flex h-full w-full flex-col justify-center'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          <NotDomainAlertBox />
        </div>
      </main>
    );
  }

  return (
    <main className='flex h-full w-full flex-col justify-center'>
      <div className='mx-auto flex w-[600px] flex-col gap-5'>
        {!isError && data && (
          <>
            <TodoInput />
            <div className='max-h-[600px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
              {data.todos.map(({ content, completed, id }) => (
                <TodoItem
                  checked={completed}
                  todo={content}
                  todoId={id}
                  key={`${content}-${id}`}
                />
              ))}
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
