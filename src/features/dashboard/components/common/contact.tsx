//contact us
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
  Paper,
} from '@mantine/core';

export function ContactUsSection() {
  return (
    <Container size="sm" py="xl">
      <Title order={2} ta="center" mb={4}>
        Contact Us
      </Title>

      <Paper withBorder radius="md" p="lg">
        <Stack gap="md">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            required
          />

          <TextInput
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            required
          />

          <TextInput label="Subject" placeholder="Message subject " required />

          <Textarea
            label="Message"
            placeholder="Your message"
            minRows={4}
            autosize
            required
          />

          <Button
            mt="md"
            size="md"
            radius="md"
            style={{
              background: 'linear-gradient(135deg, #4dabf7 0%, #339af0 100%)',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
