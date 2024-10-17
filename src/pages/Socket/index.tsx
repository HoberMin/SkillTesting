import { useState } from 'react';

import { Button } from '@/components/button';

import { useChat } from './useChat';

const WebsocketPage = () => {
  const { messages, sendMessage } = useChat();
  const [message, setMessage] = useState('');

  const handleChangeMessage = () => {
    sendMessage('User1', message);
    setMessage('');
  };

  return (
    <>
      <div className='p-10 pb-0 text-2xl font-bold'>Web Socket</div>
      <main className='flex w-full grow flex-col justify-center'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.user}</strong>: {msg.message} ({msg.timestamp})
            </p>
          ))}
          <input
            type='text'
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder='Enter your message'
          />
          <Button onClick={handleChangeMessage}>전송</Button>
        </div>
      </main>
    </>
  );
};

export default WebsocketPage;
