export type CandidateOtpVerifyResponse = {
  success: true;
  message: string;
  data: {
    token: string;
    candidate: {
      id: string;
      email: string;
    };
  };
};
