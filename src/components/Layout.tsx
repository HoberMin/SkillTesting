import { PropsWithChildren } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Link, useLocation } from 'react-router-dom';

import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

import ServerInputModal from './ServerInputModal';
import { Button } from './button';

const Layout = ({ children }: PropsWithChildren) => {
  const { domain } = useDomainStore();
  const location = useLocation();

  const menuItems = [
    { path: '/crud', label: 'CRUD' },
    // { path: '/oauth', label: 'OAuth' },
    { path: '/pagination', label: 'Paging' },
    { path: '/email', label: 'Email' },
    { path: '/fileuploader', label: 'File Uploader' },
    { path: '/fcm', label: 'FCM Token' },
  ];

  return (
    <div className='flex h-screen flex-col'>
      <header className='flex items-center justify-between border-b p-[20px]'>
        <span className='text-2xl font-bold text-[#373737]'>SSAFY SANDBOX</span>
        <div className='flex items-center gap-[20px]'>
          <a
            className='inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            href='https://documenter.getpostman.com/view/17268285/2sA3s7kUzi'
            target='_blank'
            rel='noopener noreferrer'
          >
            API specification
          </a>
          <ServerInputModal />
          {domain && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className='mr-[40px]'>
                  <Button variant='outline'>My Base URL</Button>
                </TooltipTrigger>
                <TooltipContent className='z-10 mt-2 rounded-md border bg-black p-4 py-2 text-white'>
                  {domain}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </header>
      <div className='flex w-full grow'>
        <nav className='flex h-full min-w-[200px] flex-col border border-r-white bg-[#D7D7D7] py-[20px]'>
          <div className='flex grow flex-col gap-6 text-xl text-[#6D6D6D]'>
            {menuItems.map(item => (
              <Link key={item.path} to={item.path}>
                <div
                  className={cn(
                    `cursor-pointer p-4 text-center text-lg ${
                      location.pathname === item.path
                        ? 'bg-white'
                        : 'bg-[#D7D7D7]'
                    } hover:bg-white`,
                  )}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          <Link to={'/qualityAssurance'}>
            <div
              className={cn(
                `cursor-pointer p-4 text-center text-lg text-[#6D6D6D] ${
                  location.pathname === '/qualityAssurance'
                    ? 'bg-white'
                    : 'bg-[#D7D7D7]'
                } hover:bg-white`,
              )}
            >
              Quality Assurance
            </div>
          </Link>
        </nav>
        <div className='w-full'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
