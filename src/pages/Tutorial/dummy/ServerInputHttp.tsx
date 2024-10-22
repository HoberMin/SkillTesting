import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';

const ServerInputHttp = () => {
  return (
    <main className='flex w-full grow flex-col justify-center'>
      <div className='z-50 mx-auto flex w-[500px] flex-col rounded-md bg-white px-12 py-8'>
        <div>
          <div>
            <div className='mb-[20px]'>
              <h3 className='mb-[10px] text-xl font-bold'>Base URL</h3>
              <p>개발한 서버의 Base URL을 입력해주세요.</p>
            </div>
            <Tabs defaultValue='local'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='local'>Local</TabsTrigger>
                <TabsTrigger value='deployed' disabled>
                  Deployed
                </TabsTrigger>
              </TabsList>
              <TabsContent value='local'>
                <div className='flex gap-2'>
                  <input
                    className='w-[80px] rounded-[5px] border p-3 text-center focus:outline-none'
                    value={'http://'}
                    disabled
                  />
                  <input
                    className='w-full rounded-[5px] border p-3 placeholder-gray-200 focus:outline-none'
                    placeholder='localhost:8080'
                    disabled
                  />
                  <button className='w-16 rounded-[5px] border text-[12px]'>
                    Go!
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServerInputHttp;
