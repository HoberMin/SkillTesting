import { Outlet, createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import CRUD from '@/pages/CRUD';
import Email from '@/pages/Email';
import OAuth from '@/pages/OAuth';
import Pagination from '@/pages/Pagination';
import QualityAssurance from '@/pages/QualityAssurance';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <CRUD />,
      },
      {
        path: '/crud',
        element: <CRUD />,
      },
      {
        path: '/oauth',
        element: <OAuth />,
      },
      {
        path: '/pagination',
        element: <Pagination />,
      },
      {
        path: '/email',
        element: <Email />,
      },
      {
        path: '/qualityAssurance',
        element: <QualityAssurance />,
      },
    ],
  },
]);
