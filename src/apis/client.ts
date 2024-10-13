import ky from 'ky';

import { getAccessToken, interceptReissue } from './authentication';

interface ErrorResponse {
  status: number;
  code: string;
}

export const api = ky.create({
  credentials: 'include',
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

export const ApiClient = api.extend({
  hooks: {
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;

        const data: ErrorResponse = await response.json();

        if (data.code === 'ERR_ACCESS_TOKEN_EXPIRED') {
          return interceptReissue(request);
        }
      },
    ],
  },
});
