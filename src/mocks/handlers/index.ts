import { authHandler } from './authHandler';
import { emailHandler } from './emailHandler';
import { FCMHandler } from './fcmHandler';
import { todoHandler } from './todoHandler';

export const handlers = [
  ...FCMHandler,
  ...todoHandler,
  ...emailHandler,
  ...authHandler,
];
