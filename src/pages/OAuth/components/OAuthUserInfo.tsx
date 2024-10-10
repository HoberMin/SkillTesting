import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type TProps = {
  nickName: string | null;
  handleCheckSignInStatus: () => void;
};

const OAuthUserInfo = ({ nickName, handleCheckSignInStatus }: TProps) => {
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
