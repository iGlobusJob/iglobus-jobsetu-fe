import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Group,
  Image,
  PinInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { FooterSubscribe } from '@/features/dashboard/components/common/footer';
import { Header } from '@/features/dashboard/components/common/header';
import { candidateJoin, validateOtp } from '@/services/candidate-services';

export const CandidateLoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';
  const searchLocation = searchParams.get('location') || '';

  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const handleSendOtp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
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
    if (otp.length !== 5) {
      toast.error('Please enter the 5-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await validateOtp({ email, otp });
      if (response?.success) {
        toast.success('Welcome to UdyogSethu! 🚀');

        // Redirect with query params if user came from search bar
        const redirectParams = new URLSearchParams();
        if (searchKeyword) redirectParams.set('search', searchKeyword);
        if (searchLocation) redirectParams.set('location', searchLocation);
        const query = redirectParams.toString();

        if (query) {
          navigate(`/candidate/search?${query}`);
        } else {
          navigate('/candidate/dashboard');
        }
      } else {
        toast.error('Invalid OTP. Please try again.');
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
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F8FAFC',
      }}
    >
      <Header />

      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '120px 1rem 3rem 1rem' : '140px 2rem 4rem 2rem',
        }}
      >
        <Container size="md" style={{ width: '100%', maxWidth: '900px' }}>
          <Card
            radius="20px"
            shadow="lg"
            withBorder
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              padding: 0,
              backgroundColor: '#FFFFFF',
              borderColor: '#E2E8F0',
            }}
          >
            {/* Left Illustration Section */}
            {!isMobile && (
              <Box
                style={{
                  flex: '0 0 42%',
                  backgroundColor: '#EDF5FC',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isTablet ? '2rem 1.5rem' : '3rem 2rem',
                }}
              >
                <Image
                  src="/auth/sign-in.png"
                  alt="Candidate Sign In"
                  style={{
                    maxWidth: 260,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
                <Text
                  style={{
                    marginTop: '20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#475569',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  Join thousands of verified candidates finding dream jobs
                </Text>
              </Box>
            )}

            {/* Right Form Section */}
            <Box
              style={{
                flex: 1,
                padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box mb="xl" ta="center">
                <Title
                  order={2}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    fontSize: '28px',
                    color: '#1E293B',
                    marginBottom: '8px',
                  }}
                >
                  Candidate Login
                </Title>
                <Text
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#64748B',
                  }}
                >
                  {otpSent
                    ? 'Enter the 5-digit verification code sent to your email.'
                    : 'Enter your email to log in or register instantly.'}
                </Text>
              </Box>

              <Stack gap="lg">
                <TextInput
                  size="md"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  value={email}
                  disabled={otpSent}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && !otpSent && handleSendOtp()
                  }
                  styles={{
                    label: {
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      color: '#334155',
                      marginBottom: '6px',
                    },
                    input: {
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: '10px',
                      height: '46px',
                    },
                  }}
                />

                {!otpSent ? (
                  <Button
                    size="md"
                    fullWidth
                    loading={loading}
                    onClick={handleSendOtp}
                    style={{
                      height: '48px',
                      backgroundColor: '#3BA3D3',
                      borderRadius: '10px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <Stack align="center" gap="xs">
                      <Text size="sm" fw={600} c="#334155">
                        Enter 5-Digit OTP
                      </Text>
                      <Group justify="center">
                        <PinInput
                          length={5}
                          size="lg"
                          value={otp}
                          onChange={setOtp}
                          onComplete={handleVerifyOtp}
                          oneTimeCode
                          type="number"
                          autoFocus
                        />
                      </Group>
                    </Stack>

                    <Button
                      size="md"
                      fullWidth
                      loading={loading}
                      onClick={handleVerifyOtp}
                      style={{
                        height: '48px',
                        backgroundColor: '#3BA3D3',
                        borderRadius: '10px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '16px',
                      }}
                    >
                      Verify & Continue
                    </Button>

                    <Flex justify="space-between" align="center" mt="xs">
                      <Button
                        variant="subtle"
                        size="xs"
                        c="dimmed"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp('');
                        }}
                      >
                        Change Email
                      </Button>
                      <Button
                        variant="subtle"
                        size="xs"
                        c="#3BA3D3"
                        loading={loading}
                        onClick={handleSendOtp}
                      >
                        Resend OTP
                      </Button>
                    </Flex>
                  </>
                )}
              </Stack>
            </Box>
          </Card>
        </Container>
      </Box>

      <FooterSubscribe />
    </Box>
  );
};

export default CandidateLoginPage;
