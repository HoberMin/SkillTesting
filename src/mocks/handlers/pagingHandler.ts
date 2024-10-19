import { HttpResponse, http } from 'msw';

import { infinityScrollArticles } from './dummyTodo';

export const pagingHandler = [
  http.get('/articles/paging/offset', ({ request }) => {
    const url = new URL(request.url);
    const size = parseInt(url.searchParams.get('size') || '10');
    const page = parseInt(url.searchParams.get('page') || '0');

    const totalItems = infinityScrollArticles.length;
    const totalPage = Math.floor(totalItems / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;

    const paginatedTodos = infinityScrollArticles.slice(startIndex, endIndex);
    const hasNext = page < totalPage - 1;
    const hasPrevious = page > 0;

    return HttpResponse.json({
      articles: paginatedTodos,
      currentPageNumber: page,
      totalPage: totalPage,
      size: size,
      hasPrevious: hasPrevious,
      hasNext: hasNext,
    });
  }),

  http.get('/articles/paging/cursor', ({ request }) => {
    const url = new URL(request.url);
    const size = parseInt(url.searchParams.get('size') || '10');
    const cursorId = parseInt(url.searchParams.get('cursorId') || '0');

    const cursorIndex = infinityScrollArticles.findIndex(
      todo => todo.id === cursorId,
    );
    const startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0;
    const endIndex = startIndex + size;

    const paginatedTodos = infinityScrollArticles.slice(startIndex, endIndex);
    const hasNext = endIndex < infinityScrollArticles.length;

    return HttpResponse.json({
      articles: paginatedTodos,
      lastId: paginatedTodos.length
        ? paginatedTodos[paginatedTodos.length - 1].id
        : null,
      size,
      hasNext,
    });
  }),
];
