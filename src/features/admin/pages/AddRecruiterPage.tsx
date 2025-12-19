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
import type { CreateRecruiterInput } from '@/features/dashboard/types/admin';
import { createRecruiter } from '@/services/admin-services';

const AddRecruiterPage = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<CreateRecruiterInput>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = (field: keyof CreateRecruiterInput, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.email || !form.password) {
            toast.error('All fields are required.');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            const response = await createRecruiter(form);

            toast.success(response?.message || 'Recruiter created successfully !');
            setForm({ firstName: '', lastName: '', email: '', password: '' });
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
                            Add New Recruiter
                        </Title>
                    </div>

                    <Stack gap="md">
                        <TextInput
                            label="First Name"
                            placeholder="Enter first name"
                            value={form.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            radius="md"
                            required
                        />

                        <TextInput
                            label="Last Name"
                            placeholder="Enter last name"
                            value={form.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            radius="md"
                            required
                        />

                        <TextInput
                            label="Email"
                            placeholder="Enter email address"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            type="email"
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
                            Create
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    );
};

export default AddRecruiterPage;
