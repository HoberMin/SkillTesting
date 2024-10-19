import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { Domain } from '@/store';

interface Todo {
  content: string;
  completed: boolean;
  id: number;
}

interface Todos {
  todos: Todo[];
}

const getTodo = async (domain: Domain) => {
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
    .then(data => {
      return data as Todos;
    });
};

const postTodo = async (content: string, domain: Domain) => {
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

const patchTodo = (todoId: number, domain: Domain) => {
  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
};

const deleteTodo = (todoId: number, domain: Domain) => {
  return fetch(`${domain}/todos/${todoId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
};

export const useGetTodoAPI = (domain: Domain) =>
  useQuery({
    queryKey: ['todos', domain],
    queryFn: () => getTodo(domain),
  });

export const usePostTodoApi = (domain: Domain) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (contents: string) => postTodo(contents, domain),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', domain] }),
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

export const usePatchTodoApi = (domain: Domain) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => patchTodo(todoId, domain),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', domain] }),
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

export const useDeleteTodoApi = (domain: Domain) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (todoId: number) => deleteTodo(todoId, domain),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['todos', domain] }),
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
