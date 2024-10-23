import NotDomainAlertBox from '@/components/NotDomainAlertBox';

const FlexNotDomainBox = () => {
  return (
    <main className='flex w-full grow flex-col justify-center'>
      <div className='mx-auto flex w-[600px] flex-col'>
        <NotDomainAlertBox />
      </div>
    </main>
  );
};

export default FlexNotDomainBox;
