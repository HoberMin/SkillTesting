import { patchTodoApi } from '@/apis/todo';

import TodoEditIcon from './TodoEditIcon';
import { Switch } from './shadcn/switch';

interface TodoItemProps {
  checked: boolean;
  todo: string;
  todoId: number;
}
const TodoItem = ({ checked, todo, todoId }: TodoItemProps) => {
  const patchTodo = patchTodoApi();

  const handleTodoPut = () => {
    patchTodo(todoId);
  };

  return (
    <div className='px-8 py-4'>
      <div className='flex items-center justify-between font-medium'>
        <div className='flex items-center gap-2'>
          <Switch checked={checked} onClick={handleTodoPut} />
          <span>{todo}</span>
        </div>
        <TodoEditIcon todoId={todoId} />
      </div>
    </div>
  );
};

export default TodoItem;
