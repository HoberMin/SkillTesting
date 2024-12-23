import { HttpResponse, http } from 'msw';

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

let todos: Todo[] = [];

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
      id: todos.length !== 0 ? todos[todos.length - 1].id + 1 : 1,
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
];
