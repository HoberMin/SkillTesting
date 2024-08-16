import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

interface Todo {
  userId: number;
  title: string;
  completed: boolean;
}

const domain = 'localhost:8080';

const getTodo = () =>
  fetch(`${domain}/todos`)
    .then(res => res.json())
    .then(data => data as Todo[]);

const postTodo = (contents: string) =>
  fetch(`${domain}/todos`, {
    method: 'POST',
    body: JSON.stringify({
      contents,
    }),
  });

const patchTodo = (todoId: number) =>
  fetch(`${domain}/todos/${todoId}`, { method: 'PATCH' });

const deleteTodo = (todoId: number) =>
  fetch(`${domain}/todos/${todoId}`, { method: 'DELETE' });

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
