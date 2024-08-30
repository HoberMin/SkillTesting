import ReactDOM from 'react-dom/client';

import './App.css';
import App from './App.tsx';
import { Toaster } from './components/toast/toaster.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Toaster />
    <App />
  </>,
);
