import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from './shadcn/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './shadcn/tabs';

const ServerInputModal = () => {
  const [localURL, setLocalURL] = useState('');
  const [deployedURL, setDeployedURL] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setState(e.target.value);
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogTrigger>
        <button className='rounded-[5px] border-[1px] p-2'>
          Edit Base URL
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Base URL</DialogTitle>
        <Tabs defaultValue='local'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='local'>Local</TabsTrigger>
            <TabsTrigger value='deployed'>Deployed</TabsTrigger>
          </TabsList>
          <TabsContent value='local'>
            <input
              className='grid w-full grid-cols-2 rounded-[5px] border-2 p-3'
              type='text'
              value={localURL}
              onChange={e => handleInputChange(e, setLocalURL)}
              placeholder='http://localhost:8080'
            />
          </TabsContent>
          <TabsContent value='deployed'>
            <input
              className='grid w-full grid-cols-2 rounded-[5px] border-2 p-3'
              type='text'
              value={deployedURL}
              onChange={e => handleInputChange(e, setDeployedURL)}
              placeholder='https://abcde.com'
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ServerInputModal;
