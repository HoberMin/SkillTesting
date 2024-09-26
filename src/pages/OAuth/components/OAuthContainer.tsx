import ServerInputModal from '@/pages/CRUD/components/ServerInputModal';

import OAuthKakaoButton from './OAuthKakaoButton';
import OAuthUserInfo from './OAuthUserInfo';

const OAuthContainer = () => {
  return (
    <main className='flex h-full w-full flex-col justify-center gap-[15px]'>
      <div className='mx-auto flex gap-[15px]'>
        <ServerInputModal />
        <OAuthKakaoButton />
      </div>
      <div className='mx-auto flex w-[400px]'>
        <OAuthUserInfo />
      </div>
    </main>
  );
};

export default OAuthContainer;
