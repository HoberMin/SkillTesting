import { useLocation } from 'react-router-dom';

import CursorPaging from './CursorPaging';
import OffsetPaging from './OffsetPaging';

const PaginationPage = () => {
  const { pathname } = useLocation();

  const pagingType = pathname.split('/')[2];

  return pagingType === 'offset' ? <OffsetPaging /> : <CursorPaging />;
};

export default PaginationPage;
