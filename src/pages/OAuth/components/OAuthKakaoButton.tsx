import { Link } from 'react-router-dom';

const OAuthKakaoButton = () => {
  return (
    <Link to='/' className='w-[100px]'>
      <img src='kakao_login_large.png' alt='카카오 로그인' />
    </Link>
  );
};

export default OAuthKakaoButton;
