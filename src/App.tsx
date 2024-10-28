import { RouterProvider } from 'react-router-dom';

import FixedNotification from './components/FixedNotification';
import { ReactQueryClientProvider } from './utils/Provider';
import { router } from './utils/router';

const App = () => {
  return (
    <ReactQueryClientProvider>
      <FixedNotification />
      <RouterProvider router={router} />
    </ReactQueryClientProvider>
  );
};

export default App;
