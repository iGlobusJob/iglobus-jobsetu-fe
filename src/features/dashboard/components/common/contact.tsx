import {
  Box,
  Flex,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useState } from 'react';

import ClickSpark from '@/components/ui/ClickSpark';
import { sendContactUsMail } from '@/services/common-services';

import { contactFigmaSchema, type FormValues } from '../../forms/contactSchema';

export const ContactUsSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      customerEmail: '',
      subject: '',
      message: '',
    },
    validate: zodResolver(contactFigmaSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const fullName = values.lastName
        ? `${values.firstName} ${values.lastName}`.trim()
        : values.firstName;
      await sendContactUsMail({
        name: fullName,
        customerEmail: values.customerEmail,
        subject: values.subject,
        message: values.message,
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error('Failed to send contact mail', err);
    } finally {
      setSubmitting(false);
    }
  };

  const baseInputStyle = {
    backgroundColor: '#D6D6D6',
    border: 'none',
    borderRadius: '0px',
    padding: '24px 16px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.04em',
    color: '#212121',
    boxSizing: 'border-box' as const,
    '&::placeholder': {
      color: '#212121',
      opacity: 0.85,
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.04em',
    },
  };

  const inputStyle = {
    input: { ...baseInputStyle, height: '72px' },
    error: {
      color: '#D93838',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      marginTop: '4px',
    },
  };
  const textareaStyle = {
    input: { ...baseInputStyle, height: '176px' },
    error: {
      color: '#D93838',
      fontSize: '14px',
      fontFamily: "'Inter', sans-serif",
      marginTop: '4px',
    },
  };

  return (
    <Box
      component="section"
      id="contact"
      style={{
        width: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        align="flex-start"
        gap="48px"
        style={{
          width: '100%',
          maxWidth: '1440px',
          minHeight: '551px',
          padding: '48px 48px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side: Title & Pill Vector */}
        <Box
          style={{ flex: '0 0 265px', minWidth: '265px', paddingTop: '16px' }}
        >
          <Title
            order={2}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: '48px',
              lineHeight: '60px',
              letterSpacing: '0.02em',
              color: '#0D0D0D',
              margin: 0,
            }}
          >
            Let’s
            <br />
            Connect
            <br />
            for{' '}
            <svg
              width="103.45"
              height="40"
              viewBox="0 0 103.45 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
                marginLeft: '6px',
              }}
            >
              <path
                d="M 17.5 19.93 Q 51.72 15.07 85.95 19.93"
                stroke="#3BA3D3"
                strokeWidth="35"
                strokeLinecap="round"
              />
            </svg>
          </Title>
        </Box>

        {/* Right Side: Form */}
        <Box style={{ flex: '1 1 901px', maxWidth: '901px', width: '100%' }}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="30px">
              {/* Row 1: First & Last Name */}
              <Flex
                gap="35px"
                direction={{ base: 'column', sm: 'row' }}
                style={{ width: '100%' }}
              >
                <Box
                  style={{ flex: '1 1 0', width: '100%', maxWidth: '433px' }}
                >
                  <TextInput
                    placeholder="First Name *"
                    maxLength={50}
                    {...form.getInputProps('firstName')}
                    styles={inputStyle}
                  />
                </Box>
                <Box
                  style={{ flex: '1 1 0', width: '100%', maxWidth: '433px' }}
                >
                  <TextInput
                    placeholder="Last Name"
                    maxLength={50}
                    {...form.getInputProps('lastName')}
                    styles={inputStyle}
                  />
                </Box>
              </Flex>

              {/* Row 2: Email ID */}
              <TextInput
                placeholder="Email ID *"
                type="email"
                maxLength={100}
                {...form.getInputProps('customerEmail')}
                styles={inputStyle}
              />

              {/* Row 3: Subject */}
              <TextInput
                placeholder="Subject *"
                maxLength={150}
                {...form.getInputProps('subject')}
                styles={inputStyle}
              />

              {/* Row 4: Your Message */}
              <Textarea
                placeholder="Your Message *"
                maxLength={1000}
                {...form.getInputProps('message')}
                styles={textareaStyle}
              />

              {submitted && (
                <Text
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: '#204945',
                    fontWeight: 500,
                  }}
                >
                  Thank you! Your message has been sent successfully.
                </Text>
              )}

              <Flex justify="flex-start" mt="8px">
                <ClickSpark sparkColor="#5ECAFD">
                  <UnstyledButton
                    type="submit"
                    disabled={submitting}
                    style={{
                      padding: '14px 44px',
                      backgroundColor: '#3BA3D3',
                      borderRadius: '10px',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '18px',
                        color: '#FFFFFF',
                      }}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Text>
                  </UnstyledButton>
                </ClickSpark>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Flex>

      {/* Horizontal Divider Line */}
      <Box
        style={{
          width: '100%',
          maxWidth: '1440px',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      />
    </Box>
  );
};

export default ContactUsSection;
