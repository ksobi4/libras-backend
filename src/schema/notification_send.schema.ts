import {object, string} from 'zod';

export const notificationSendSchema = object({
  body: object({
    token: string({required_error: "Token is required"}),
    title: string({required_error: "Title is required"}),
    description: string({required_error: "Description is required"}),
  }),
});