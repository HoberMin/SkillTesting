import { useState } from 'react';

import { getMemberApi } from '@/apis/authentication';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const OAuthUserInfo = () => {
  const getMember = getMemberApi();

  const [nickName, setNickName] = useState('');

  const handleCheckSignInStatus = async () => {
    // getMember() 사용해서 data.nickname 받아오기
    const member = await getMember();
    setNickName(member.nickname);
  };

  //   if (isPending) return <>Loading...</>;

  return (
    <>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1' onClick={handleCheckSignInStatus}>
          <AccordionTrigger>로그인 상태 확인하기</AccordionTrigger>
          {nickName ? (
            <AccordionContent>
              {nickName}님 카카오 로그인 완료!
            </AccordionContent>
          ) : (
            <AccordionContent>로그인 상태가 아닙니다.</AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default OAuthUserInfo;
