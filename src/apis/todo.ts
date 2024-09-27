import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';

interface Todo {
  content: string;
  completed: boolean;
  id: number;
}

interface Todos {
  todos: Todo[];
}

const getTodo = async (domain: string) => {
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
    .then(data => data as Todos);
};

export const getTodoApi = (domain: string) =>
  useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodo(domain),
  });

const postTodo = async (content: string, domain: string) => {
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

const patchTodo = (todoId: number, domain: string) => {
  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
};
const deleteTodo = (todoId: number, domain: string) => {
  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};

export const postTodoApi = (domain: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (contents: string) => postTodo(contents, domain),
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

export const patchTodoApi = (domain: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => patchTodo(todoId, domain),
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

export const deleteTodoApi = (domain: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId, domain),
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
