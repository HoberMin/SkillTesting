import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { usePostCodeApi } from '@/apis/authentication';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const postCode = usePostCodeApi('http://localhost:5173');

  useEffect(() => {
    if (code) {
      postCode(code);
    }
  }, [code]);

  return <div></div>;
};
export default RedirectPage;
