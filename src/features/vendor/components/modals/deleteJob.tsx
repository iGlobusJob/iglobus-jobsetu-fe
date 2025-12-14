import { Stack, Text, Center, Group, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertCircle } from '@tabler/icons-react';

export const openDeleteModal = (
  jobId: string,
  onConfirm: (id: string) => void
) => {
  modals.open({
    withCloseButton: false,
    centered: true,
    radius: 'lg',
    padding: 'xl',

    children: (
      <Stack align="center" gap="md">
        <Center
          style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: '#ffe6e6',
          }}
        >
          <IconAlertCircle size={34} color="red" />
        </Center>

        <Text fw={700} size="lg" ta="center">
          Delete Job
        </Text>

        <Text size="sm" c="dimmed" ta="center">
          Are you sure you want to delete this job?
          <br />
          <Text span fw={700} c="red">
            This action cannot be undone.
          </Text>
        </Text>

        <Group justify="space-between" w="100%" mt="md">
          <Button
            variant="default"
            radius="md"
            onClick={() => modals.closeAll()}
          >
            Cancel
          </Button>

          <Button
            color="red"
            radius="md"
            onClick={() => {
              onConfirm(jobId);
              modals.closeAll();
            }}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    ),
  });
};
