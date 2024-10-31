import { useState } from 'react';

import { Button } from './ui/button';
import { CardContent, CardTitle } from './ui/card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const FixedNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed bottom-10 right-10'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className='h-[80px] w-[80px] rounded-md'>
            {isOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='scale-[2.2]'
              >
                <path d='M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z'></path>
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='scale-[1.5]'
              >
                <path d='M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z'></path>
              </svg>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-fit rounded-md bg-black p-4 text-white'
          side='top'
          align='end'
        >
          <CardTitle className='mb-4 text-center text-white'>
            공지사항
          </CardTitle>
          <CardContent className='text-white'>
            <div>
              <div className='mb-6 text-center'>🎉 SSAFY SANDBOX 오픈! 🎉</div>
              <div className='mb-6 text-center text-2xl'>최근 업데이트</div>
              <div className='mb-6'>
                {'[2024.10.31] OAuth-api 명세서가 업데이트되었습니다.'}
              </div>
              <div className='mb-6'>
                {'[2024.10.28] Pagping-api 명세서가 업데이트되었습니다.'}
              </div>
              <div>{'[2024.10.28] CRUD 타이틀이 수정되었습니다.'}</div>
            </div>
          </CardContent>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FixedNotification;
