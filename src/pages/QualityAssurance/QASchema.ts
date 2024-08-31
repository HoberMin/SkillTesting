import { z } from 'zod';

export const schema = z.object({
  classNumber: z.string().min(1, { message: '반 선택은 필수입니다.' }),
  region: z.string().min(1, { message: '지역선택은 필수입니다' }),
  name: z
    .string()
    .trim()
    .min(2, { message: '이름입력은 필수입니다' })
    .max(10, { message: '올바른 이름을 입력해주세요' }),
  content: z
    .string()
    .trim()
    .min(5, { message: '수정사항 내용입력은 최소 5자 이상입니다.' })
    .max(300, { message: '수정사항 입력은 최대 300자 이하입니다.' }),
});
