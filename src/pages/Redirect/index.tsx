import { useSearchParams } from 'react-router-dom';

import { postCodeApi } from '@/apis/authentication';

const RedirectPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  console.log('인가코드 확인', code);
  const postCode = postCodeApi();
  code && postCode(code);

  return <>Loading...</>;
};
export default RedirectPage;
