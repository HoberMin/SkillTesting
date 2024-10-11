import { HttpResponse, http } from 'msw';

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

let todos: Todo[] = [
  { id: 1, content: '할일1', completed: false },
  { id: 2, content: '할일2', completed: true },
  { id: 3, content: '할일2', completed: false },
];

interface TodoPostRequest {
  content: string;
}

export const todoHandler = [
  http.get('/todos', () => {
    return HttpResponse.json(
      { todos },
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('/todos', async ({ request }) => {
    const { content } = (await request.json()) as TodoPostRequest;

    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      content,
      completed: false,
    };
    todos.push(newTodo);

    return HttpResponse.json(todos, { status: 201 });
  }),

  http.patch('/todos/:id', async ({ params }) => {
    const { id } = params as { id: string };

    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    todos[todoIndex].completed = !todos[todoIndex].completed;

    return HttpResponse.json(todos[todoIndex], {
      status: 200,
    });
  }),

  http.delete('/todos/:id', ({ params }) => {
    const { id } = params as { id: string };

    todos = todos.filter(todo => todo.id !== parseInt(id));

    return HttpResponse.json(
      { message: `Todo with id ${id} deleted` },
      {
        status: 200,
      },
    );
  }),

  // http.get('/todos', ({ request }) => {
  //   const url = new URL(request.url);
  //   const size = parseInt(url.searchParams.get('size') || '10');
  //   const page = parseInt(url.searchParams.get('page') || '0');

  //   const startIndex = page * size;
  //   const endIndex = startIndex + size;

  //   const paginatedTodos = infinityScrollTodos.slice(startIndex, endIndex);
  //   const hasNext = endIndex < infinityScrollTodos.length;

  //   return HttpResponse.json({
  //     todos: paginatedTodos,
  //     currentPageNumber: page,
  //     size: size,
  //     hasNext: hasNext,
  //   });
  // }),
];
