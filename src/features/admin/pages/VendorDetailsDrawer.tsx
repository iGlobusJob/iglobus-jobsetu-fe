import {
  Avatar,
  Badge,
  Button,
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

import type { ApiError } from '@/common';
import { vendorDetailsSchema } from '@/features/dashboard/forms/vendordetails';
import type { AdminUpdateVendor } from '@/features/dashboard/types/admin';
import type { Vendor } from '@/features/dashboard/types/vendor';
import { getClientById, updateClientByAdmin } from '@/services/admin-services';

interface VendorDetailsDrawerProps {
  opened: boolean;
  onClose: () => void;
  vendor: Vendor | null;
  onUpdate: (updatedVendor: Vendor) => void;
  onStatusChange: (
    id: string,
    status: 'registered' | 'active' | 'inactive'
  ) => void;
}

const VendorDetailsDrawer: React.FC<VendorDetailsDrawerProps> = ({
  opened,
  onClose,
  vendor,
  onUpdate,
  onStatusChange,
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

  function updateField<Key extends keyof Vendor>(key: Key, value: Vendor[Key]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  const updateNested = (
    parent: 'primaryContact' | 'secondaryContact',
    key: 'firstName' | 'lastName',
    value: string
  ) => {
    setForm((prev) =>
      prev
        ? {
          ...prev,
          [parent]: {
            ...prev[parent],
            [key]: value,
          },
        }
        : prev
    );
  };

  const handleSave = async () => {
    if (!form) return;
    const validation = vendorDetailsSchema.safeParse(form);

    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    const payload: AdminUpdateVendor = {
      vendorId: form.id,
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      status: form.status,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      setLoading(true);
      const updated = await updateClientByAdmin(payload);
      onUpdate(updated);
      toast.success('Client updated successfully !');
      onClose();
    } catch (error: unknown) {
      const err = error as ApiError;
      toast.error(
        err?.response?.data?.message || err?.data?.message || err?.message
      );
    } finally {
      setLoading(false);
    }
  };

  const approveVendor = async () => {
    if (!form) return;
    setLoading(true);

    const payload: AdminUpdateVendor = {
      vendorId: form.id,
      status: 'active',
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      const updated = await updateClientByAdmin(payload);
      onStatusChange(form.id, 'active');
      onUpdate(updated);
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    }

    setLoading(false);
  };

  const handleReject = async () => {
    if (!form) return;
    setLoading(true);

    const payload: AdminUpdateVendor = {
      vendorId: form.id,
      status: 'inactive',
      organizationName: form.organizationName,
      logo: form.logo,
      mobile: form.mobile,
      location: form.location,
      gstin: form.gstin,
      panCard: form.panCard,
      primaryContact: {
        firstName: form.primaryContact?.firstName,
        lastName: form.primaryContact?.lastName,
      },
      secondaryContact: {
        firstName: form.secondaryContact?.firstName,
        lastName: form.secondaryContact?.lastName,
      },
    };

    try {
      const updated = await updateClientByAdmin(payload);
      onStatusChange(form.id, 'inactive');
      onUpdate(updated);
      onClose();
    } catch (err) {
      toast.error((err as Error).message);
    }

    setLoading(false);
  };

  if (!vendor || !form) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Manage Client Profile"
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
              placeholder="e.g. Acme Corp"
              size={isMobile ? 'sm' : 'md'}
              value={form.organizationName}
              onChange={(e) => updateField('organizationName', e.target.value)}
            />

            <TextInput
              label="Email Address"
              placeholder="contact@company.com"
              size={isMobile ? 'sm' : 'md'}
              value={form.email}
              disabled
            />

            <TextInput
              label="Mobile Number"
              placeholder="+91 98765 43210"
              size={isMobile ? 'sm' : 'md'}
              value={form.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
            />

            <TextInput
              label="Location"
              placeholder="e.g. Mumbai"
              size={isMobile ? 'sm' : 'md'}
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
            />

            <Group grow>
              <TextInput
                label="GSTIN"
                placeholder="22AAAAA0000A1Z5"
                size={isMobile ? 'sm' : 'md'}
                value={form.gstin || ''}
                onChange={(e) => updateField('gstin', e.target.value)}
              />

              <TextInput
                label="PAN Number"
                placeholder="ABCDE1234F"
                size={isMobile ? 'sm' : 'md'}
                value={form.panCard || ''}
                onChange={(e) => updateField('panCard', e.target.value)}
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
                placeholder="John"
                size={isMobile ? 'sm' : 'md'}
                value={form.primaryContact?.firstName || ''}
                onChange={(e) =>
                  updateNested('primaryContact', 'firstName', e.target.value)
                }
              />

              <TextInput
                label="Last Name"
                placeholder="Doe"
                size={isMobile ? 'sm' : 'md'}
                value={form.primaryContact?.lastName || ''}
                onChange={(e) =>
                  updateNested('primaryContact', 'lastName', e.target.value)
                }
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
                placeholder="Jane"
                size={isMobile ? 'sm' : 'md'}
                value={form.secondaryContact?.firstName || ''}
                onChange={(e) =>
                  updateNested('secondaryContact', 'firstName', e.target.value)
                }
              />

              <TextInput
                label="Last Name"
                placeholder="Smith"
                size={isMobile ? 'sm' : 'md'}
                value={form.secondaryContact?.lastName || ''}
                onChange={(e) =>
                  updateNested('secondaryContact', 'lastName', e.target.value)
                }
              />
            </Group>
          </Stack>

          <Divider />

          {/* ACTION BUTTONS */}
          <Stack gap="md">
            {vendor.status === 'registered' && (
              <Button
                color="green"
                variant="light"
                size={isMobile ? 'sm' : 'md'}
                fullWidth={isMobile}
                onClick={approveVendor}
              >
                Approve
              </Button>
            )}
            {vendor.status === 'active' && (
              <Button
                color="red"
                variant="light"
                size={isMobile ? 'sm' : 'md'}
                fullWidth={isMobile}
                onClick={handleReject}
              >
                Inactive
              </Button>
            )}
            {vendor.status === 'inactive' && (
              <Button
                color="green"
                variant="light"
                size={isMobile ? 'sm' : 'md'}
                fullWidth={isMobile}
                onClick={approveVendor}
              >
                Activate
              </Button>
            )}

            <Button
              size={isMobile ? 'sm' : 'md'}
              fullWidth={isMobile}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </ScrollArea>
    </Drawer>
  );
};

export default VendorDetailsDrawer;
