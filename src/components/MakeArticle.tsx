import { useState } from 'react';

import { FilePlus, Loader2 } from 'lucide-react';

import useDomainStore from '@/store';

import { useToast } from './toast/use-toast';
import { Button } from './ui/button';

interface ArticlePlaceholder {
  userId: number;
  id: number;
  title: string;
}

const MakeArticle = () => {
  const { domain } = useDomainStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createArticle = async () => {
    try {
      setIsLoading(true);

      // 데이터 가져오기
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      if (!response.ok) throw new Error('데이터를 가져오는데 실패했습니다.');

      const jsonPlaceholders: ArticlePlaceholder[] = await response.json();

      const filteredData = {
        articles: jsonPlaceholders.map(placeholder => ({
          id: placeholder.id,
          title: placeholder.title,
          createdAt: new Date().toISOString(),
        })),
      };

      // 데이터 생성 요청
      const createResponse = await fetch(`${domain}/articles/make`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(filteredData),
      });

      if (!createResponse.ok) throw new Error('게시글 생성에 실패했습니다.');

      toast({
        variant: 'default',
        title: '게시글 생성 성공',
        description: '더미 데이터가 성공적으로 생성되었습니다.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '게시글 생성 실패',
        description:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      id='make-article-button'
      variant='outline'
      className='gap-2 border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50'
      onClick={createArticle}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className='h-4 w-4 animate-spin' />
          생성 중...
        </>
      ) : (
        <>
          <FilePlus className='h-4 w-4' />
          게시글 생성
        </>
      )}
    </Button>
  );
};

export default MakeArticle;
