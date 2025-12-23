import { z } from 'zod';

export const addAdminSchema = z.object({
  username: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be a valid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number, and special character'
    ),

  role: z.literal('admin'),
});

export type AddAdminSchema = z.infer<typeof addAdminSchema>;
