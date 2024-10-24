import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const ResponseErrorAlertBox = () => (
  <Alert>
    <Terminal className='h-4 w-4' />
    <AlertTitle className='text-destructive'>에러가 발생했습니다.</AlertTitle>
    <AlertDescription>Network탭을 통해 에러를 확인해주세요.</AlertDescription>
  </Alert>
);

export default ResponseErrorAlertBox;
