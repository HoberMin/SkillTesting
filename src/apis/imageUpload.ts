import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/components/toast/use-toast';
import { Domain } from '@/store';

interface ImageUploadResponse {
  imageUrl: string;
}

const imageUpload = async (image: File, domain: Domain) => {
  const formData = new FormData();

  formData.append('image', image);

  return await fetch(`${domain}/image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formData,
  })
    .then(res => res.json())
    .then(data => data as ImageUploadResponse);
};

export const usePostImageUploadAPI = (domain: Domain) => {
  const { toast } = useToast();

  const { mutateAsync } = useMutation({
    mutationFn: (image: File) => imageUpload(image, domain),
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'POST 요청 에러',
        description: 'Network탭을 확인해주세요 !',
      });
    },
  });

  return mutateAsync;
};
