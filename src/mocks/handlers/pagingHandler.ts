import { HttpResponse, http } from 'msw';

import { infinityScrollTodos } from './dummyTodo';

export const pagingHandler = [
  http.get('/offset', ({ request }) => {
    const url = new URL(request.url);
    const size = parseInt(url.searchParams.get('size') || '10');
    const page = parseInt(url.searchParams.get('page') || '0');

    const startIndex = page * size;
    const endIndex = startIndex + size;

    const paginatedTodos = infinityScrollTodos.slice(startIndex, endIndex);
    const hasNext = endIndex < infinityScrollTodos.length;

    return HttpResponse.json({
      todos: paginatedTodos,
      currentPageNumber: page,
      size: size,
      hasNext: hasNext,
    });
  }),

  http.get('/cursor', ({ request }) => {
    const url = new URL(request.url);
    const size = parseInt(url.searchParams.get('size') || '10');
    const cursorId = parseInt(url.searchParams.get('cursorId') || '0');

    const cursorIndex = infinityScrollTodos.findIndex(
      todo => todo.id === cursorId,
    );
    const startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
    const endIndex = startIndex + size;

    const paginatedTodos = infinityScrollTodos.slice(startIndex, endIndex);
    const hasNext = endIndex < infinityScrollTodos.length;

    return HttpResponse.json({
      todos: paginatedTodos,
      lastId: paginatedTodos.length
        ? paginatedTodos[paginatedTodos.length - 1].id
        : null,
      size,
      hasNext,
    });
  }),
];
