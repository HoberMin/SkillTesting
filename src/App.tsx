import TodoContainer from './components/TodoContainer';
import { ReactQueryClientProvider } from './utils/Provider';

const App = () => {
  return (
    <ReactQueryClientProvider>
      <TodoContainer></TodoContainer>
    </ReactQueryClientProvider>
  );
};

export default App;
