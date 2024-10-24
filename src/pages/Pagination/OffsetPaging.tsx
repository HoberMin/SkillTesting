import { Link } from 'react-router-dom';

import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import MakeArticle from '@/components/MakeArticle';
import { Button } from '@/components/ui/button';
import useDomainStore from '@/store';

import ArticleList from './components/ArticleList';

const ArticleContainer = () => {
  const { domain } = useDomainStore();

  if (!domain) {
    return (
      <MainLayout MainTitle='Paging' docsTitle='paging'>
        <NotDomainAlertBox />
      </MainLayout>
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
          <MakeArticle />
          <InfoModal file='paging' />
        </div>
      </div>
      <ArticleList />
    </>
  );
};

export default ArticleContainer;
