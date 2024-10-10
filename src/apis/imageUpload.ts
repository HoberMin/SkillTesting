import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';

const imageUpload = async (image: File, domain: string) => {
  const formData = new FormData();

  formData.append('image', image);

  return await fetch(`${domain}/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  });
};

export const usePostImageUploadAPI = (domain = 'http://localhost:8080') => {
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (image: File) => imageUpload(image, domain),
    onSuccess: () =>
      toast({
        title: 'POST 요청 성공!',
        description: 'Network탭을 확인해주세요 !',
      }),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'POST 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutate;
};
