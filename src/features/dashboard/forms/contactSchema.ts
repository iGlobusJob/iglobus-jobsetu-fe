import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  customerEmail: z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .max(100, 'Email is too long'),

  subject: z
    .string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject must be less than 100 characters'),

  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
