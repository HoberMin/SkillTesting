import { useState } from 'react';

import { Bell } from 'lucide-react';

import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const FixedNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const updates = [
    {
      date: '2024.11.02',
      content: 'OAuth 명세서 인가코드 발급 기능 설명이 추가되었습니다.',
    },
    {
      date: '2024.11.02',
      content: 'OAuth 명세서 "nickName"에서 "nickname"으로 변경되었습니다.',
    },
    {
      date: '2024.10.31',
      content: 'OAuth-api 명세서가 업데이트되었습니다.',
    },
    {
      date: '2024.10.28',
      content: 'Pagping-api 명세서가 업데이트되었습니다.',
    },
    {
      date: '2024.10.28',
      content: 'CRUD 타이틀이 수정되었습니다.',
    },
  ];

  return (
    <div className='fixed bottom-8 right-8'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button className='relative h-12 w-12 overflow-hidden rounded-full bg-zinc-900 shadow-lg transition-all duration-200 hover:bg-zinc-800'>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-0' : 'opacity-100'}`}
            >
              <Bell className='h-5 w-5 text-white' />
            </div>
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className='text-lg text-white'>×</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[380px] rounded-xl border border-zinc-100 bg-white p-0 shadow-lg'
          side='top'
          align='end'
        >
          <div className='flex items-center justify-between border-b border-zinc-100 bg-zinc-50 p-4'>
            <div className='flex items-center gap-2'>
              <Bell className='h-4 w-4 text-zinc-600' />
              <h3 className='font-medium text-zinc-800'>공지사항</h3>
            </div>
            <div className='rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-medium text-white'>
              New
            </div>
          </div>

          <div className='space-y-2 p-4'>
            <div className='mb-4 flex items-center justify-center gap-2 rounded-lg bg-zinc-900 py-3'>
              <span className='text-sm font-medium text-white'>
                SSAFY SANDBOX 오픈
              </span>
            </div>

            <h4 className='mb-3 font-medium text-zinc-800'>최근 업데이트</h4>
            <div className='space-y-3'>
              {updates.map((update, index) => (
                <div
                  key={index}
                  className='flex gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-zinc-50'
                >
                  <span className='shrink-0 text-xs font-medium text-zinc-400'>
                    {update.date}
                  </span>
                  <span className='text-sm text-zinc-600'>
                    {update.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FixedNotification;
