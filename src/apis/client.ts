import ky from 'ky';

import { getDomain } from '@/utils/domain';

import { getAccessToken } from './authentication';

let accessToken = '';

const ApiClient = ky.create({
  prefixUrl: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      request => {
        accessToken = getAccessToken();
        console.log(accessToken);
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, _, response) => {
        if (response.status === 401) {
          try {
            const domain = getDomain();
            const newAccessToken = await ky
              .post(`${domain}/oauth/refresh`)
              .json();

            request.headers.set('Authorization', `Bearer ${newAccessToken}`);
            return ky(request);
          } catch (error) {
            console.log('refresh-token 만료! 재로그인 하세용');
            throw error;
          }
        }

        return response;
      },
    ],
  },
});

export default ApiClient;
