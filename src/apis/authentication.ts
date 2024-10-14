import { useMutation } from '@tanstack/react-query';
import ky, { KyRequest } from 'ky';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';
import { Domain, useRefreshTokenStore, useTokenTypeStore } from '@/store';

import { ApiClient, api, cookieApiClient } from './client';

interface Token {
  accessToken?: string;
  refreshToken?: string;
}

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
  const { tokenType } = useTokenTypeStore();
  const { setRefreshToken } = useRefreshTokenStore();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code, domain),
    onSuccess: (res: Token) => {
      if (tokenType === 1 && res.accessToken) {
        accessToken = res.accessToken;
      } else if (tokenType === 2 && res.accessToken && res.refreshToken) {
        accessToken = res.accessToken;
        setRefreshToken(res.refreshToken);
      }

      navigate(`/oauth/${tokenType}`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth/${tokenType}`);
    },
  });

  return mutate;
};

const getMember = (domain: Domain): Promise<Member> => {
  const { tokenType } = useTokenTypeStore();
  if (tokenType === 3) return cookieApiClient.get(`${domain}/member`).json();

  return ApiClient.get(`${domain}/member`).json();
};

export const useGetMemberApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(domain),
  });

  return mutateAsync;
};

export const interceptReissue = (request: KyRequest, tokenType: number) => {
  if (tokenType === 3) return reissue();

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
    onSuccess: () => {
      setAccessToken('');
    },
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
