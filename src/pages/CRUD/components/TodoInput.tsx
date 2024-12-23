import { ChangeEvent, FormEvent, useState } from 'react';

import { Plus } from 'lucide-react';

import { usePostTodoApi } from '@/apis/todo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useDomainStore from '@/store';

const TodoInput = () => {
  const [todo, setTodo] = useState('');
  const { domain } = useDomainStore();
  const postTodo = usePostTodoApi(domain);

  const changeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const submitTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    postTodo(todo);
    setTodo('');
  };

  return (
    <form onSubmit={submitTodo} className='relative'>
      <Input
        placeholder='할 일을 입력하세요'
        onChange={changeTodo}
        value={todo}
        className='border-zinc-200 py-6 pl-6 pr-14 text-zinc-800 transition-all placeholder:text-zinc-400 hover:border-zinc-400 focus:border-zinc-900'
      />
      <Button
        type='submit'
        size='icon'
        variant='ghost'
        className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
        disabled={!todo.trim()}
      >
        <Plus className='h-5 w-5' />
      </Button>
    </form>
  );
};

export default TodoInput;
