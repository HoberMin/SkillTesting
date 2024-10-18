import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  reissue,
  useGetMemberWithAuthorizationApi,
  usePostLogoutWithAuthorizationApi,
} from '@/apis/authentication';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import useDomainStore, { useTokenTypeStore } from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthAuthorization = () => {
  const { domain } = useDomainStore();
  const { setTokenType } = useTokenTypeStore();

  const getMemberWithAuthorization = useGetMemberWithAuthorizationApi(domain);
  const postLogoutWithAuthorization = usePostLogoutWithAuthorizationApi(domain);

  const [nickname, setNickname] = useState<string | null>(null);

  const handleTokenType = () => {
    setTokenType(2);
  };
  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMemberWithAuthorization();
    setNickname(nickname);
  };

  useEffect(() => {
    if (domain) handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    reissue();
  };

  const handleLogout = () => {
    postLogoutWithAuthorization().then(() => {
      setNickname(null);
    });
  };

  if (!domain) {
    return (
      <>
        <div className='p-10 pb-0 text-2xl font-bold'>OAuth</div>
        <main className='flex w-full grow flex-col justify-center'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            <NotDomainAlertBox />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
        <div className='flex flex-col'>
          <span>OAuth</span>
          <p className='text-base font-light'>
            Refresh Token : Authorization Header
          </p>
          <p className='text-base font-light'>
            Access Token : Authorization Header
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          <Link to='/oauth/1'>
            <Button className='w-[350px]'>Cookie / Authorization Header</Button>
          </Link>
          <Button disabled className='w-[350px]'>
            Authorization Header / Authorization Header
          </Button>
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

export default OAuthAuthorization;
