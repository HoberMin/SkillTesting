import TodoInput from '@/pages/CRUD/components/TodoInput';
import TodoItem from '@/pages/CRUD/components/TodoItem';
import { cn } from '@/utils/cn';

const dummyData = {
  todos: [
    { content: 'Vue.js 컴포넌트 기본 학습', completed: false, id: 1 },
    { content: 'Spring Boot 프로젝트 설정하기', completed: true, id: 2 },
    { content: 'Vue와 Vuex로 상태 관리 실습', completed: false, id: 3 },
    { content: 'Spring MVC 패턴 이해하기', completed: false, id: 4 },
    { content: 'Vue와 Spring을 연동한 REST API 구현', completed: true, id: 5 },
  ],
};

interface Tprops {
  currentStep: number;
}
const CRUD = ({ currentStep }: Tprops) => {
  console.log(currentStep);
  return (
    <>
      <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
        <span>CRUD</span>
        <div
          className={cn(
            'flex h-10 w-20 items-center justify-center gap-[10px] rounded bg-[#262E3F] text-sm font-medium text-white',
            currentStep === 4 ? 'z-40' : 'z-10',
          )}
        >
          API 명세
        </div>
      </div>
      <main className='flex w-full grow flex-col justify-center'>
        <div
          className={cn(
            'mx-auto flex w-[600px] flex-col gap-5 bg-white p-2',
            currentStep === 5 ? 'z-40' : 'z-10',
          )}
        >
          <TodoInput />
          <div className='max-h-[600px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 shadow-xl'>
            {dummyData.todos.map(({ content, completed, id }) => (
              <TodoItem
                checked={completed}
                todo={content}
                todoId={id}
                key={`${content}-${id}`}
              />
            ))}
          </div>
          <span className='mt-[40px]'>Made By HoberMin / songhaeunsong</span>
        </div>
      </main>
    </>
  );
};

export default CRUD;
