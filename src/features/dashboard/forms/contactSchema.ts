import { z } from 'zod';

export const contactFigmaSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First Name is required')
    .max(50, 'First Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First Name can only contain letters'),
  lastName: z
    .string()
    .trim()
    .max(50, 'Last Name cannot exceed 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last Name can only contain letters')
    .optional(),
  customerEmail: z
    .string()
    .trim()
    .min(1, 'Email ID is required')
    .email('Please enter a valid email address')
    .max(100, 'Email cannot exceed 100 characters'),
  subject: z
    .string()
    .trim()
    .min(1, 'Subject is required')
    .min(3, 'Subject must be at least 3 characters')
    .max(150, 'Subject cannot exceed 150 characters'),
  message: z
    .string()
    .trim()
    .min(1, 'Your Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

export type FormValues = z.infer<typeof contactFigmaSchema>;

export interface ContactFormData {
  name: string;
  customerEmail: string;
  subject: string;
  message: string;
}
