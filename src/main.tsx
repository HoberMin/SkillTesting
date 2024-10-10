import ReactDOM from 'react-dom/client';

import './App.css';
import App from './App.tsx';
import { Toaster } from './components/toast/toaster.tsx';

async function enableMocking() {
  if (import.meta.env.VITE_MOCK_SERVICE !== 'develop') return;
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
      <Toaster />
      <App />
    </>,
  );
});
