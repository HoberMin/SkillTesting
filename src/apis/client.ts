import ky, { KyRequest } from 'ky';

import { toast } from '@/components/toast/use-toast';
import { getDomain } from '@/utils/domain';

import { getAccessToken, setAccessToken } from './authentication';

interface ErrorResponse {
  status: number;
  code: string;
}

export const api = ky.create({
  credentials: 'include',
  prefixUrl: `${getDomain()}`,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      request => {
        if (getAccessToken()) {
          request.headers.set('Authorization', `Bearer ${getAccessToken()}`);
        }
      },
    ],
  },
});

const reissue = (request: KyRequest) => {
  // http 통신일 경우 쿠키 설정
  // const cookie = sessionStorage.getItem('refreshToken');
  // console.log(cookie);
  // if (cookie) {
  //   document.cookie = `refreshToken=${cookie}`;
  // }

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

export const ApiClient = api.extend({
  hooks: {
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;

        const data: ErrorResponse = await response.json();

        if (data.code === 'ERR_ACCESS_TOKEN_EXPIRED') {
          return reissue(request);
        }
      },
    ],
  },
});
