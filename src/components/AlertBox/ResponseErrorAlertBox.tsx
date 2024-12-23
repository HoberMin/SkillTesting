import { AlertCircle, Network } from 'lucide-react';

const ResponseErrorAlertBox = () => (
  <div className='flex flex-col gap-3'>
    <div className='rounded-lg border-l-4 border-l-red-500 bg-red-50 p-4'>
      <div className='flex items-center gap-2 text-red-600'>
        <AlertCircle className='h-5 w-5' />
        <span className='font-medium'>응답 처리 중 오류가 발생했습니다</span>
      </div>
    </div>
    <div className='rounded-lg bg-zinc-50 p-4'>
      <div className='flex items-center gap-2 text-zinc-600'>
        <Network className='h-4 w-4' />
        <span className='text-sm'>
          브라우저의 Network 탭에서 자세한 에러 내용을 확인해주세요
        </span>
      </div>
    </div>
  </div>
);

export default ResponseErrorAlertBox;
