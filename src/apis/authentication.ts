import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { getDomain } from '@/utils/domain';

let accessToken = '';

const postCode = async (code: String) => {
  const domain = getDomain();
  return ky.post(`${domain}/oauth`, { json: { code } }).json();
};

export const postCodeApi = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code),
    onSuccess: (res: any) => {
      // any 변경해야 함
      accessToken = res.accessToken;

      console.log(
        'accessToken: ',
        res.accessToken,
        'refreshToken: ',
        res.refreshToken,
      );
      navigate('/');
    },
    onError: () => {
      console.log('인가 코드 전송 실패!');
      navigate('/oauth');
    },
  });
  return mutate;
};

export const getAccessToken = () => accessToken;
