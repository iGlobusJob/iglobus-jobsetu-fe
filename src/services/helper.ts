import type { RegisterVendorPayload } from '@/features/dashboard/types/register';

export const removeEmptyValues = (
  obj: { [s: string]: unknown } | ArrayLike<unknown> | RegisterVendorPayload
) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== '' &&
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ''
    )
  );
};
