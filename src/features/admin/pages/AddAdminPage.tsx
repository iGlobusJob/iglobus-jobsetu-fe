import {
  Card,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Stack,
  Container,
} from '@mantine/core';
import { useState } from 'react';
import { toast } from 'react-toastify';

import type { ApiError } from '@/common';
import { addAdminSchema } from '@/features/dashboard/forms/addAdminSchema';
import type { CreateAdminInput } from '@/features/dashboard/types/admin';
import { createAdmin } from '@/services/admin-services';

const AddAdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<CreateAdminInput>({
    username: '',
    password: '',
    role: 'admin',
  });

  const handleChange = (field: keyof CreateAdminInput, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    const result = addAdminSchema.safeParse(form);

    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      const response = await createAdmin(result.data);
      toast.success(response?.message || 'Admin created successfully !');
      setForm({ username: '', password: '', role: 'admin' });
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" mt={60}>
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg">
          <div style={{ textAlign: 'center' }}>
            <Title order={2} fw={600}>
              Add New Admin
            </Title>
          </div>

          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="Enter admin email"
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
              radius="md"
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Create a secure password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              radius="md"
              required
            />

            <Button
              fullWidth
              size="md"
              radius="md"
              loading={loading}
              onClick={handleSubmit}
              styles={{
                root: {
                  fontWeight: 600,
                },
              }}
            >
              Create Admin
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

export default AddAdminPage;
