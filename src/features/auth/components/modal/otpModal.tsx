import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Modal,
  PinInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { CANDIDATE_PATHS } from '@/routes/config/userPath';
import { candidateJoin, validateOtp } from '@/services/candidate-services';
import { useOtpModalStore } from '@/store/otpModalStore';

export const OTPmodal = () => {
  const open = useOtpModalStore((state) => state.open);
  const redirectJobId = useOtpModalStore((state) => state.redirectJobId);
  const closeModal = useOtpModalStore((state) => state.closeModal);

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      setLoading(false);
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await candidateJoin({ email });
      if (response) {
        setOtpSent(true);
        toast.success(`OTP sent to ${email}`);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const data = error.data ?? error;
      toast.error(data.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 5) return;

    setLoading(true);
    try {
      const response = await validateOtp({ email, otp });
      if (response?.success) {
        toast.success('OTP verified successfully ! Welcome to JobSetu 🚀');
        setOtp('');
        setEmail('');
        setOtpSent(false);

        if (redirectJobId?.length) {
          closeModal();
          navigate(CANDIDATE_PATHS.JOB_DETAILS(redirectJobId));
        } else {
          closeModal();
          navigate('/candidate/dashboard');
        }
      } else {
        toast.error('Something went wrong!');
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const data = error.data ?? error;
      toast.error(data.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      opened={open}
      onClose={closeModal}
      centered
      size="xl"
      withCloseButton={false}
      radius="lg"
      padding={0}
      styles={{
        content: {
          borderRadius: '20px',
          overflow: 'hidden',
        },
      }}
    >
      <Grid gutter={0} align="stretch">
        {/* Left Image */}
        <Grid.Col
          span={{ base: 0, sm: 5 }}
          visibleFrom="sm"
          style={{
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <Image
            src="/auth/sign-in.png"
            alt="Authentication Illustration"
            style={{ maxWidth: 280, width: '100%' }}
          />
        </Grid.Col>

        {/* Right Section */}
        <Grid.Col span={{ base: 12, sm: 7 }} p="xl">
          <Box mb="lg" ta="center">
            <Text fw={700} fz={32} c="blue">
              Candidate
            </Text>
            <Text fw={600} fz="lg">
              {otpSent ? 'Verify OTP' : 'Login or Register'}
            </Text>
            <Text size="sm" c="dimmed">
              {otpSent
                ? 'Enter the 5-digit OTP sent to your email.'
                : 'Enter your email to continue.'}
            </Text>
          </Box>

          <Stack gap="md">
            <TextInput
              size="lg"
              label="Email"
              placeholder="Enter your email"
              value={email}
              disabled={otpSent}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) =>
                e.key === 'Enter' && !otpSent && handleSendOtp()
              }
            />

            {!otpSent ? (
              <Button
                size="lg"
                fullWidth
                loading={loading}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            ) : (
              <>
                <Group justify="center">
                  <PinInput
                    length={5}
                    size="lg"
                    value={otp}
                    onChange={setOtp}
                    onComplete={handleVerifyOtp}
                    oneTimeCode
                    type="number"
                  />
                </Group>

                <Button
                  size="lg"
                  fullWidth
                  loading={loading}
                  disabled={otp.length !== 5}
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </Button>

                <Text size="sm" ta="center">
                  Didn’t receive OTP?{' '}
                  <Text
                    span
                    c="blue"
                    fw={500}
                    style={{ cursor: 'pointer' }}
                    onClick={handleSendOtp}
                  >
                    Resend
                  </Text>
                </Text>
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
