import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconMaximize,
  IconPlayerPause,
  IconPlayerPlay,
  IconSparkles,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

import type { BrochurePageItem } from './brochureData';
import { brochurePages } from './brochureData';
export type { BrochurePageItem };

interface BrochureViewerProps {
  showTitle?: boolean;
  compact?: boolean;
}

export const BrochureViewer: React.FC<BrochureViewerProps> = ({
  showTitle = true,
  compact = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-slide effect "one after another"
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % brochurePages.length);
      setIsTransitioning(false);
    }, 250);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + brochurePages.length) % brochurePages.length
      );
      setIsTransitioning(false);
    }, 250);
  };

  const handleSelectPage = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  const currentPage = brochurePages[currentIndex];

  return (
    <Box
      style={{
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <style>
        {`
          @keyframes brochureFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          @keyframes pagePulse {
            0% { opacity: 0.85; transform: scale(0.98); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>

      {showTitle && (
        <Stack align="center" gap={12} mb={compact ? 24 : 40} ta="center">
          <Badge
            variant="light"
            color="blue"
            size="lg"
            radius="xl"
            leftSection={<IconSparkles size={16} />}
            style={{
              padding: '6px 16px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Official Brochure
          </Badge>

          <Title
            order={2}
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              lineHeight: 1.25,
              color: '#0F172A',
            }}
          >
            Explore the UdyogSethu Brochure
          </Title>

          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Browse our mission, candidate tools, enterprise hiring workflows,
            and AI matcher capabilities.
          </Text>
        </Stack>
      )}

      {/* Main Interactive Showcase Card */}
      <Container size={compact ? 'md' : 'lg'} p={0}>
        <Box
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            boxShadow:
              '0 20px 50px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
            overflow: 'hidden',
            padding: isMobile ? '16px' : '28px 36px',
            position: 'relative',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
          }}
        >
          {/* Top Control Bar */}
          <Flex
            justify="space-between"
            align="center"
            wrap="wrap"
            gap="sm"
            mb="xl"
            style={{
              paddingBottom: '16px',
              borderBottom: '1px solid #EEF2F6',
            }}
          >
            <Flex align="center" gap="xs">
              <Badge
                color="#175DB1"
                variant="filled"
                size="lg"
                radius="md"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                Page {currentPage.pageNum} of {brochurePages.length}
              </Badge>
              <Text
                fw={600}
                fz={15}
                c="#334155"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {currentPage.title}
              </Text>
            </Flex>

            {/* Playback & View Controls */}
            <Group gap="xs">
              <Tooltip
                label={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              >
                <ActionIcon
                  variant="light"
                  color={isPlaying ? 'blue' : 'gray'}
                  size="lg"
                  radius="md"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label="Toggle auto slide"
                >
                  {isPlaying ? (
                    <IconPlayerPause size={18} />
                  ) : (
                    <IconPlayerPlay size={18} />
                  )}
                </ActionIcon>
              </Tooltip>

              <Tooltip label="View Fullscreen">
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="lg"
                  radius="md"
                  onClick={openModal}
                  aria-label="Open fullscreen preview"
                >
                  <IconMaximize size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Flex>

          {/* Active Brochure Slide Viewer */}
          <Box
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 0',
            }}
          >
            {/* Left Nav Arrow */}
            <ActionIcon
              variant="filled"
              size={isMobile ? 'lg' : 48}
              radius="xl"
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: isMobile ? '4px' : '16px',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#0F172A',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              aria-label="Previous brochure page"
            >
              <IconChevronLeft size={isMobile ? 20 : 28} />
            </ActionIcon>

            {/* Active Brochure Sheet */}
            <Box
              onClick={openModal}
              style={{
                cursor: 'zoom-in',
                maxWidth: '680px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition:
                  'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
                transform: isTransitioning
                  ? 'scale(0.96) translateY(8px)'
                  : 'scale(1) translateY(0)',
                opacity: isTransitioning ? 0.4 : 1,
              }}
            >
              <Box
                style={{
                  position: 'relative',
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow:
                    '0 25px 60px -15px rgba(23, 93, 177, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <Image
                  src={currentPage.image}
                  alt={currentPage.title}
                  fit="contain"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '740px',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />

                {/* Subtle Hover Overlay Hint */}
                <Box
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(8px)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    pointerEvents: 'none',
                  }}
                >
                  <IconEye size={14} />
                  <span>Click to expand</span>
                </Box>
              </Box>
            </Box>

            {/* Right Nav Arrow */}
            <ActionIcon
              variant="filled"
              size={isMobile ? 'lg' : 48}
              radius="xl"
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: isMobile ? '4px' : '16px',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                color: '#0F172A',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
              aria-label="Next brochure page"
            >
              <IconChevronRight size={isMobile ? 20 : 28} />
            </ActionIcon>
          </Box>

          {/* Subtitle / Caption */}
          <Box ta="center" mt="md" mb="xl">
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                color: '#64748B',
                fontWeight: 500,
              }}
            >
              {currentPage.subtitle}
            </Text>
          </Box>

          {/* Interactive Thumbnails Strip */}
          <Box
            style={{
              paddingTop: '20px',
              borderTop: '1px solid #EEF2F6',
            }}
          >
            <Flex
              gap={isMobile ? 'xs' : 'md'}
              justify="center"
              align="center"
              wrap="nowrap"
              style={{
                overflowX: 'auto',
                paddingBottom: '8px',
              }}
            >
              {brochurePages.map((page, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <Box
                    key={page.id}
                    onClick={() => handleSelectPage(idx)}
                    style={{
                      cursor: 'pointer',
                      flex: '0 0 auto',
                      width: isMobile ? '64px' : '96px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: isActive
                        ? '3px solid #175DB1'
                        : '2px solid transparent',
                      boxShadow: isActive
                        ? '0 6px 18px rgba(23, 93, 177, 0.35)'
                        : '0 2px 8px rgba(0, 0, 0, 0.06)',
                      transform: isActive ? 'scale(1.05)' : 'scale(0.96)',
                      opacity: isActive ? 1 : 0.7,
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <Image
                      src={page.image}
                      alt={page.title}
                      fit="contain"
                      style={{
                        width: '100%',
                        height: isMobile ? '82px' : '124px',
                        display: 'block',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      style={{
                        backgroundColor: isActive ? '#175DB1' : '#F1F5F9',
                        color: isActive ? '#FFFFFF' : '#475569',
                        padding: '3px 0',
                        textAlign: 'center',
                        fontSize: '11px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      P{page.pageNum}
                    </Box>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Box>
      </Container>

      {/* Fullscreen High-Resolution Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeModal}
        size="90%"
        centered
        radius="lg"
        withCloseButton
        padding="md"
        title={
          <Group gap="sm">
            <Badge color="blue" size="md">
              Page {currentPage.pageNum}
            </Badge>
            <Text fw={600} fz={16}>
              {currentPage.title}
            </Text>
          </Group>
        }
      >
        <Center p="sm">
          <Image
            src={currentPage.image}
            alt={currentPage.title}
            fit="contain"
            style={{
              maxHeight: '85vh',
              maxWidth: '100%',
              borderRadius: '8px',
              objectFit: 'contain',
            }}
          />
        </Center>
      </Modal>
    </Box>
  );
};

export default BrochureViewer;
