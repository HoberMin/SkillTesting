import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-screen flex-col'>
      <header className='border-b p-[20px]'>
        <span className='text-2xl font-bold text-[#373737]'>Skill Testing</span>
      </header>
      <div className='flex w-full grow'>
        <nav className='flex h-full min-w-[200px] flex-col border border-r-white bg-[#D7D7D7] py-[20px]'>
          <div className='mt-[20px] flex grow flex-col gap-6 px-[30px] text-xl text-[#6D6D6D]'>
            <Link to='/crud'>
              <span className='w-fit cursor-pointer'>CRUD</span>
            </Link>
            <Link to='/oauth'>
              <span className='w-fit cursor-pointer'>OAuth</span>
            </Link>
            <Link to='/pagination'>
              <span className='w-fit cursor-pointer'>Pagination</span>
            </Link>

            <Link to='/socket'>
              <span className='w-fit cursor-pointer'>Socket</span>
            </Link>
          </div>
          <Link to='/qualityAssurance'>
            <div className='cursor-pointer bg-white p-4 text-center text-lg text-[#6D6D6D]'>
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
