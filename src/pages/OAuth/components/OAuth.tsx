import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  reissue,
  useGetMemberApi,
  usePostLogoutApi,
} from '@/apis/authentication';
import { Button } from '@/components/button';
import useDomainStore, { useTokenTypeStore } from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuth = () => {
  const { domain } = useDomainStore();
  const { setTokenType } = useTokenTypeStore();

  const getMember = useGetMemberApi(domain);
  const postLogout = usePostLogoutApi(domain);

  const [nickname, setNickname] = useState<string | null>(null);

  const handleTokenType = () => {
    setTokenType(1);
  };
  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMember();
    setNickname(nickname);
  };

  useEffect(() => {
    handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    reissue();
  };

  const handleLogout = () => {
    postLogout().then(() => {
      setNickname(null);
    });

    // 일단은 로그아웃 된 척
    setNickname(null);
  };

  return (
    <>
      <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
        <div className='flex flex-col'>
          <span>OAuth</span>
          <p className='text-base font-light'>Refresh Token : Cookie</p>
          <p className='text-base font-light'>
            Access Token : Authorization Header
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          <Button disabled className='w-[350px]'>
            Cookie / Authorization Header
          </Button>
          <Link to='/oauth/2'>
            <Button className='w-[350px]'>
              Authorization Header / Authorization Header
            </Button>
          </Link>
          <Link to='/oauth/3'>
            <Button className='w-[350px]'>Cookie / Cookie</Button>
          </Link>
        </div>
      </div>
      <main className='flex h-full w-full flex-col justify-center gap-5'>
        <div className='mx-auto flex w-[600px] flex-col items-center'>
          {nickname ? (
            <>
              <button
                onClick={handleLogout}
                className='h-[50px] w-[100px] rounded-[7px] bg-[#fee501]'
              >
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
            <div onClick={handleTokenType} className='w-[100px]'>
              <OAuthKakaoButton />
            </div>
          )}
        </div>
        <div className='mx-auto flex w-[400px]'>
          <OAuthUserInfo
            nickName={nickname}
            handleCheckSignInStatus={handleCheckSignInStatus}
          />
        </div>
      </main>
    </>
  );
};

export default OAuth;
