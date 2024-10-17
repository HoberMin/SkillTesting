import { useEffect, useState } from 'react';

import { Client, IMessage } from '@stomp/stompjs';

interface Message {
  user: string;
  message: string;
  timestamp: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const client = new Client({
    brokerURL: 'wss://api.picky-pick.com/chat',
    reconnectDelay: 5000,
  });

  useEffect(() => {
    client.onConnect = () => {
      console.log('Connected to WebSocket');
      client.subscribe('/sub/chat/room/1', (msg: IMessage) => {
        const body: Message = JSON.parse(msg.body);
        setMessages(prev => [...prev, body]);
      });
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = (user: string, message: string) => {
    const msg: Message = { user, message, timestamp: new Date().toISOString() };
    client.publish({
      destination: '/topic/messages',
      body: JSON.stringify(msg),
    });
  };

  return { messages, sendMessage };
}
