import OAuthKakaoButton from './OAuthKakaoButton';

const OAuthContainer = () => {
  return (
    <main className='flex flex-col justify-center w-full h-full'>
      <div className='flex mx-auto'>
        <OAuthKakaoButton />
      </div>
    </main>
  );
};

export default OAuthContainer;
