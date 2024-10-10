import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { usePostCodeApi } from '@/apis/authentication';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const postCode = usePostCodeApi();

  useEffect(() => {
    if (code) {
      postCode(code);
    }
  }, [code]);

  return <>Loading...</>;
};
export default RedirectPage;
