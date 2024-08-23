import { useEffect, useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';
import { useQueryClient } from '@tanstack/react-query';

import { getDomain, setDomainHTTP, setDomainHTTPS } from '@/utils/domain';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './shadcn/tabs';

const ServerInputModal = () => {
  const queryClient = useQueryClient();

  const [localURL, setLocalURL] = useState('');
  const [deployedURL, setDeployedURL] = useState('');
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  useEffect(() => {
    const domain = getDomain();
    if (!domain) {
      setIsOpenedModal(true);
    } else {
      console.log(domain);
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  const activeEnterLocalURL = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onsubmitLocalURL();
  };

  const activeEnterDeployedURL = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onsubmitDeployedURL();
  };

  const onsubmitLocalURL = () => {
    setDomainHTTP(localURL);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    setIsOpenedModal(false);
    setLocalURL('');
    setDeployedURL('');
  };

  const onsubmitDeployedURL = () => {
    setDomainHTTPS(deployedURL);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    setIsOpenedModal(false);
    setLocalURL('');
    setDeployedURL('');
  };

  // TODO
  // 서버 url에 대한 정보가 있으면 모달을 안 열고
  // 정보가 없으면 모달 열기

  // 탭이 바뀔 때는 입력값이 초기화 되는 게 좋지 않을까?
  // 현재 local에다가 아무값이나 입력해놓고 deploy에 내가 원하는값을 입력했을 때, local값이 출력된다. -> 당연한 결과인 것 같음
  // 해결방법이 두가지 인데, 모달이 열린상태 , Tab 두가지 상태 모두 라우팅으로 처리하는 방법이 있음 : 어느 페이지가 그렇게 되어있었는데 기억이..
  // Submit을 분리

  return (
    <Dialog open={isOpenedModal} onOpenChange={setIsOpenedModal}>
      <DialogTrigger
        onClick={() => setIsOpenedModal(true)}
        className='rounded-[5px] border p-2 text-[12px]'
      >
        Edit Base URL
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Base URL</DialogTitle>
          <DialogDescription className='text-[12px]'>
            개발한 서버의 Base URL을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='local'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='local'>Local</TabsTrigger>
            <TabsTrigger value='deployed'>Deployed</TabsTrigger>
          </TabsList>
          <TabsContent value='local'>
            <div className='flex gap-2'>
              <input
                className='w-full rounded-[5px] border p-3 focus:outline-none'
                value={localURL}
                onChange={e => handleInputChange(e, setLocalURL)}
                onKeyDown={e => activeEnterLocalURL(e)}
                placeholder='http://localhost:8080'
              />
              <button
                className='w-16 rounded-[5px] border text-[12px]'
                onClick={onsubmitLocalURL}
              >
                Go!
              </button>
            </div>
          </TabsContent>
          <TabsContent value='deployed'>
            <div className='flex gap-2'>
              <input
                className='w-full rounded-[5px] border p-3 outline-none focus:outline-none'
                value={deployedURL}
                onChange={e => handleInputChange(e, setDeployedURL)}
                onKeyDown={e => activeEnterDeployedURL(e)}
                placeholder='https://abcde.com'
              />
              <button
                className='w-16 rounded-[5px] border text-[12px] outline-none'
                onClick={onsubmitDeployedURL}
              >
                Go!
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServerInputModal;
