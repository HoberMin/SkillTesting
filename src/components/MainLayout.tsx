import { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

import InfoModal from './InfoModal';

interface MainLayoutProps {
  MainTitle: string;
  docsTitle?: string;
  className?: string;
}

const MainLayout = ({
  children,
  MainTitle,
  docsTitle,
  className,
}: PropsWithChildren<MainLayoutProps>) => (
  <>
    <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
      <span>{MainTitle}</span>
      {docsTitle && (
        <div className='flex items-center gap-[10px]'>
          <InfoModal file={`${docsTitle}`} />
        </div>
      )}
    </div>
    <main className='flex w-full grow flex-col justify-center'>
      <div className={cn('mx-auto flex w-[600px] flex-col gap-5', className)}>
        {children}
      </div>
    </main>
  </>
);

export default MainLayout;
