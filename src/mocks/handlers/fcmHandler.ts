import { HttpResponse, http } from 'msw';

interface FCMRequest {
  token: string;
}
export const FCMHandler = [
  http.get('/fcmconfig', () => {
    return HttpResponse.json(
      {
        apiKey: 'AIzaSyCo6tCmy813_8OASrZ1ATM1FIyzXYLPatw',
        authDomain: 'ssafysandbox.firebaseapp.com',
        projectId: 'ssafysandbox',
        storageBucket: 'ssafysandbox.appspot.com',
        messagingSenderId: '1032870860559',
        appId: '1:1032870860559:web:8167ada5ec7e3b7164107a',
        measurementId: 'G-GP8LJSHTSE',
        vapidKey:
          'BAxn5UG3ZdGZNhgDft63aN0CV6dxskmvsHr2vv-1-heVyRAZtq69ebt8ngai6HT3F1b89lrzSysp5luzvU7kaMw',
      },
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('/fcmtoken', async ({ request }) => {
    const { token } = (await request.json()) as FCMRequest;

    console.log(token);
    return HttpResponse.json(
      { message: '요청에 성공했습니다.' },
      { status: 201 },
    );
  }),
];
