import { useParams } from 'react-router-dom';

import OAuthAuthorization from './components/OAuthAuthorization';
import OAuthCookie from './components/OAuthCookie';
import OAuthMix from './components/OAuthMix';

const OAuthPage = () => {
  const { oauthId } = useParams();
  if (oauthId === '1') return <OAuthMix />;
  if (oauthId === '2') return <OAuthAuthorization />;
  if (oauthId === '3') return <OAuthCookie />;
  return <OAuthMix />;
};
export default OAuthPage;
