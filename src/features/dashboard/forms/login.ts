import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email or Username is required')
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_.-]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
      { message: 'Invalid email or username' }
    ),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
