import { ChangeEvent, useRef, useState } from 'react';

import { usePostImageUploadAPI } from '@/apis/imageUpload';
import NotDomainAlertBox from '@/components/AlertBox/NotDomainAlertBox';
import MainLayout from '@/components/MainLayout';
import { useToast } from '@/components/toast/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDomainStore from '@/store';

const FileUploader = () => {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [profile, setProfile] = useState<null | string>(null);
  const { domain } = useDomainStore();
  const imageUploadAPI = usePostImageUploadAPI(domain);
  const { toast } = useToast();

  const handleImageRemove = () => {
    setProfile(null);
    if (inputElement.current) {
      inputElement.current.value = '';
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        setProfile(reader.result as string);
      };
    }
  };

  const handleSubmitImage = async () => {
    const file = inputElement.current?.files?.[0];
    if (!file) return;
    const { imageUrl } = await imageUploadAPI(file);
    toast({
      title: '이미지 업로드 성공!',
      description: imageUrl,
    });
  };

  if (!domain) {
    return (
      <MainLayout MainTitle='ImageUpload' docsTitle='image'>
        <NotDomainAlertBox />
      </MainLayout>
    );
  }

  return (
    <MainLayout MainTitle='ImageUpload' docsTitle='image'>
      <div className='mx-auto flex w-[600px] max-w-[300px] flex-col items-center gap-5'>
        {profile ? (
          <img
            src={profile}
            alt='프로필 이미지'
            className='h-[100px] w-[100px] rounded-xl'
          />
        ) : (
          <svg
            width='100'
            height='100'
            viewBox='0 0 100 100'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              opacity='0.4'
              d='M91.6663 32.5413V67.458C91.6663 79.1664 86.2914 87.2079 76.833 90.2496C74.083 91.2079 70.9163 91.6663 67.458 91.6663H32.5413C29.083 91.6663 25.9163 91.2079 23.1663 90.2496C13.708 87.2079 8.33301 79.1664 8.33301 67.458V32.5413C8.33301 17.3747 17.3747 8.33301 32.5413 8.33301H67.458C82.6247 8.33301 91.6663 17.3747 91.6663 32.5413Z'
              fill='#636363'
            />
            <path
              d='M76.8337 90.2497C74.0837 91.208 70.917 91.6665 67.4587 91.6665H32.542C29.0837 91.6665 25.917 91.208 23.167 90.2497C24.6253 79.2497 36.1253 70.708 50.0003 70.708C63.8753 70.708 75.3753 79.2497 76.8337 90.2497Z'
              fill='#636363'
            />
            <path
              d='M64.9164 48.2497C64.9164 56.4997 58.2497 63.2079 49.9997 63.2079C41.7497 63.2079 35.083 56.4997 35.083 48.2497C35.083 39.9997 41.7497 33.333 49.9997 33.333C58.2497 33.333 64.9164 39.9997 64.9164 48.2497Z'
              fill='#636363'
            />
          </svg>
        )}
        <div className='flex items-center gap-[20px]'>
          <Label htmlFor='picture' className='rounded-md border p-2'>
            이미지 업로드
          </Label>
          <Label className='rounded-md border p-2' onClick={handleImageRemove}>
            이미지 삭제
          </Label>
        </div>
        <Input
          id='picture'
          type='file'
          ref={inputElement}
          accept='image/*'
          className='hidden'
          onChange={handleImageUpload}
        />
        <div className='mt-6 flex w-full flex-row-reverse'>
          <Button onClick={handleSubmitImage}>이미지 등록</Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default FileUploader;
