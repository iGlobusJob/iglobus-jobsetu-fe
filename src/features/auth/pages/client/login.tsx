import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ForgotPasswordModal } from '@/features/auth/components/modal/forgotPasswordModal';
import { FooterSubscribe } from '@/features/dashboard/components/common/footer';
import { Header } from '@/features/dashboard/components/common/header';
import type { ApiError } from '@common';
import { loginClient } from '@services/client-services';

import { loginSchema } from '../../../dashboard/forms/login';
import type { LoginFormValues } from '../../../dashboard/types/login';
import AppLoader from '../../../dashboard/utlis/loader/loader';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [showErrors, setShowErrors] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [forgotOpened, setForgotOpened] = useState(false);

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: zodResolver(loginSchema),
  });

  // Hide error alert when user types anything & clear API error
  useEffect(() => {
    setShowErrors(false);
    setApiError(null);
  }, [form.values.email, form.values.password]);

  const handleSubmit = async (values: LoginFormValues) => {
    const validation = form.validate();

    if (validation.hasErrors) {
      setShowErrors(true);
      return;
    }

    setLoading(true);
    try {
      const client = await loginClient({
        email: values.email,
        password: values.password,
      });

      if (client.status !== 'active') {
        setApiError('Your account is under review by admin. Please wait.');
        setShowErrors(true);
        return;
      }

      toast.success('Login Successfully !');
      navigate('/client/dashboard');
    } catch (err: unknown) {
      const error = err as ApiError;
      const data = error.data ?? error;

      if (data.message) setApiError(data.message);
      else setApiError('Login failed. Try again.');

      setShowErrors(true);
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
        component="main"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '120px 1rem 3rem 1rem' : '150px 2rem 5rem 2rem',
          boxSizing: 'border-box',
        }}
      >
        <Container
          size="md"
          px={0}
          style={{ width: '100%', maxWidth: '960px' }}
        >
          {loading && <AppLoader />}

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
              boxShadow: '0 20px 45px -15px rgba(15, 23, 42, 0.1)',
            }}
          >
            {/* LEFT SECTION */}
            {!isMobile && (
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isTablet ? '2rem 1.5rem' : '3rem 2.5rem',
                }}
              >
                <Image
                  src="/auth/sign-in.png"
                  alt="Sign In Illustration"
                  fit="contain"
                  h={isTablet ? 260 : 360}
                  radius="md"
                />
              </Box>
            )}

            {/* RIGHT SECTION */}
            <Box
              style={{
                flex: 1,
                padding: isMobile
                  ? '2rem 1.5rem'
                  : isTablet
                    ? '2.5rem 2rem'
                    : '3.5rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* ERROR BOX (ZOD + API ERRORS) */}
              {showErrors &&
                (Object.values(form.errors).length > 0 || apiError) && (
                  <Box
                    ta="center"
                    style={{
                      background: 'rgba(255, 0, 0, 0.08)',
                      border: '1px solid rgba(255, 0, 0, 0.3)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <Stack gap={4}>
                      {/* ZOD ERRORS */}
                      {Object.values(form.errors).map((err, idx) => (
                        <Text key={idx} size="xs" c="red">
                          • {err}
                        </Text>
                      ))}

                      {/* API ERROR */}
                      {apiError && (
                        <Text size="xs" c="red">
                          {apiError}
                        </Text>
                      )}
                    </Stack>
                  </Box>
                )}

              <Stack align="center" mb="xl" gap="xs">
                <Title
                  order={isMobile ? 4 : 2}
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    color: '#0F172A',
                  }}
                >
                  Welcome to UdyogSethu
                </Title>
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  ta="center"
                  c="#64748B"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Login to continue to UdyogSethu.
                </Text>
              </Stack>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  <TextInput
                    label="Email"
                    placeholder="Enter your email"
                    size={isMobile ? 'sm' : 'md'}
                    {...form.getInputProps('email')}
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    size={isMobile ? 'sm' : 'md'}
                    {...form.getInputProps('password')}
                  />

                  <Group justify="space-between">
                    <Checkbox
                      label="Remember me"
                      color="cyan"
                      size={isMobile ? 'xs' : 'sm'}
                      {...form.getInputProps('remember', { type: 'checkbox' })}
                    />

                    <Text
                      component="a"
                      size="sm"
                      c="cyan.5"
                      td="underline"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setForgotOpened(true)}
                    >
                      Forgot Password?
                    </Text>
                  </Group>

                  <Button
                    type="submit"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    radius="md"
                  >
                    Login
                  </Button>
                </Stack>
              </form>

              <Center mt="lg">
                <Text size="sm" ta="center">
                  Don’t have an account?{' '}
                  <Text
                    component="a"
                    href="/client/register"
                    c="cyan.5"
                    td="underline"
                    fw={500}
                  >
                    Register
                  </Text>
                </Text>
              </Center>
            </Box>
          </Card>
        </Container>
      </Box>
      <FooterSubscribe />
      <ForgotPasswordModal
        opened={forgotOpened}
        onClose={() => setForgotOpened(false)}
      />
    </Box>
  );
};

export default Login;
