import { useMutation } from '@tanstack/react-query';
import ky, { KyRequest } from 'ky';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';
import { Domain } from '@/store';

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

const postCode = async (code: string, domain: Domain): Promise<Token> => {
  const response = await api.post(`${domain}/auth`, {
    json: { code },
  });

  return await response.json();
};

export const usePostCodeApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code, domain),
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

const getMember = (domain: Domain): Promise<Member> => {
  return ApiClient.get(`${domain}/member`).json();
};

export const useGetMemberApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(domain),
  });

  return mutateAsync;
};

export const interceptReissue = (request: KyRequest) => {
  api
    .get('auth/reissue')
    .text()
    .then(token => {
      setAccessToken(token);

      request.headers.set('Authorization', `Bearer ${token}`);
      return ky(request);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

export const reissue = () => {
  api
    .get('auth/reissue')
    .text()
    .then(token => {
      setAccessToken(token);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

const postLogout = (domain: Domain) => ApiClient.post(`${domain}/auth/logout`);

export const usePostLogoutApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogout(domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: '로그아웃 실패',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};
