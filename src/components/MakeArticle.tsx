import useDomainStore from '@/store';

import { Button } from './button';

interface ArticlePlaceholder {
  userId: number;
  id: number;
  title: string;
}

const MakeArticle = () => {
  const { domain } = useDomainStore();

  const createArticle = async () => {
    const jsonPlaceholders = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    )
      .then(response => response.json())
      .then(json => json as ArticlePlaceholder[]);

    const filteredData = jsonPlaceholders.map(placeholder => ({
      id: placeholder.id,
      title: placeholder.title,
      createdAt: new Date().toISOString(),
    }));

    console.log(filteredData);

    await fetch(`${domain}/articles/make`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(filteredData),
    });
  };

  return <Button onClick={createArticle}>Article 생성</Button>;
};

export default MakeArticle;
