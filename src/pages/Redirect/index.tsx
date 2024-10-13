import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { usePostCodeApi } from '@/apis/authentication';
import useDomainStore from '@/store';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { domain } = useDomainStore();
  console.log(domain);
  const postCode = usePostCodeApi(domain);

  useEffect(() => {
    if (code) {
      postCode(code);
    }
  }, [code]);

  return <div></div>;
};
export default RedirectPage;
