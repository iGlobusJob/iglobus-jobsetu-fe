import {
  Box,
  Button,
  Card,
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { FooterSubscribe } from '@/features/dashboard/components/common/footer';
import { Header } from '@/features/dashboard/components/common/header';
import { recruiterLogin } from '@/services/recruiter-services';

import { loginSchema } from '../../dashboard/forms/login';
import type { LoginFormValues } from '../../dashboard/types/login';
import AppLoader from '../../dashboard/utlis/loader/loader';

export const RecruiterLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await recruiterLogin(payload);
      toast.success(response?.message);

      navigate('/recruiter/jobs');
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || err?.message);
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
      }}
    >
      <Header />
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          transition: 'background-color 0.2s ease',
          padding: isMobile ? '1rem' : '2rem',
        }}
      >
        <Container size="lg" px={0} style={{ width: '100%' }}>
          {loading && <AppLoader />}
          <Card
            radius="lg"
            shadow="xl"
            withBorder
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              padding: 0,
            }}
          >
            {!isMobile && (
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isTablet ? '1.5rem' : '2rem',
                }}
              >
                <Image
                  src="/auth/recruiter-login.png"
                  alt="Login Illustration"
                  fit="contain"
                  h={isTablet ? 260 : 360}
                  w="auto"
                  radius="md"
                  style={{
                    transition: 'transform 150ms ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.03)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                />
              </Box>
            )}

            <Box
              style={{
                flex: 1,
                padding: isMobile
                  ? '2rem 1.5rem'
                  : isTablet
                    ? '2.5rem 1.5rem'
                    : '3rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Stack align="center" mb="lg">
                <Title order={isMobile ? 3 : 1}>Recruiter Login</Title>
                <Text size={isMobile ? 'sm' : 'md'} ta="center">
                  Sign in to continue to the Recruiter Dashboard.
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

                  <Group
                    justify="space-between"
                    wrap={isMobile ? 'wrap' : 'nowrap'}
                  >
                    <Checkbox
                      label="Remember me"
                      color="cyan"
                      size={isMobile ? 'xs' : 'sm'}
                      {...form.getInputProps('remember', { type: 'checkbox' })}
                    />
                  </Group>

                  <Button
                    type="submit"
                    size={isMobile ? 'sm' : 'md'}
                    fullWidth
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan' }}
                    radius="md"
                    mt="xs"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Card>
        </Container>
      </Box>
      <FooterSubscribe />
    </Box>
  );
};

export default RecruiterLoginPage;
