import { useGetTodoAPI } from '@/apis/todo';
import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import ResponseErrorAlertBox from '@/components/AlertBox/ResponseErrorAlertBox';
import MainLayout from '@/components/MainLayout';
import Spinner from '@/components/Spinner';
import useDomainStore from '@/store';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const TodoContainer = () => {
  const { domain } = useDomainStore();
  const { data, isError, isPending } = useGetTodoAPI(domain);

  if (isPending) {
    return <Spinner text='로딩중' />;
  }

  if (!domain) {
    return (
      <MainLayout MainTitle='CRUD' docsTitle='crud'>
        <NotDomainAlertBox />
      </MainLayout>
    );
  }

  if (isError || data.todos === undefined) {
    return (
      <MainLayout MainTitle='CRUD' docsTitle='crud'>
        <ResponseErrorAlertBox />
      </MainLayout>
    );
  }

  return (
    <MainLayout MainTitle='CURD' docsTitle='crud'>
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
    </MainLayout>
  );
};

export default TodoContainer;
