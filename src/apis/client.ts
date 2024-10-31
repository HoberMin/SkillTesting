import ky from 'ky';

import {
  getAccessToken,
  getReissue,
  getReissueWithAuthorization,
  getReissueWithCookie,
} from './authentication';

interface ErrorResponse {
  status: number;
  code: string;
}

export const api = ky.create({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 1,
  },
});

export const ApiClient = api.extend({
  hooks: {
    beforeRequest: [
      request => {
        if (getAccessToken())
          request.headers.set('Authorization', `Bearer ${getAccessToken()}`);
      },
    ],
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;

        const data: ErrorResponse = await response.json();

        if (data.code === 'ERR_ACCESS_TOKEN_EXPIRED') {
          return getReissue(request);
        }
      },
    ],
  },
});

export const ApiClientWithAuthorization = api.extend({
  hooks: {
    beforeRequest: [
      request => {
        if (getAccessToken())
          request.headers.set('Authorization', `Bearer ${getAccessToken()}`);

        if (localStorage.getItem('refreshToken-storage'))
          request.headers.set(
            'X-Refresh',
            `${localStorage.getItem('refreshToken-storage')}`,
          );
      },
    ],
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;

        const data: ErrorResponse = await response.json();

        if (data.code === 'ERR_ACCESS_TOKEN_EXPIRED') {
          return getReissueWithAuthorization(request);
        }
      },
    ],
  },
});

export const ApiClientWithCookie = api.extend({
  hooks: {
    afterResponse: [
      (_request, _options, response) => response,
      async (request, _options, response) => {
        if (response.ok) return response;

        const data: ErrorResponse = await response.json();

        if (data.code === 'ERR_ACCESS_TOKEN_EXPIRED') {
          return getReissueWithCookie(request);
        }
      },
    ],
  },
});
