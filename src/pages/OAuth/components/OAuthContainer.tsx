import { useEffect, useState } from 'react';

import {
  getAccessToken,
  setAccessToken,
  useGetMemberApi,
} from '@/apis/authentication';
import { api } from '@/apis/client';
import { toast } from '@/components/toast/use-toast';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthContainer = () => {
  const getMember = useGetMemberApi();

  const [nickname, setNickname] = useState<string | null>(null);

  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMember();
    setNickname(nickname);
  };

  useEffect(() => {
    handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    // const cookie = sessionStorage.getItem('refreshToken');
    // if (cookie) {
    //   document.cookie = `refreshToken=${cookie}`;
    // }

    api
      .get('auth/reissue')
      .text()
      .then(token => {
        setAccessToken(token);
        console.log(getAccessToken());
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'refresh-token 만료!',
          description: '재로그인이 필요합니다.',
        });
      });
  };

  return (
    <main className='flex h-full w-full flex-col justify-center gap-[15px]'>
      <div className='mx-auto flex gap-[15px]'>
        {nickname ? (
          <>
            <button className='h-[50px] w-[100px] rounded-[7px] bg-[#fee501]'>
              로그아웃
            </button>
            <button
              className='h-[50px] w-[100px] rounded-[5px] border'
              onClick={handleReissue}
            >
              Reissue
            </button>
          </>
        ) : (
          <OAuthKakaoButton />
        )}
      </div>
      <div className='mx-auto flex w-[400px]'>
        <OAuthUserInfo
          nickName={nickname}
          handleCheckSignInStatus={handleCheckSignInStatus}
        />
      </div>
    </main>
  );
};

export default OAuthContainer;
