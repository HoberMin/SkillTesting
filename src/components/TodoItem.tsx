import TodoEditIcon from './TodoEditIcon';
import { Switch } from './shadcn/switch';

interface TodoItemProps {
  checked: boolean;
  todo: string;
}
const TodoItem = ({ checked, todo }: TodoItemProps) => {
  const handleTodoPut = () => {
    // Todo 상태 put요청 보낼 때 캐싱상태 취소해서 checked를 변경, Tanstack에서 낙관적 업데이트 진행
    console.log(1);
  };

  return (
    <div className='px-8 py-4'>
      <div className='flex items-center justify-between font-medium'>
        <div className='flex items-center gap-2'>
          <Switch checked={checked} onClick={handleTodoPut} />
          <span>{todo}</span>
        </div>
        <TodoEditIcon></TodoEditIcon>
      </div>
    </div>
  );
};

export default TodoItem;
