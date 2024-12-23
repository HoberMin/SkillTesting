import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

interface MainLayoutRootProps {
  children: React.ReactNode;
}

interface MainLayoutHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

interface MainLayoutContentProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayoutRoot = ({ children }: MainLayoutRootProps) => {
  return <div className='flex h-full flex-col'>{children}</div>;
};

const MainLayoutHeader = ({
  title,
  description,
  children,
}: MainLayoutHeaderProps) => {
  return (
    <header className='bg-white px-8 py-6'>
      <div className='flex items-start justify-between gap-4'>
        <div className='space-y-1'>
          <h1 className='text-xl font-semibold text-zinc-900'>{title}</h1>
          {description && (
            <p className='text-sm text-zinc-500'>{description}</p>
          )}
        </div>
        {children && <div className='flex items-center gap-3'>{children}</div>}
      </div>
    </header>
  );
};

const MainLayoutContent = ({ children, className }: MainLayoutContentProps) => {
  const { domain } = useDomainStore();

  if (!domain) {
    return (
      <main className='flex flex-1 items-center justify-center'>
        <div className='w-full px-8'>
          <div className='mx-auto -mt-20 w-full max-w-2xl'>
            <NotDomainAlertBox />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='flex flex-1 items-center justify-center overflow-y-auto'>
      <div className={cn('w-[600px] px-8 py-6', className)}>{children}</div>
    </main>
  );
};

const MainLayout = {
  Root: MainLayoutRoot,
  Header: MainLayoutHeader,
  Content: MainLayoutContent,
};

export default MainLayout;
