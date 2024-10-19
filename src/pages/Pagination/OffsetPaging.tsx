import { Link } from 'react-router-dom';

import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import useDomainStore from '@/store';

import ArticleList from './components/ArticleList';

const ArticleContainer = () => {
  const { domain } = useDomainStore();

  if (!domain) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <span>Offset Paging</span>
          <div className='flex items-center gap-[10px]'>
            <Button>
              <Link to='/paging/cursor'>Change to Cursor</Link>
            </Button>
            {/* <InfoModal /> */}
          </div>
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
        <div className='flex items-center gap-[10px]'>
          <Button>
            <Link to='/paging/cursor'>Change to Cursor</Link>
          </Button>
          {/* <InfoModal /> */}
        </div>
      </div>
      <ArticleList />
    </>
  );
};

export default ArticleContainer;
