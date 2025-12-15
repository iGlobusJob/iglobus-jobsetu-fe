import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Group,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import type { Vendor } from '@/features/dashboard/types/vendor';
import { getClientById } from '@/services/admin-services';

interface VendorDetailsDrawerProps {
  opened: boolean;
  onClose: () => void;
  vendor: Vendor | null;
}

const ClientDetailsDrawer: React.FC<VendorDetailsDrawerProps> = ({
  opened,
  onClose,
  vendor,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const [form, setForm] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!vendor) return;
    const fetchVendor = async () => {
      setLoading(true);
      try {
        const vendorDetails = await getClientById(vendor.id);
        setForm(vendorDetails);
      } catch {
        toast.error('Failed to fetch client details');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [vendor]);

  if (!vendor || !form) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Client Profile"
      position="right"
      padding={isMobile ? 'md' : 'xl'}
      size={isMobile ? '100%' : isTablet ? '60%' : '45%'}
      styles={{
        title: {
          fontSize: '1.6rem',
          fontWeight: 700,
          width: '100%',
          textAlign: 'left',
        },
      }}
    >
      <LoadingOverlay visible={loading} />

      <ScrollArea h={`calc(100vh - 90px)`} offsetScrollbars>
        <Group justify="left" align="center" mt="md" mb="sm" gap="lg">
          <Avatar
            size={80}
            radius="xl"
            src={form.logo || undefined}
            color="blue"
          >
            {(form.organizationName?.[0] || '?').toUpperCase()}
          </Avatar>

          <Stack gap={7} align="flex-start">
            <Text fw={700} size="lg">
              {form.organizationName}
            </Text>

            <Group gap="xs">
              <Badge variant="filled">{vendor.category}</Badge>
              <Badge
                variant="light"
                color={
                  vendor.status === 'active'
                    ? 'green'
                    : vendor.status === 'registered'
                      ? 'blue'
                      : vendor.status === 'inactive'
                        ? 'red'
                        : 'gray'
                }
              >
                {vendor.status.toUpperCase()}
              </Badge>
            </Group>
          </Stack>
        </Group>

        <Divider mt="sm" />
        <Divider />

        <Stack gap="lg" px={4}>
          {/* COMPANY DETAILS */}
          <Stack gap="sm" mt="sm">
            <Text fw={600}>Company Details</Text>

            <TextInput
              label="Organization Name"
              value={form.organizationName}
              readOnly
            />

            <TextInput label="Email Address" value={form.email} readOnly />

            <TextInput label="Mobile Number" value={form.mobile} readOnly />

            <TextInput label="Location" value={form.location} readOnly />

            <Group grow>
              <TextInput label="GSTIN" value={form.gstin || ''} readOnly />

              <TextInput
                label="PAN Number"
                value={form.panCard || ''}
                readOnly
              />
            </Group>
          </Stack>

          <Divider />

          {/* PRIMARY CONTACT */}
          <Stack gap="sm">
            <Text fw={600}>Primary Contact</Text>

            <Group grow>
              <TextInput
                label="First Name"
                value={form.primaryContact?.firstName || ''}
                readOnly
              />

              <TextInput
                label="Last Name"
                value={form.primaryContact?.lastName || ''}
                readOnly
              />
            </Group>
          </Stack>

          <Divider />

          {/* SECONDARY CONTACT */}
          <Stack gap="sm">
            <Text fw={600}>Secondary Contact</Text>

            <Group grow>
              <TextInput
                label="First Name"
                value={form.secondaryContact?.firstName || ''}
                readOnly
              />

              <TextInput
                label="Last Name"
                value={form.secondaryContact?.lastName || ''}
                readOnly
              />
            </Group>
          </Stack>

          <Divider />
        </Stack>
      </ScrollArea>
    </Drawer>
  );
};

export default ClientDetailsDrawer;
