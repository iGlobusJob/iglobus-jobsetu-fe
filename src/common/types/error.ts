export type ApiError = {
  data?: { message?: string };
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};
