import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { Authentication, EmailForm } from '@/pages/Email';

interface EmailResponse {
  isOk: boolean;
}

interface AuthenticationResponse {
  isSuccess: boolean;
}

const postEmail = async (data: EmailForm, domain: string) => {
  return await fetch(`${domain}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as EmailResponse);
};

const postAuthentication = async (data: Authentication, domain: string) => {
  return await fetch(`${domain}/authentication`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => data as AuthenticationResponse);
};

export const postEmailAPI = (domain: string) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (data: EmailForm) => postEmail(data, domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: '이메일 인증 에러',
        description: '백엔드 로직을 확인해주세요.',
      });
    },
  });

  return mutateAsync;
};

export const postAuthenticationAPI = (domain: string) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (data: Authentication) => postAuthentication(data, domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인증번호 에러',
        description: '백엔드 로직을 확인해주세요.',
      });
    },
  });

  return mutateAsync;
};
