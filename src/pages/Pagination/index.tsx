import { useParams } from 'react-router-dom';

import CursorPaging from './CursorPaging';
import OffsetPaging from './OffsetPaging';

const PaginationPage = () => {
  const { pagingId } = useParams();

  return pagingId === '1' ? <OffsetPaging /> : <CursorPaging />;
};

export default PaginationPage;
