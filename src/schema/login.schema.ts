import {object, string} from 'zod';

export const loginSchema = object({
  body: object({
    login: string({required_error: "Login is required"}),
    password: string({required_error: "Password is required"}),
    notification_token: string({required_error: "Notification token is required"}),
  }),
});