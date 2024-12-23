import { CheckCircle, Circle } from 'lucide-react';

import { usePatchTodoApi } from '@/apis/todo';
import { useToast } from '@/components/toast/use-toast';
import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

import TodoEditIcon from './TodoEditIcon';

interface TodoItemProps {
  checked?: boolean;
  todo: string;
  todoId: number;
  isInfinity?: boolean;
}

const TodoItem = ({
  checked,
  todo,
  todoId,
  isInfinity = false,
}: TodoItemProps) => {
  const { domain } = useDomainStore();
  const patchTodo = usePatchTodoApi(domain);
  const { toast } = useToast();

  const handleTodoPut = () => {
    if (checked === undefined) {
      toast({
        variant: 'destructive',
        title: '오류 발생',
        description: '완료 상태 값이 없습니다.',
      });
      return;
    }
    patchTodo(todoId);
  };

  return (
    <div className='group relative rounded-md transition-all duration-300 hover:bg-zinc-100'>
      <div
        className='flex cursor-pointer items-center justify-between px-6 py-4'
        onClick={handleTodoPut}
      >
        <div className='flex flex-1 items-center gap-4 overflow-hidden'>
          {!isInfinity && (
            <button className='flex-shrink-0 transition-transform duration-200 hover:scale-110 focus:outline-none'>
              {checked ? (
                <CheckCircle className='h-5 w-5 text-green-500' />
              ) : (
                <Circle className='h-5 w-5 text-zinc-400 group-hover:text-zinc-600' />
              )}
            </button>
          )}
          <span
            className={cn(
              `duration-200, transition-all', truncate text-sm`,
              checked
                ? 'text-zinc-400 line-through'
                : 'text-zinc-700 group-hover:text-zinc-900',
            )}
          >
            {todo}
          </span>
        </div>
        {!isInfinity && (
          <div className='flex-shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100'>
            <TodoEditIcon todoId={todoId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
