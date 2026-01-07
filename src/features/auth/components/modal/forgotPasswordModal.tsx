import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Modal,
  PinInput,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import {
  sendClientOtp,
  validateClientOtp,
  updateClientPassword,
} from '@/services/client-services';

type Props = {
  opened: boolean;
  onClose: () => void;
};

const OTP_LENGTH = 5;
type Step = 'email' | 'otp' | 'reset';

export const ForgotPasswordModal: React.FC<Props> = ({ opened, onClose }) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setStep('email');
  };

  useEffect(() => {
    if (!opened) resetState();
  }, [opened]);

  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const res = await sendClientOtp(email);
      if (res?.success) {
        toast.success(`OTP sent to ${email}`);
        setStep('otp');
      } else {
        toast.error(res?.message || 'Failed to send OTP');
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== OTP_LENGTH) return;

    setLoading(true);
    try {
      const res = await validateClientOtp({ email, otp });
      if (res?.success) {
        toast.success('OTP verified successfully !');
        setStep('reset');
      } else {
        toast.error(res?.message || 'Invalid OTP');
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      toast.error(
        'Password must contain uppercase, lowercase, number and special character'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await updateClientPassword({
        email,
        newPassword,
        reEnterNewPassword: confirmPassword,
      });

      if (res?.success) {
        toast.success('Password updated successfully !');
        resetState();
        onClose();
      } else {
        toast.error(res?.message || 'Failed to update password');
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="xl"
      withCloseButton={false}
      radius="lg"
      padding={0}
    >
      <Grid gutter={0} align="stretch">
        <Grid.Col span={{ base: 0, sm: 5 }} visibleFrom="sm">
          <Image src="/auth/reset-password.png" alt="Reset Password" />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 7 }} p="sm">
          <Box mb="lg" ta="center">
            <Text fw={700} fz={32} c="blue">
              Forgot Password
            </Text>
            <Text fw={600} fz="lg">
              {step === 'email' && 'Enter your email'}
              {step === 'otp' && 'Verify OTP'}
              {step === 'reset' && 'Set new password'}
            </Text>
            <Text size="sm" c="dimmed">
              {step === 'email' && 'We will send a 5-digit OTP to your email.'}
              {step === 'otp' && 'Enter the OTP sent to your email address.'}
              {step === 'reset' &&
                'Choose a strong password to secure your account.'}
            </Text>
          </Box>

          <Stack gap="sm">
            {step === 'email' && (
              <>
                <TextInput
                  size="lg"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                />
                <Button
                  size="lg"
                  fullWidth
                  loading={loading}
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
              </>
            )}

            {step === 'otp' && (
              <>
                <TextInput size="lg" label="Email" value={email} disabled />

                <Group justify="center">
                  <PinInput
                    length={OTP_LENGTH}
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
                  disabled={otp.length !== OTP_LENGTH}
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

            {step === 'reset' && (
              <>
                <PasswordInput
                  size="lg"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordInput
                  size="lg"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  size="lg"
                  fullWidth
                  loading={loading}
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </Button>
              </>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Modal>
  );
};
