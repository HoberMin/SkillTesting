import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형태입니다' }),
});

export const authenticationSchema = z.object({
  authentication: z
    .string()
    .length(6, { message: '인증번호는 6자리여야 합니다.' })
    .regex(/^\d{6}$/, { message: '인증번호는 숫자로만 구성되어야 합니다.' }),
});
