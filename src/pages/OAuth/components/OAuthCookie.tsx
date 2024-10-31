import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  reissueWithCookie,
  useGetMemberWithCookieApi,
  usePostLogoutWithCookieApi,
} from '@/apis/authentication';
import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import InfoModal from '@/components/InfoModal';
import { Button } from '@/components/ui/button';
import useDomainStore, { useTokenTypeStore } from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthCookie = () => {
  const { domain } = useDomainStore();
  const { setTokenType } = useTokenTypeStore();

  const getMemberWithCookie = useGetMemberWithCookieApi(domain);
  const postLogoutWithCookie = usePostLogoutWithCookieApi(domain);

  const [nickname, setNickname] = useState<string | null>(null);

  const handleTokenType = () => {
    setTokenType(3);
  };
  const handleCheckSignInStatus = async () => {
    const { nickname } = await getMemberWithCookie();
    setNickname(nickname);
  };

  useEffect(() => {
    if (domain) handleCheckSignInStatus();
  }, []);

  const handleReissue = () => {
    reissueWithCookie();
  };

  const handleLogout = () => {
    postLogoutWithCookie().then(() => {
      setNickname(null);
    });
  };

  if (!domain) {
    return (
      <>
        <div className='flex justify-between p-10 pb-0 text-2xl font-bold'>
          <div className='flex flex-col'>
            <span>OAuth</span>
            <p className='text-base font-light'>Refresh Token : Cookie</p>
            <p className='text-base font-light'>Access Token : Cookie</p>
          </div>
          <div className='flex flex-col items-end gap-3'>
            <InfoModal file='oauth_cookie' />
            <Link to='/oauth/1'>
              <Button className='mt-[12px] w-[350px]'>
                Cookie / Authorization Header
              </Button>
            </Link>
            <Link to='/oauth/2'>
              <Button className='w-[350px]'>
                Custom Header / Authorization Header
              </Button>
            </Link>
            <Button disabled className='w-[350px]'>
              Cookie / Cookie
            </Button>
          </div>
        </div>
        <main className='flex h-full w-full flex-col justify-center gap-5'>
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
          <p className='text-base font-light'>Refresh Token : Cookie</p>
          <p className='text-base font-light'>Access Token : Cookie</p>
        </div>
        <div className='flex flex-col gap-3'>
          <InfoModal file='oauth_cookie' />
          <Link to='/oauth/1'>
            <Button className='mt-[12px] w-[350px]'>
              Cookie / Authorization Header
            </Button>
          </Link>
          <Link to='/oauth/2'>
            <Button className='w-[350px]'>
              Authorization Header / Authorization Header
            </Button>
          </Link>
          <Button disabled className='w-[350px]'>
            Cookie / Cookie
          </Button>
        </div>
      </div>
      <main className='flex h-full w-full flex-col justify-center gap-5'>
        <div className='mx-auto flex w-[600px] flex-col items-center'>
          {nickname ? (
            <div className='flex gap-5'>
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
            </div>
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

export default OAuthCookie;
