import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';
import { getDomain } from '@/utils/domain';

import ApiClient from './client';

interface Token {
  accessToken: string;
}

interface Member {
  nickname: string;
}

let accessToken = '';

const postCode = async (code: string): Promise<Token> => {
  const domain = getDomain();

  return ky.post(`${domain}/auth`, { json: { code } }).json();
};

export const postCodeApi = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code),
    onSuccess: (res: Token) => {
      accessToken = res.accessToken;
      navigate('/oauth');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate('/oauth');
    },
  });

  return mutate;
};

export const getAccessToken = () => accessToken;

const getMember = (): Promise<Member> => {
  return ApiClient.get('member').json();
  // .then(res => {
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! status: ${res.status}`);
  //   }
  //   return res.json();
  // })
  // .then(data => data as Member);
};

export const getMemberApi = () => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(),
  });

  return mutateAsync;
  // useQuery({
  //   queryKey: ['member'],
  //   queryFn: getMember,
  // });
};
