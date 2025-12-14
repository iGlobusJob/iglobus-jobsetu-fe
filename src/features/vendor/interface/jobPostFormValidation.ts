import { z } from 'zod';

export const jobPostSchema = z
  .object({
    jobTitle: z
      .string()
      .min(5, 'Job title must be at least 5 characters')
      .max(100, 'Job title must not exceed 100 characters'),

    jobDescription: z.string(),

    postStart: z.coerce.date({ required_error: 'Post start date is required' }),
    postEnd: z.coerce.date({
      required_error: 'Post end date is required',
    }),

    noOfPositions: z
      .number()
      .min(1, 'At least 1 position is required')
      .max(100, 'Maximum 100 positions allowed'),

    minimumSalary: z.number().min(0, 'Minimum salary cannot be negative'),

    maximumSalary: z.number().min(0, 'Maximum salary cannot be negative'),

    // 🔥 Added fields
    jobType: z
      .string()
      .min(1, 'Job type is required')
      .max(50, 'Invalid job type'),

    jobLocation: z.string().max(200, 'Job location is too long').optional(),

    minimumExperience: z
      .number()
      .min(0, 'Minimum experience cannot be negative')
      .max(50, 'Experience seems invalid'),

    maximumExperience: z
      .number()
      .min(0, 'Maximum experience cannot be negative')
      .max(50, 'Experience seems invalid'),

    status: z
      .string()
      .min(1, 'Status is required')
      .refine(
        (val) => ['drafted', 'active', 'closed'].includes(val),
        'Invalid status'
      ),
  })

  // 🟦 End date > start date
  .refine((data) => data.postEnd > data.postStart, {
    message: 'End date must be after start date',
    path: ['postEndDate'],
  })

  // 🟩 Max salary >= min salary
  .refine((data) => data.maximumSalary >= data.minimumSalary, {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['maximumSalary'],
  })

  // 🟧 Max experience >= min experience
  .refine((data) => data.maximumExperience >= data.minimumExperience, {
    message:
      'Maximum experience must be greater than or equal to minimum experience',
    path: ['maximumExperience'],
  });

export type JobPostFormSchema = z.infer<typeof jobPostSchema>;
