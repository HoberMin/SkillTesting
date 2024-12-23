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
  const [profile, setProfile] = useState<null | string>(null); // 이미지 상태
  const inputElement = useRef<HTMLInputElement | null>(null); // 파일 입력 Ref
  const { domain } = useDomainStore(); // 도메인 상태
  const imageUploadAPI = usePostImageUploadAPI(domain); // 이미지 업로드 API
  const { toast } = useToast(); // Toast 알림

  // 이미지 삭제 핸들러
  const handleImageRemove = () => {
    setProfile(null);
    if (inputElement.current) {
      inputElement.current.value = '';
    }
  };

  // 이미지 업로드 핸들러
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

  // 이미지 전송 핸들러
  const handleSubmitImage = async () => {
    const file = inputElement.current?.files?.[0];
    if (!file) return;
    try {
      const { imageUrl } = await imageUploadAPI(file); // API 호출
      toast({
        title: '이미지 전송 성공!',
        description: `이미지가 성공적으로 업로드되었습니다: ${imageUrl}`,
      });
      handleImageRemove(); // 성공 후 초기화
    } catch (error) {
      toast({
        title: '이미지 전송 실패',
        description: '이미지 업로드 중 문제가 발생했습니다.',
      });
    }
  };

  // 이미지 미리보기 렌더링 함수
  const renderImagePreview = () => {
    if (profile) {
      return (
        <img
          src={profile}
          alt='프로필 이미지'
          className='h-32 w-32 rounded-lg border border-gray-200 object-cover shadow-sm'
        />
      );
    }
    return (
      <div className='flex h-32 w-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400'>
        <span>이미지 미리보기</span>
      </div>
    );
  };

  if (!domain) {
    return (
      <MainLayout.Root>
        <MainLayout.Header title='이미지 전송' />
        <MainLayout.Content>
          <NotDomainAlertBox />
        </MainLayout.Content>
      </MainLayout.Root>
    );
  }

  return (
    <MainLayout.Root>
      <MainLayout.Header
        title='이미지 전송'
        description='이미지를 업로드하고 전송하세요.'
      />
      <MainLayout.Content>
        <div className='mx-auto flex w-full max-w-md flex-col items-center gap-6 rounded-lg bg-white p-6 shadow'>
          {/* 이미지 미리보기 */}
          {renderImagePreview()}

          {/* 파일 업로드 및 삭제 */}
          <div className='flex items-center gap-4'>
            <Label
              htmlFor='picture'
              className='cursor-pointer rounded-md border px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100'
            >
              이미지 선택
            </Label>
            <Label
              onClick={handleImageRemove}
              className={`cursor-pointer rounded-md border px-4 py-2 text-sm font-medium ${profile ? 'text-red-500 hover:bg-red-50' : 'cursor-not-allowed text-gray-400'}`}
            >
              이미지 삭제
            </Label>
          </div>

          {/* 숨겨진 파일 입력 */}
          <Input
            id='picture'
            type='file'
            ref={inputElement}
            accept='image/*'
            className='hidden'
            onChange={handleImageUpload}
          />

          {/* 전송 버튼 */}
          <Button
            onClick={handleSubmitImage}
            disabled={!profile} // 프로필이 없으면 비활성화
            className={`w-full rounded-md px-4 py-2 font-medium text-white ${
              profile
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'cursor-not-allowed bg-gray-300'
            }`}
          >
            이미지 전송
          </Button>
        </div>
      </MainLayout.Content>
    </MainLayout.Root>
  );
};

export default FileUploader;
