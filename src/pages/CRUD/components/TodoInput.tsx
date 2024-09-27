import { ChangeEvent, FormEvent, useState } from 'react';

import { postTodoApi } from '@/apis/todo';
import useDomainStore from '@/store';

import { Input } from '../../../components/input';

const TodoInput = () => {
  const [todo, setTodo] = useState('');
  const { domain } = useDomainStore();
  const postTodo = postTodoApi(domain);

  const changeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const submitTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTodo(todo);
    setTodo('');
  };

  return (
    <form onSubmit={submitTodo}>
      <Input
        placeholder='할 일을 입력하세요'
        onChange={changeTodo}
        value={todo}
        className='p-6 shadow-lg'
      />
    </form>
  );
};

export default TodoInput;
