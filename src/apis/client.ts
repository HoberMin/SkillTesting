import ky, { KyRequest } from 'ky';

import { toast } from '@/components/toast/use-toast';
import { getDomain } from '@/utils/domain';

import { getAccessToken } from './authentication';

const api = ky.create({
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

const reissue = (request: KyRequest) =>
  api
    .post('auth/reissue')
    .text()
    .then(token => {
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

const ApiClient = api.extend({
  hooks: {
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;
        if (response.status === 401) {
          return reissue(request);
        }
      },
    ],
  },
});

export default ApiClient;
