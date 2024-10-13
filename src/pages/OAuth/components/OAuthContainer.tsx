import { useEffect, useState } from 'react';

import {
  reissue,
  useGetMemberApi,
  usePostLogoutApi,
} from '@/apis/authentication';
import useDomainStore from '@/store';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthContainer = () => {
  const { domain } = useDomainStore();
  const getMember = useGetMemberApi(domain);
  const postLogout = usePostLogoutApi(domain);

  const [nickname, setNickname] = useState<string | null>(null);

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
    <main className='flex h-full w-full flex-col justify-center gap-[15px]'>
      <div className='mx-auto flex gap-[15px]'>
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
