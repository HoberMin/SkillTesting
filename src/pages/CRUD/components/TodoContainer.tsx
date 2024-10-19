import { useGetTodoAPI } from '@/apis/todo';
import InfoModal from '@/components/InfoModal';
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
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>CRUD</span>
          <div className='flex items-center gap-[10px]'>
            <InfoModal file='crud' />
          </div>
        </div>
        <main className='flex w-full grow flex-col justify-center'>
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
        <span>CRUD</span>
        <div className='flex items-center gap-[10px]'>
          <InfoModal file='crud' />
        </div>
      </div>
      <main className='flex w-full grow flex-col justify-center'>
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
