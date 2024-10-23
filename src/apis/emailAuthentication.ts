import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { Authentication, EmailForm } from '@/pages/Email';
import { Domain } from '@/store';

interface EmailResponse {
  isOk: boolean;
}

interface AuthenticationResponse {
  isSuccess: boolean;
}

interface AuthenticationRequest extends Authentication {
  email: string;
}

const postEmail = async (data: EmailForm, domain: Domain) => {
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

const postAuthentication = async (data: Authentication, domain: Domain) => {
  return await fetch(`${domain}/email/authentication`, {
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

export const usePostEmailAPI = (domain = 'http://localhost:8080') => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (data: EmailForm) => postEmail(data, domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: '이메일 인증 에러',
        description: '이메일을 확인해주세요.',
      });
    },
  });

  return mutateAsync;
};

export const usePostAuthenticationAPI = (domain: Domain) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (data: AuthenticationRequest) =>
      postAuthentication(data, domain),
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
