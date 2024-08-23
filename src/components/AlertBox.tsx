import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './shadcn/alert';

const AlertBox = () => {
  return (
    <Alert>
      <Terminal className='h-4 w-4' />
      <AlertTitle>잘못된 Base URL 입니다.</AlertTitle>
      <AlertDescription>
        서버의 Base URL이나, 서버 사이드 로직을 확인해주세요.
      </AlertDescription>
    </Alert>
  );
};

export default AlertBox;
