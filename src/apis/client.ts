import ky from 'ky';

import { toast } from '@/components/toast/use-toast';
import { getDomain } from '@/utils/domain';

import { getAccessToken } from './authentication';

let accessToken = '';

const ApiClient = ky.create({
  prefixUrl: `${getDomain()}`,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      request => {
        accessToken = getAccessToken();
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;
        if (response.status === 401) {
          return ky
            .post('auth/reissue', {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            })
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
        }
      },
    ],
  },
});

export default ApiClient;
