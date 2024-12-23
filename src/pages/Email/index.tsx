import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  usePostAuthenticationAPI,
  usePostEmailAPI,
} from '@/apis/emailAuthentication';
import InfoModal from '@/components/InfoModal';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useDomainStore from '@/store';

import { authenticationSchema, emailSchema } from './emailSchema';

export interface EmailForm {
  email: string;
}

export interface Authentication {
  authentication: string;
}

const Email = () => {
  const { domain } = useDomainStore();
  const postEmail = usePostEmailAPI(domain);
  const postAuthentication = usePostAuthenticationAPI(domain);

  const [isOk, setIsOk] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isAuthenticationError, setAuthenticationError] = useState(false);
  const [timer, setTimer] = useState(300);
  const [savedEmail, setSavedEmail] = useState('');

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;
    if (isOk && timer > 0) {
      countdown = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      clearInterval(countdown);
      setIsButtonDisabled(true);
    }
    return () => clearInterval(countdown);
  }, [isOk, timer]);

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const authenticationForm = useForm<Authentication>({
    resolver: zodResolver(authenticationSchema),
    defaultValues: {
      authentication: '',
    },
  });

  const onEmailSubmit = async (data: EmailForm) => {
    const { isOk } = await postEmail(data);
    if (isOk) {
      setIsOk(true);
      setIsButtonDisabled(false);
      setSavedEmail(data.email);
      setTimer(300);
    }
  };

  const onAuthenticationSubmit = async (data: Authentication) => {
    const { isSuccess } = await postAuthentication({
      ...data,
      email: savedEmail,
    });
    setIsSuccess(isSuccess);
    if (isSuccess) {
      setIsButtonDisabled(true);
      setAuthenticationError(false);
    } else {
      setAuthenticationError(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='이메일 인증'
        description='안전한 서비스 이용을 위해 이메일 인증을 진행해주세요.'
      >
        <InfoModal file='email' />
      </MainLayout.Header>

      <MainLayout.Content>
        <div className='mx-auto max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md'>
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className='space-y-4'
            >
              <FormField
                control={emailForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Input placeholder='이메일을 입력하세요' {...field} />
                      </FormControl>
                      <Button type='submit' className='shrink-0'>
                        {isOk ? '재인증' : '인증'}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {isOk && !isSuccess && (
            <div className='text-sm font-medium text-blue-600'>
              남은 시간: {formatTime(timer)}
            </div>
          )}

          <Form {...authenticationForm}>
            <form
              onSubmit={authenticationForm.handleSubmit(onAuthenticationSubmit)}
              className='space-y-4'
            >
              <FormField
                control={authenticationForm.control}
                name='authentication'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>인증번호</FormLabel>
                    <div className='flex items-center gap-2'>
                      <FormControl>
                        <Input placeholder='인증번호를 입력하세요' {...field} />
                      </FormControl>
                      <Button
                        type='submit'
                        disabled={isButtonDisabled || isSuccess}
                        className='shrink-0'
                      >
                        확인
                      </Button>
                    </div>
                    <FormMessage />
                    {isSuccess && (
                      <p className='mt-2 text-green-600'>
                        인증에 성공했습니다!
                      </p>
                    )}
                    {isAuthenticationError && (
                      <p className='mt-2 text-red-600'>
                        잘못된 인증번호입니다.
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default Email;
