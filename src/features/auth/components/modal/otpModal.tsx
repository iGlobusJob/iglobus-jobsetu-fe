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
import { useAuthStore } from '@/store/userDetails';

export const OTPmodal = () => {
  const open = useOtpModalStore((state) => state.open);
  const redirectJobId = useOtpModalStore((state) => state.redirectJobId);
  const closeModal = useOtpModalStore((state) => state.closeModal);

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simulated backend API: Send OTP
  const handleSendOtp = async () => {
    // Email regex validation
    setLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      setLoading(false);
      alert('Please enter a valid email address');
      return;
    }
    try {
      const response = await candidateJoin({ email });
      if (response) {
        setLoading(false);
        setOtpSent(true);
        toast.success(`OTP sent to ${email}`);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (err: unknown) {
      const error = err as ApiError;

      const data = error.data ?? error;

      if (data.message) {
        toast.error(data.message);
      } else {
        toast.error('Failed to send OTP');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await validateOtp({ email, otp });
      if (response?.success) {
        const token = response.data.token;
        const candidate = response.data.candidate;
        useAuthStore.getState().setAuth({
          email: candidate.email,
          userRole: 'candidate',
          token: token,
          firstName: '',
          lastName: '',
        });
        toast.success('OTP verified successfully ! Welcome to JobSetu 🚀');
        setOtp('');
        setEmail('');
        setOtpSent(false);
        console.log(redirectJobId);
        if (redirectJobId && redirectJobId.length) {
          navigate(CANDIDATE_PATHS.JOB_DETAILS(redirectJobId));
        } else {
          navigate('/candidate/dashboard');
        }

        closeModal();
      } else {
        toast.error('Something went wrong! ');
      }
    } catch (err: unknown) {
      const error = err as ApiError;

      const data = error.data ?? error;

      if (data.message) {
        toast.error(data.message);
      } else {
        toast.error('Failed to send OTP');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={open}
      onClose={closeModal}
      closeOnClickOutside
      closeOnEscape
      centered
      size="xl"
      withCloseButton={false}
      radius="lg"
      padding="xl"
      styles={{
        content: {
          borderRadius: '20px',
          overflow: 'hidden',
        },
      }}
    >
      <Grid gutter={0} align="center">
        {/* Left Image Section */}
        <Grid.Col
          span={{ base: 0, sm: 5 }}
          style={{
            backgroundColor: '#f8f9fa',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            padding: '2rem',
          }}
        >
          <Image
            src="/auth/sign-in.png"
            alt="Authentication Illustration"
            radius="md"
            style={{
              width: '100%',
              maxWidth: '280px',
              objectFit: 'contain',
            }}
          />
        </Grid.Col>

        {/* Right Form Section */}
        <Grid.Col span={{ base: 12, sm: 7 }} style={{ padding: '2rem' }}>
          <Box>
            <Text
              fw={700}
              ta="center"
              mb={10}
              style={{
                fontSize: '34px',
                color: '#1a73e8',
                letterSpacing: '-0.1px',
              }}
            >
              Candidate
            </Text>
            <Text size="lg" fw={600} mb={4}>
              {otpSent ? 'Verify OTP' : 'Login or Register'}
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              {otpSent
                ? 'Enter the 5-digit OTP sent to your email address.'
                : 'Enter your Email to proceed.'}
            </Text>
          </Box>

          <Stack gap="md">
            {/* Always show number field */}
            <TextInput
              size="lg"
              label="Email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />

            {!otpSent ? (
              <Button onClick={handleSendOtp} fullWidth loading={loading}>
                Send OTP
              </Button>
            ) : (
              <>
                <Text size="sm" fw={500}>
                  Enter OTP
                </Text>
                <Group justify="center">
                  <PinInput
                    length={5}
                    type="number"
                    value={otp}
                    onChange={setOtp}
                    oneTimeCode
                  />
                </Group>

                <Button onClick={handleVerifyOtp} fullWidth>
                  Verify OTP
                </Button>

                <Text size="sm" ta="center">
                  Didn’t receive OTP?{' '}
                  <Text
                    span
                    c="blue"
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
