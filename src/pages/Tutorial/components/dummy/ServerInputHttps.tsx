import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ServerInputHttps = () => {
  return (
    <main className='flex w-full grow flex-col justify-center'>
      <div className='mx-auto flex w-[500px] flex-col rounded-md border-2 border-solid border-gray-100 px-12 py-8'>
        <div className='mb-[20px]'>
          <h3 className='mb-[10px] text-xl font-bold'>Base URL</h3>
          <p>개발한 서버의 Base URL을 입력해주세요.</p>
        </div>
        <Tabs defaultValue='deployed' className='z-40 bg-white p-3'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='local' disabled>
              Local
            </TabsTrigger>
            <TabsTrigger value='deployed'>Deployed</TabsTrigger>
          </TabsList>
          <TabsContent value='deployed'>
            <div className='flex gap-2'>
              <input
                className='w-[80px] rounded-[5px] border p-3 text-center focus:outline-none'
                value={'https://'}
                disabled
              />
              <input
                className='w-full rounded-[5px] border p-3 placeholder-gray-200 focus:outline-none'
                placeholder='abcde.com'
                disabled
              />
              <button className='w-16 rounded-[5px] border text-[12px]'>
                Go!
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ServerInputHttps;
