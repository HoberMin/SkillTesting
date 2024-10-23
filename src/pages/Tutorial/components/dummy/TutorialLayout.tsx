import { ReactNode } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/utils/cn';

interface Tprops {
  children: ReactNode;
  currentStep: number;
}

const TutorialLayout = ({ children, currentStep }: Tprops) => {
  const { pathname } = useLocation();

  const menuItems = [
    { path: '/crud', label: 'CRUD' },
    { path: '/oauth/1', label: 'OAuth' },
    { path: '/paging/offset/1', label: 'Paging' },
    { path: '/email', label: 'Email' },
    { path: '/imageuploader', label: 'Image Uploader' },
    { path: '/fcm', label: 'FCM' },
  ];

  return (
    <div className='pointer-events-none flex h-screen flex-col'>
      <header className='flex items-center justify-between border-b p-[20px]'>
        <Link to='/'>
          <span className='text-2xl font-bold text-[#373737]'>
            SSAFY SANDBOX
          </span>
        </Link>
        <div
          className={cn(
            'flex h-10 w-32 items-center justify-center rounded border bg-white text-sm font-medium',
            currentStep === 0 ? 'z-40' : 'z-10',
          )}
        >
          Edit Base URL
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
        <div className='flex w-full flex-col'>{children}</div>
      </div>
    </div>
  );
};

export default TutorialLayout;
