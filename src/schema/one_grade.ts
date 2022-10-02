import {object, string} from 'zod';

export const oneGradeSchema = object({
  body: object({
    grade_id: string({required_error: "grade is is required"}),
  }),
});