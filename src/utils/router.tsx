import { Outlet, createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import CRUD from '@/pages/CRUD';
import OAuth from '@/pages/OAuth';
import Pagination from '@/pages/Pagination';
import QualityAssurance from '@/pages/QualityAssurance';
import Socket from '@/pages/Socket';

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
        path: '/socket',
        element: <Socket />,
      },
      {
        path: '/qualityAssurance',
        element: <QualityAssurance />,
      },
    ],
  },
]);
