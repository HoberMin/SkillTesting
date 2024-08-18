import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

interface Todo {
  content: string;
  completed: boolean;
  id: number;
}

const domain = 'http://localhost:8080';

const getTodo = () =>
  fetch(`${domain}/todos`)
    .then(res => res.json())
    .then(data => data as Todo[]);
// fetch(`https://jsonplaceholder.typicode.com/todos`)
//   .then(res => res.json())
//   .then(data => data as Todo[]);

const postTodo = async (content: string) =>
  await fetch(`${domain}/todos`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
  });

const patchTodo = (todoId: number) =>
  fetch(`${domain}/todos/${todoId}`, {
    method: 'PATCH',
  });

const deleteTodo = (todoId: number) =>
  fetch(`${domain}/todos/${todoId}`, {
    method: 'DELETE',
  });

export const getTodoApi = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: getTodo,
  });

export const postTodoApi = () => {
  const queryClient = new QueryClient();
  const { mutate } = useMutation({
    mutationFn: (contents: string) => postTodo(contents),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return mutate;
};

export const patchTodoApi = () => {
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => patchTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return mutate;
};

export const deleteTodoApi = () => {
  const queryClient = new QueryClient();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  return mutate;
};
