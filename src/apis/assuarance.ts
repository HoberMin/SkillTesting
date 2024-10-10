import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { QASchema } from '@/pages/QualityAssurance';
import { useQAStore } from '@/store';

const postAssuarance = async (data: QASchema) => {
  return await fetch(`https://api-server.store/qa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const usePostAssuranceAPI = () => {
  const { toast } = useToast();
  const { setIsQA } = useQAStore();
  const { mutate } = useMutation({
    mutationFn: (data: QASchema) => postAssuarance(data),
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'QA요청 성공 !!',
        description: 'QA 요청이 정상적으로 전달되었습니다.',
      });
      setIsQA();
    },
    onError: () =>
      toast({
        variant: 'destructive',
        title: 'QA 요청 에러',
        description: '서울 15반 손호민에게 MM 주세요',
      }),
  });

  return mutate;
};
