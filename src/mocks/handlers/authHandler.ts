import { HttpResponse, http } from 'msw';

interface AuthRequest {
  code: string;
}

interface UserInfo {
  nickname: null | string;
}
const userInfo: UserInfo = {
  nickname: null,
};

export const authHandler = [
  http.post('/auth', async ({ request }) => {
    const { code } = (await request.json()) as AuthRequest;

    if (typeof code === 'string') {
      userInfo.nickname = '하은';
      return HttpResponse.json({ accessToken: 'abcd' }, { status: 201 });
    }

    return HttpResponse.json({ message: '에러입니다.' }, { status: 400 });
  }),
  http.get('/member', () => {
    return HttpResponse.json(
      { nickname: userInfo.nickname },
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
];
