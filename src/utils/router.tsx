import { Outlet, createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import CRUD from '@/pages/CRUD';
import Email from '@/pages/Email';
import FCMPage from '@/pages/FCM';
import FileUploader from '@/pages/FileUpload';
import Home from '@/pages/Home';
import OAuth from '@/pages/OAuth';
import Pagination from '@/pages/Pagination';
import QualityAssurance from '@/pages/QualityAssurance';
import Redirect from '@/pages/Redirect';

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
        element: <Home />,
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
        path: '/oauth/redirect',
        element: <Redirect />,
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
      {
        path: '/fileuploader',
        element: <FileUploader />,
      },
      {
        path: '/fcm',
        element: <FCMPage />,
      },
    ],
  },
]);
