import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/shadcn/toast/use-toast';
import { getDomain } from '@/utils/domain';

interface Todo {
  content: string;
  completed: boolean;
  id: number;
}

const getTodo = async () => {
  const domain = getDomain();

  return await fetch(`${domain}/todos`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as Todo[]);
};

export const getTodoApi = () =>
  useQuery({
    queryKey: ['todos'],
    queryFn: getTodo,
  });

const postTodo = async (content: string) => {
  const domain = getDomain();

  return await fetch(`${domain}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });
};

const patchTodo = (todoId: number) => {
  const domain = getDomain();

  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
};
const deleteTodo = (todoId: number) => {
  const domain = getDomain();

  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};

export const postTodoApi = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (contents: string) => postTodo(contents),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'POST 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutate;
};

export const patchTodoApi = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => patchTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'PATCH 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutate;
};

export const deleteTodoApi = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'DELETE 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutate;
};
