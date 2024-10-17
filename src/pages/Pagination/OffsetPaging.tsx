import { Link } from 'react-router-dom';

import { useGetOffsetPagingAPI } from '@/apis/offsetPaging';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import useDomainStore from '@/store';

import AlertBox from '../../components/AlertBox';
import TodoItem from '../CRUD/components/TodoItem';

const TodoContainer = () => {
  const { domain } = useDomainStore();

  const { todos, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useGetOffsetPagingAPI(domain);

  if (!domain) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>Offset Paging</span>
          <Button>
            <Link to='/paging/cursor'>Change to Cursor</Link>
          </Button>
        </div>
        <main className='flex h-full w-full flex-col justify-center'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            <NotDomainAlertBox />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
        <span>Offset Paging</span>
        <Button>
          <Link to='/paging/cursor'>Change to Cursor</Link>
        </Button>
      </div>
      <main className='flex w-full grow flex-col justify-center gap-[30px]'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          {!isError && todos && (
            <>
              <div className='max-h-[500px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
                {todos.map(({ content, id }) => (
                  <TodoItem
                    todo={content}
                    todoId={id}
                    key={`${content}-${id}`}
                    isInfinity={true}
                  />
                ))}
                {isFetchingNextPage && <div></div>}
              </div>
            </>
          )}
          {isError && <AlertBox />}
        </div>
        <Pagination>
          <PaginationContent>
            {/* <PaginationItem>
              <PaginationPrevious href='#' />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationLink href='1'>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='2' isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href='3'>3</PaginationLink>
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationNext href='#' />
            </PaginationItem> */}
          </PaginationContent>
        </Pagination>
      </main>
    </>
  );
};

export default TodoContainer;
