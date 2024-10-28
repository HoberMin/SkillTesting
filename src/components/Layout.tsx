import { PropsWithChildren, useEffect } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

import ServerInputModal from './ServerInputModal';
import { Button } from './ui/button';

const Layout = ({ children }: PropsWithChildren) => {
  const { domain } = useDomainStore();
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('tutorial_end') !== 'end') navigate('/tutorial');
  }, []);

  const menuItems = [
    { path: '/crud', label: 'CRUD' },
    { path: '/paging/offset/1', label: 'Paging' },
    { path: '/email', label: 'Email' },
    { path: '/oauth/1', label: 'OAuth' },
    { path: '/imageuploader', label: 'Image Uploader' },
    { path: '/fcm', label: 'FCM' },
  ];

  return (
    <div className='flex h-screen flex-col'>
      <header className='flex items-center justify-between border-b p-[20px]'>
        <Link to='/'>
          <span className='text-2xl font-bold text-[#373737]'>
            SSAFY SANDBOX
          </span>
        </Link>
        <div className='flex items-center gap-[20px]'>
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
                      pathname.startsWith('/paging') &&
                      item.path.startsWith('/paging')
                        ? 'bg-white'
                        : pathname.includes(item.path)
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
                `cursor-pointer p-4 text-center text-lg text-[#6D6D6D] hover:bg-white`,
                `${location.pathname === '/qualityAssurance' ? 'bg-white' : 'bg-[#D7D7D7]'}`,
              )}
            >
              Quality Assurance
            </div>
          </Link>
        </nav>
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
