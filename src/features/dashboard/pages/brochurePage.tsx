import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDownload, IconFileText } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import { BrochureViewer } from '../components/common/brochure/BrochureViewer';
import { brochurePages } from '../components/common/brochure/brochureData';
import { FooterSubscribe } from '../components/common/footer';
import { Header } from '../components/common/header';
import { ScrollToTop } from '../components/common/scrolltotop';

export const BrochurePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>(
    'interactive'
  );
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: '#F8FAFC',
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Header />

      {/* Hero Header Section */}
      <Box
        component="section"
        style={{
          paddingTop: '150px',
          paddingBottom: '40px',
          background: 'linear-gradient(180deg, #EDF5FC 0%, #F8FAFC 100%)',
          textAlign: 'center',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <Container size="md">
          <Badge
            variant="filled"
            color="#175DB1"
            size="lg"
            radius="xl"
            mb="md"
            leftSection={<IconFileText size={16} />}
            style={{ padding: '6px 16px' }}
          >
            Digital Booklet & Brochure
          </Badge>

          <Title
            order={1}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 4.2vw, 48px)',
              lineHeight: 1.25,
              color: '#0F172A',
              marginBottom: '16px',
            }}
          >
            UdyogSethu Official Brochure
          </Title>

          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(16px, 1.8vw, 19px)',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '780px',
              margin: '0 auto 28px auto',
            }}
          >
            Discover how UdyogSethu combines recruitment expertise with
            intelligent matching to connect thousands of job seekers with
            verified employers across Telangana and India.
          </Text>

          {/* View Mode Toggle */}
          <Flex justify="center" align="center" gap="md" wrap="wrap">
            <SegmentedControl
              value={viewMode}
              onChange={(value) => setViewMode(value as 'interactive' | 'grid')}
              data={[
                { label: 'Animated Showcase', value: 'interactive' },
                { label: 'View All Pages (Scroll)', value: 'grid' },
              ]}
              size="md"
              radius="xl"
              style={{
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                backgroundColor: '#FFFFFF',
              }}
            />

            <Button
              component="a"
              href="/2.png"
              download="UdyogSethu_Brochure_Page_1.png"
              variant="light"
              color="blue"
              size="md"
              radius="xl"
              leftSection={<IconDownload size={18} />}
            >
              Download Pages
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Content Section */}
      <Box
        component="main"
        style={{
          padding: isMobile ? '32px 16px 80px 16px' : '48px 24px 100px 24px',
          maxWidth: '1360px',
          margin: '0 auto',
        }}
      >
        {viewMode === 'interactive' ? (
          <BrochureViewer showTitle={false} />
        ) : (
          /* Sequential Flow View: Displaying pages one after another with smooth cards */
          <Stack gap={48} align="center">
            {brochurePages.map((page) => (
              <Box
                key={page.id}
                style={{
                  width: '100%',
                  maxWidth: '820px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 15px 40px rgba(15, 23, 42, 0.06)',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Page Header */}
                <Flex
                  justify="space-between"
                  align="center"
                  wrap="wrap"
                  gap="sm"
                  style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: '#FAFCFF',
                  }}
                >
                  <Group gap="xs">
                    <Badge color="#175DB1" size="lg" radius="md">
                      Page {page.pageNum}
                    </Badge>
                    <Text
                      fw={700}
                      fz={17}
                      c="#0F172A"
                      style={{ fontFamily: "'Sora', sans-serif" }}
                    >
                      {page.title}
                    </Text>
                  </Group>

                  <Badge variant="light" color="blue" radius="xl">
                    {page.tag}
                  </Badge>
                </Flex>

                {/* Page Image */}
                <Box
                  style={{
                    padding: isMobile ? '12px' : '24px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={page.image}
                    alt={page.title}
                    fit="contain"
                    style={{
                      width: '100%',
                      maxHeight: '900px',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                {/* Page Footer Note */}
                <Box
                  style={{
                    padding: '12px 24px 18px 24px',
                    borderTop: '1px solid #F1F5F9',
                  }}
                >
                  <Text
                    size="sm"
                    c="#64748B"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {page.subtitle}
                  </Text>
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {/* Bottom CTA Card */}
        <Box
          mt={64}
          style={{
            backgroundColor: '#175DB1',
            borderRadius: '24px',
            padding: isMobile ? '32px 20px' : '48px 40px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(23, 93, 177, 0.25)',
            backgroundImage:
              'linear-gradient(135deg, #175DB1 0%, #0D4180 100%)',
          }}
        >
          <Title
            order={2}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(24px, 3vw, 36px)',
              marginBottom: '12px',
            }}
          >
            Ready to Partner with UdyogSethu?
          </Title>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '17px',
              maxWidth: '650px',
              margin: '0 auto 28px auto',
              opacity: 0.9,
            }}
          >
            Join our employment mission. Register as an employer to hire top
            candidates, or create your candidate profile today.
          </Text>
          <Group justify="center" gap="md">
            <Button
              size="lg"
              radius="xl"
              onClick={() => navigate('/client/register')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#175DB1',
                fontWeight: 600,
              }}
            >
              Hire Candidates
            </Button>
            <Button
              size="lg"
              radius="xl"
              variant="outline"
              onClick={() => navigate('/candidate/login')}
              style={{
                borderColor: '#FFFFFF',
                color: '#FFFFFF',
                fontWeight: 600,
              }}
            >
              Find Jobs
            </Button>
          </Group>
        </Box>
      </Box>

      <FooterSubscribe />
      <OTPmodal />
      <ScrollToTop />
    </Box>
  );
};

export default BrochurePage;
