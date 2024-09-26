import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { postCodeApi } from '@/apis/authentication';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const postCode = postCodeApi();

  useEffect(() => {
    if (code) {
      postCode(code);
    }
  }, [code]);

  return <>Loading...</>;
};
export default RedirectPage;
