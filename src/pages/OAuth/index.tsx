import { useParams } from 'react-router-dom';

import OAuthAuthorization from './components/OAuthAuthorization';
import OAuthCookie from './components/OAuthCookie';
import OAuth from './components/Oauth';

const OAuthPage = () => {
  const { oauthId } = useParams();
  if (oauthId === '1') return <OAuth />;
  if (oauthId === '2') return <OAuthAuthorization />;
  if (oauthId === '3') return <OAuthCookie />;
  return <OAuth />;
};
export default OAuthPage;
