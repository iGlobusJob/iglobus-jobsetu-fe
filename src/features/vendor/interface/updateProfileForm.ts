import z from 'zod';

export const vendorProfileSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must not exceed 100 characters'),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain uppercase, lowercase, number & special character'
    )
    .optional(),
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .optional(),
  location: z.string().optional(),
  gstin: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, 'Invalid GSTIN')
    .optional()
    .or(z.literal('')),
  panCard: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format')
    .optional()
    .or(z.literal('')),
  category: z.enum(['IT', 'Non-IT']).optional(),
  logo: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  primaryContact: z
    .object({
      firstName: z.string().min(2, 'First name must be at least 2 characters'),
      lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    })
    .optional(),
  secondaryContact: z
    .object({
      firstName: z
        .string()
        .regex(/^[A-Za-z\s]+$/, 'First name must contain only letters')
        .optional()
        .or(z.literal('')),
      lastName: z
        .string()
        .regex(/^[A-Za-z\s]+$/, 'last name must contain only letters')
        .optional()
        .or(z.literal('')),
    })
    .optional(),
});

export type VendorProfileFormData = z.infer<typeof vendorProfileSchema>;
