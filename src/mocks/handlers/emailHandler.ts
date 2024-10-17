import { HttpResponse, http } from 'msw';

interface EmailRequest {
  email: string;
}

interface AuthenticationRequest {
  authentication: string;
}
export const emailHandler = [
  http.post('/email', async ({ request }) => {
    const { email } = (await request.json()) as EmailRequest;
    console.log(email);

    return HttpResponse.json({ isOk: true }, { status: 201 });
  }),
  http.post('/authentication', async ({ request }) => {
    const { authentication } = (await request.json()) as AuthenticationRequest;

    if (authentication !== 'av23ca') {
      return HttpResponse.json({ isSuccess: false }, { status: 201 });
    }
    if (authentication === 'av23ca') {
      return HttpResponse.json({ isSuccess: true }, { status: 201 });
    }

    return HttpResponse.json({ message: '에러입니다.' }, { status: 400 });
  }),
];
