import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { Domain } from '@/store';

export interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
  vapidKey?: string | undefined;
}

const getFCMToken = async (domain: Domain) => {
  return await fetch(`${domain}/fcmconfig`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      return data as FirebaseConfig;
    });
};

const postFCMToken = async (token: string, domain: Domain) => {
  return await fetch(`${domain}/fcmtoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
    }),
  });
};

export const usePostFCMToken = (domain: Domain) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (token: string) => postFCMToken(token, domain),
    onSuccess: () =>
      toast({
        title: '토큰 전송 요청 성공!',
      }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'POST 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};

export const useGetFCMConfig = (domain: Domain) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: () => getFCMToken(domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'CONFIG 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};
