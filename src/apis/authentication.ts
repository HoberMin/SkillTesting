import { useMutation } from '@tanstack/react-query';
import { KyRequest } from 'ky';
import { useNavigate } from 'react-router-dom';

import { toast } from '@/components/toast/use-toast';
import useDomainStore, { Domain, useTokenTypeStore } from '@/store';

import {
  ApiClient,
  ApiClientWithAuthorization,
  ApiClientWithCookie,
  api,
} from './client';

interface TokenResponse {
  accessToken: string;
}

interface TokenWithAuthorizationResponse {
  accessToken: string;
  refreshToken: string;
}

interface Member {
  nickname: string | null;
}

let accessToken = '';

export const getAccessToken = () => accessToken;
export const setAccessToken = (token: string) => (accessToken = token);

const postCode = async (
  code: string,
  domain: Domain,
): Promise<TokenResponse> => {
  const response = await api.post(`${domain}/auth`, {
    json: { code },
  });

  return await response.json();
};

const postCodeWithAuthorization = async (
  code: string,
  domain: Domain,
): Promise<TokenWithAuthorizationResponse> => {
  const response = await api.post(`${domain}/auth/authorization`, {
    json: { code },
  });

  return await response.json();
};

const postCodeWithCookie = async (
  code: string,
  domain: Domain,
): Promise<TokenResponse> =>
  await api.post(`${domain}/auth/cookie`, { json: { code } }).json();

export const usePostCodeApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { tokenType } = useTokenTypeStore();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCode(code, domain),
    onSuccess: (res: TokenResponse) => {
      accessToken = res.accessToken;
      navigate(`/oauth/${tokenType}`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth/${tokenType}`);
    },
  });

  return mutate;
};

export const usePostCodeWithAuthorizationApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { tokenType } = useTokenTypeStore();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCodeWithAuthorization(code, domain),
    onSuccess: (res: TokenWithAuthorizationResponse) => {
      accessToken = res.accessToken;
      localStorage.setItem('refreshToken-storage', res.refreshToken);

      navigate(`/oauth/${tokenType}`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth/${tokenType}`);
    },
  });

  return mutate;
};

export const usePostCodeWithCookieApi = (domain: Domain) => {
  const navigate = useNavigate();
  const { tokenType } = useTokenTypeStore();
  const { mutate } = useMutation({
    mutationFn: (code: string) => postCodeWithCookie(code, domain),
    onSuccess: () => {
      navigate(`/oauth/${tokenType}`);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '인가 코드 전송 실패!',
      });
      navigate(`/oauth/${tokenType}`);
    },
  });

  return mutate;
};

const getMember = (domain: Domain): Promise<Member> => {
  return ApiClient.get(`${domain}/member`).json();
};

const getMemberWithAuthorization = (domain: Domain): Promise<Member> => {
  return ApiClientWithAuthorization.get(
    `${domain}/member/authorization`,
  ).json();
};

const getMemberWithCookie = (domain: Domain): Promise<Member> => {
  return ApiClientWithCookie.get(`${domain}/member/cookie`).json();
};

export const useGetMemberApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMember(domain),
  });

  return mutateAsync;
};

export const useGetMemberWithAuthorizationApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMemberWithAuthorization(domain),
  });

  return mutateAsync;
};

export const useGetMemberWithCookieApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => getMemberWithCookie(domain),
  });

  return mutateAsync;
};

export const getReissue = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClient.get(`${domain}/auth/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      console.log('token', accessToken);
      setAccessToken(accessToken);
      return ApiClient(request);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

export const getReissueWithAuthorization = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClientWithAuthorization.get(`${domain}/auth/reissue/authorization`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
      return ApiClientWithAuthorization(request);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

export const getReissueWithCookie = (request: KyRequest) => {
  const { domain } = useDomainStore.getState();

  return ApiClientWithCookie.get(`${domain}/auth/reissue/cookie`)
    .then(() => ApiClientWithCookie(request))
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

export const reissue = () => {
  const { domain } = useDomainStore.getState();
  console.log(domain);

  return ApiClient.get(`${domain}/auth/reissue`)
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });
};

export const reissueWithAuthorization = () =>
  ApiClientWithAuthorization.get('auth/reissue/authorization')
    .json<TokenResponse>()
    .then(({ accessToken }) => {
      setAccessToken(accessToken);
    })
    .catch(() => {
      toast({
        variant: 'destructive',
        title: 'refresh-token 만료!',
        description: '재로그인이 필요합니다.',
      });
    });

export const reissueWithCookie = () =>
  ApiClientWithCookie.get('auth/reissue/cookie').catch(() => {
    toast({
      variant: 'destructive',
      title: 'refresh-token 만료!',
      description: '재로그인이 필요합니다.',
    });
  });

const postLogout = (domain: Domain) => ApiClient.post(`${domain}/auth/logout`);
const postLogoutWithAuthorization = (domain: Domain) =>
  ApiClientWithAuthorization.post(`${domain}/auth/logout/authorization`);
const postLogoutWithCookie = (domain: Domain) =>
  ApiClientWithCookie.post(`${domain}/auth/logout/cookie`);

export const usePostLogoutApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogout(domain),
    onSuccess: () => {
      setAccessToken('');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '로그아웃 실패',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};

export const usePostLogoutWithAuthorizationApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogoutWithAuthorization(domain),
    onSuccess: () => {
      setAccessToken('');
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '로그아웃 실패',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};

export const usePostLogoutWithCookieApi = (domain: Domain) => {
  const { mutateAsync } = useMutation({
    mutationFn: () => postLogoutWithCookie(domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: '로그아웃 실패',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};
