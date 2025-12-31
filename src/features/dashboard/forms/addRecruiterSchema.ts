import { z } from 'zod';

export const recruiterSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters long')
    .max(50, 'First name must not exceed 50 characters')
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters'),

  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters long')
    .max(50, 'Last name must not exceed 50 characters')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('Email must be a valid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

export type RecruiterFormSchema = z.infer<typeof recruiterSchema>;
