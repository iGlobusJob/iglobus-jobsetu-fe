import type { RegisterClientPayload } from '@/features/dashboard/types/register';

export const removeEmptyValues = (
  obj: { [s: string]: unknown } | ArrayLike<unknown> | RegisterClientPayload
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
