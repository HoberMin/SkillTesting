import { useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/messaging';

import { FirebaseConfig, useGetFCMConfig, usePostFCMToken } from '@/apis/FCM';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import useDomainStore from '@/store';

const initializeFirebase = async (
  firebaseConfig: FirebaseConfig,
  vapidKey: string | undefined,
) => {
  firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  const token = await messaging.getToken({ vapidKey }).then(res => res);

  return token;
};

const FCMPage = () => {
  const { domain } = useDomainStore();
  const getConfig = useGetFCMConfig(domain);

  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig>({
    apiKey: undefined,
    authDomain: undefined,
    projectId: undefined,
    storageBucket: undefined,
    messagingSenderId: undefined,
    measurementId: undefined,
    appId: undefined,
  });
  const [vapidKey, setVapidKey] = useState<string | undefined>(undefined);
  const [deviceToken, setDeviceToken] = useState<string | undefined>(undefined);
  const postFCMToken = usePostFCMToken(domain);

  if (!domain) {
    return (
      <>
        <div className='p-10 pb-0 text-2xl font-bold'>FCM</div>
        <main className='flex w-full grow flex-col justify-center'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            <NotDomainAlertBox />
          </div>
        </main>
      </>
    );
  }

  const handleGetFCMConfig = async () => {
    const {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
      vapidKey,
    } = await getConfig();

    setVapidKey(vapidKey);

    setFirebaseConfig(prevState => ({
      ...prevState,
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      measurementId,
      appId,
    }));
  };

  const handleGetFCMToken = async () => {
    if (!firebaseConfig.apiKey) return;
    const token = await initializeFirebase(firebaseConfig, vapidKey);
    setDeviceToken(token);
  };

  const handlePostDeviceToken = async () => {
    if (!deviceToken) return;
    await postFCMToken(deviceToken);
  };

  return (
    <>
      <div className='p-10 pb-0 text-2xl font-bold'>FCM</div>
      <main className='flex w-full grow flex-col justify-center'>
        <div className='mx-auto flex w-[600px] flex-col items-center gap-5 text-wrap rounded-[8px] border border-gray-200 p-[40px] shadow-xl'>
          <div className='flex w-full flex-col gap-1'>
            {Object.entries(firebaseConfig).map(([key, value]) => {
              return (
                <span className='flex min-w-[300px] gap-2'>
                  <span className='grow font-bold'>{key}</span>
                  <span>{`${value}`}</span>
                </span>
              );
            })}
          </div>
          <span className='mt-[50px] w-full break-all text-lg font-bold'>
            {deviceToken ? deviceToken : '기기토큰이 없습니다'}
          </span>
          <div className='flex items-center gap-4'>
            <Button className='max-w-[200px] p-4' onClick={handleGetFCMConfig}>
              Get FCM Config
            </Button>
            <Button
              disabled={!firebaseConfig.apiKey}
              className='max-w-[200px] p-4'
              onClick={handleGetFCMToken}
            >
              Get Device Token
            </Button>
            <Button
              disabled={!deviceToken}
              className='max-w-[200px] p-4'
              onClick={handlePostDeviceToken}
            >
              POST Device Token
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default FCMPage;
