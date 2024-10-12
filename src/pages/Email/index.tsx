import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  usePostAuthenticationAPI,
  usePostEmailAPI,
} from '@/apis/emailAuthentication';
import NotDomainAlertBox from '@/components/NotDomainAlertBox';
import { Button } from '@/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form';
import { Input } from '@/components/input';
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
      setTimer(300);
    }
  };

  const onAuthenticationSubmit = async (data: Authentication) => {
    const { isSuccess } = await postAuthentication(data);
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

  if (!domain) {
    return (
      <>
        <div className='p-10 pb-0 text-2xl font-bold'>Email</div>

        <main className='flex w-full grow flex-col justify-center'>
          <div className='mx-auto flex w-[600px] flex-col gap-5'>
            <NotDomainAlertBox />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <div className='p-10 pb-0 text-2xl font-bold'>Email</div>
      <main className='flex w-full grow flex-col justify-center'>
        <div className='mx-auto flex w-[600px] flex-col gap-5'>
          <div className='flex max-h-[600px] flex-col gap-[20px] overflow-x-hidden overflow-y-hidden overflow-y-scroll rounded-[8px] border border-gray-200 p-[60px] shadow-xl'>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                <FormField
                  control={emailForm.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-0.5'>
                      <FormLabel className='pl-1'>이메일</FormLabel>
                      <div className='flex items-center gap-[10px]'>
                        <FormControl>
                          <Input placeholder='이메일을 입력하세요' {...field} />
                        </FormControl>
                        <Button type='submit' className='px-4 py-2 text-sm'>
                          {isOk ? '재인증' : '인증'}
                        </Button>
                      </div>
                      <FormMessage className='pl-1' />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            {isOk && !isSuccess && (
              <span className='text-sm text-blue-500'>
                남은 시간: {formatTime(timer)}
              </span>
            )}
            <Form {...authenticationForm}>
              <form
                onSubmit={authenticationForm.handleSubmit(
                  onAuthenticationSubmit,
                )}
              >
                <FormField
                  control={authenticationForm.control}
                  name='authentication'
                  render={({ field }) => (
                    <FormItem className='flex flex-col gap-0.5'>
                      <FormLabel className='pl-1'>인증번호</FormLabel>
                      <div className='flex items-center gap-[10px]'>
                        <FormControl>
                          <Input
                            placeholder='인증번호를 입력하세요'
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='submit'
                          className='px-4 py-2 text-sm'
                          disabled={isButtonDisabled || isSuccess} // 버튼 비활성화 로직
                        >
                          확인
                        </Button>
                      </div>
                      <FormMessage className='pl-1' />
                      {isSuccess && (
                        <FormLabel className='pl-1 text-green-500'>
                          인증에 성공했습니다!
                        </FormLabel>
                      )}
                      {isAuthenticationError && (
                        <FormLabel className='pl-1 text-destructive'>
                          잘못된 인증번호입니다.
                        </FormLabel>
                      )}
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
      </main>
    </>
  );
};
export default Email;
