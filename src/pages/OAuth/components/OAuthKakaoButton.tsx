const OAuthKakaoButton = () => {
  const kakaoUrl = `${import.meta.env.VITE_OAUTH_KAKAO_URL}?response_type=code&client_id=${import.meta.env.VITE_OAUTH_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_OAUTH_KAKAO_REDIRECT_URI}`;

  return (
    <a href={kakaoUrl} className='w-[100px]'>
      <img src='kakao_login_large.png' alt='카카오 로그인' />
    </a>
  );
};

export default OAuthKakaoButton;
