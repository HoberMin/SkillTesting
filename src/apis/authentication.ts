import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';

// import { getDomain } from '@/utils/domain';
import { ApiClient, api } from './client';

interface Token {
  accessToken: string;
}

// interface TokenResponse {
//   headers: Headers;
//   body: Token;
// }

interface Member {
  nickname: string | null;
}

let accessToken = '';

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => (accessToken = token);

const postCode = async (code: string): Promise<Token> => {
  const response = await api.post('auth', {
    json: { code },
  });

  return await response.json();
};

export const usePostCodeApi = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code),
    onSuccess: (res: Token) => {
      accessToken = res.accessToken;

      // if (getDomain()?.startsWith('http:')) {
      // sessionStorage.setItem(
      //   'refreshToken',
      //   'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjgzMDE1MTMsImV4cCI6MTczMDg5MzUxM30.EwIsLp3qe9BbeO5uec60c6oeKEgJTqG2LKgjg6A9KX4',
      // );
      // const setCookieHeader = res.headers.get('Set-Cookie');
      // console.log('setCookieHeader', setCookieHeader);
      // if (setCookieHeader) {
      //   const cookie = setCookieHeader.split(';')[0];
      //   sessionStorage.setItem('refreshToken', cookie);
      // }
      // }

      navigate('/oauth');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate('/oauth');
    },
  });

  return mutate;
};

const getMember = (): Promise<Member> => {
  return ApiClient.get('member').json();
};

export const useGetMemberApi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(),
  });

  return mutateAsync;
};
