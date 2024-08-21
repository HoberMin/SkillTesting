import { useState } from 'react';

import { DialogDescription } from '@radix-ui/react-dialog';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './shadcn/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './shadcn/tabs';

const ServerInputModal = () => {
  const [localURL, setLocalURL] = useState('');
  const [deployedURL, setDeployedURL] = useState('');
  const [isOpenedModal, setIsOpenedModal] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onsubmitURL();
  };

  const onsubmitURL = () => {
    console.log(localURL ? localURL : deployedURL);
    setIsOpenedModal(false);

    setLocalURL('');
    setDeployedURL('');
  };

  // TODO
  // 서버 url에 대한 정보가 있으면 모달을 안 열고
  // 정보가 없으면 모달 열기

  // 탭이 바뀔 때는 입력값이 초기화 되는 게 좋지 않을까?

  return (
    <Dialog open={isOpenedModal} onOpenChange={setIsOpenedModal}>
      <DialogTrigger
        onClick={() => setIsOpenedModal(!isOpenedModal)}
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
                className='grid w-full grid-cols-2 rounded-[5px] border p-3'
                type='text'
                value={localURL}
                onChange={e => handleInputChange(e, setLocalURL)}
                onKeyDown={e => activeEnter(e)}
                placeholder='http://localhost:8080'
              />
              <button
                className='w-14 rounded-[5px] border text-[12px]'
                onClick={onsubmitURL}
              >
                Go!
              </button>
            </div>
          </TabsContent>
          <TabsContent value='deployed'>
            <div className='flex gap-2'>
              <input
                className='grid w-full grid-cols-2 rounded-[5px] border p-3'
                type='text'
                value={deployedURL}
                onChange={e => handleInputChange(e, setDeployedURL)}
                onKeyDown={e => activeEnter(e)}
                placeholder='https://abcde.com'
              />
              <button
                className='w-16 rounded-[5px] border text-[12px]'
                onClick={onsubmitURL}
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
