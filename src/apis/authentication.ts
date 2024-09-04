import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { getDomain } from '@/utils/domain';

const postCode = async (code: String) => {
  const domain = getDomain();
  return ky.post(`${domain}/oauth`, { json: { code } }).json();
};

export const postCodeApi = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code),
    onSuccess: () => {
      console.log('성공');
      navigate('/');
    },
    onError: () => {
      console.log('인가 코드 전송 실패!');
      navigate('/oauth');
    },
  });
  return mutate;
};
