import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from './alert';

const NotDomainAlertBox = () => (
  <Alert>
    <Terminal className='h-4 w-4' />
    <AlertTitle>Domain이 없습니다.</AlertTitle>
    <AlertDescription>
      상단의 Edit Base URL을 통해, 도메인을 등록해주세요.
    </AlertDescription>
  </Alert>
);

export default NotDomainAlertBox;
