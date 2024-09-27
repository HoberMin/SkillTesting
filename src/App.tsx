import { RouterProvider } from 'react-router-dom';

import useInitializeFCM from './pages/FCM';
import { ReactQueryClientProvider } from './utils/Provider';
import { router } from './utils/router';

const App = () => {
  useInitializeFCM();
  return (
    <ReactQueryClientProvider>
      <RouterProvider router={router} />
    </ReactQueryClientProvider>
  );
};

export default App;
