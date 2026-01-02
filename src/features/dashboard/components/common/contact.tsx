import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
  Paper,
  Group,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { sendContactUsMail } from '@/services/common-services';

import { contactSchema, type ContactFormData } from '../../forms/contactSchema';

const ContactUsSection = () => {
  const form = useForm({
    initialValues: {
      name: '',
      customerEmail: '',
      subject: '',
      message: '',
    },
    validate: zodResolver(contactSchema),
  });

  const handleSubmit = async (values: ContactFormData) => {
    try {
      await sendContactUsMail(values);
      form.reset();
    } catch (error) {
      console.error('Failed to send contact email', error);
    }
  };

  return (
    <Container size="sm" py="md">
      <Title order={2} ta="center" mb={8}>
        Contact Us
      </Title>

      <Paper withBorder radius="md" p="lg">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Name"
              placeholder="Enter your name"
              required
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Email Address"
              type="email"
              required
              placeholder="Enter your email"
              {...form.getInputProps('customerEmail')}
            />

            <TextInput
              label="Subject"
              required
              placeholder="Message subject"
              {...form.getInputProps('subject')}
            />

            <Textarea
              label="Message"
              required
              placeholder="Your message"
              minRows={4}
              autosize
              {...form.getInputProps('message')}
            />

            <Group justify="flex-end">
              <Button
                type="submit"
                size="md"
                w={100}
                radius="lg"
                variant="gradient"
                loading={form.submitting}
              >
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};
export default ContactUsSection;
