import { ArrowRightLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import MakeArticle from '@/components/MakeArticle';
import { Button } from '@/components/ui/button';

import ArticleList from './components/ArticleList';

const ArticleContainer = () => {
  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='게시글 목록'
        description='오프셋 기반 페이지네이션을 사용한 게시글 목록입니다. 페이지 번호를 클릭하여 다른 페이지로 이동할 수 있습니다.'
      >
        <Button
          variant='outline'
          className='gap-2 border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
          asChild
        >
          <Link to='/paging/cursor'>
            <ArrowRightLeft className='h-4 w-4' />
            커서 기반으로 변경
          </Link>
        </Button>
        <MakeArticle />
        <InfoModal file='paging' />
      </MainLayout.Header>

      <MainLayout.Content>
        <ArticleList />
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default ArticleContainer;
