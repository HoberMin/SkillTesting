import { authHandler } from './authHandler';
import { emailHandler } from './emailHandler';
import { todoHandler } from './todoHandler';

export const handlers = [...todoHandler, ...emailHandler, ...authHandler];
