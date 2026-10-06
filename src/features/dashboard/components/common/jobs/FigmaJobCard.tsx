import { Box, Flex, Image, Text, Title, UnstyledButton } from '@mantine/core';
import { IconHeart, IconMapPin, IconUser } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';

import type { CandidateJobs } from '../../../types/candidate';

export interface FigmaJobCardProps {
  job: CandidateJobs;
  onBookmark: (jobId: string, e: React.MouseEvent) => void;
  onApply: (jobId: string, e: React.MouseEvent) => void;
  onCardClick?: (jobId: string, e: React.MouseEvent) => void;
}

const stripHtmlTags = (html?: string) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
};

const getPostedTime = (created?: string, posted?: string) => {
  if (posted) return posted;
  if (!created) return 'Recently';
  const date = new Date(created);
  if (isNaN(date.getTime())) return 'Recently';
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000);
  return diffDays <= 0
    ? 'Today'
    : diffDays === 1
      ? '1 day ago'
      : `${diffDays} days ago`;
};

export const FigmaJobCard: React.FC<FigmaJobCardProps> = ({
  job,
  onBookmark,
  onApply,
  onCardClick,
}) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const openModal = useOtpModalStore((s) => s.openModal);
  const token = useAuthStore((s) => s.token);

  const handleCardClick = (e: React.MouseEvent) => {
    if (onCardClick) onCardClick(job.id, e);
    else if (!token) openModal(job.id);
    else navigate(`/jobs/${job.id}`);
  };

  const postedAgo = getPostedTime(job.createdAt, job.postedTime);

  return (
    <Box
      onClick={handleCardClick}
      style={{
        width: '100%',
        maxWidth: '510px',
        height: '428px',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0px 0px 20px 5px rgba(60, 189, 150, 0.1)',
        padding: '30px 42px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        cursor: 'pointer',
        opacity: 1,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow =
          '0px 8px 24px rgba(59, 163, 211, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow =
          '0px 0px 20px 5px rgba(60, 189, 150, 0.1)';
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Header: Logo / Profile Icon & Job Type / Posted Ago */}
        <Flex justify="space-between" align="center" mb="16px">
          <Box
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '6px',
              border: '1px solid #ECECEC',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA',
              flexShrink: 0,
            }}
          >
            {job.logo && !imgError ? (
              <Image
                src={job.logo}
                alt={job.organizationName || 'Company'}
                fit="contain"
                onError={() => setImgError(true)}
                style={{ width: '42px', height: '42px' }}
              />
            ) : (
              <IconUser size={28} color="#3BA3D3" />
            )}
          </Box>

          <Flex align="center" gap="8px">
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '24px',
                color: '#778984',
              }}
            >
              {postedAgo}
            </Text>
            <Box
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#3BA3D3',
              }}
            />
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '28px',
                color: '#778984',
              }}
            >
              {job.jobType || 'Full-time'}
            </Text>
          </Flex>
        </Flex>

        {/* Rectangle 257: Top Divider */}
        <Box
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(215, 219, 225, 0.5)',
            marginBottom: '14px',
          }}
        />

        {/* Location & Salary */}
        {(job.jobLocation || job.salaryRange) && (
          <Flex justify="space-between" align="center" mb="14px">
            {job.jobLocation ? (
              <Flex align="center" gap="6px">
                <IconMapPin size={18} color="#3BA3D3" />
                <Text
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#778984',
                  }}
                >
                  {job.jobLocation}
                </Text>
              </Flex>
            ) : (
              <Box />
            )}
            {job.salaryRange && (
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#000000',
                }}
              >
                {job.salaryRange}
              </Text>
            )}
          </Flex>
        )}

        {/* Title & Organization */}
        <Title
          order={3}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '25px',
            color: '#204945',
            marginBottom: '4px',
          }}
        >
          {job.jobTitle}
        </Title>
        <Text
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '12px',
            lineHeight: '15px',
            color: '#0087C5',
            marginBottom: '12px',
          }}
        >
          {job.organizationName}
        </Text>

        {/* Description */}
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            lineHeight: '28px',
            color: '#000000',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {stripHtmlTags(job.jobDescription)}
        </Text>
      </Box>

      {/* Bottom Actions & Divider */}
      <Box mt="16px">
        {/* Rectangle 258: Bottom Divider */}
        <Box
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(215, 219, 225, 0.5)',
            marginBottom: '14px',
          }}
        />
        <Flex justify="space-between" align="center">
          <Flex gap="12px" align="center">
            <UnstyledButton
              onClick={(e) => onApply(job.id, e)}
              style={{
                width: '84px',
                height: '38px',
                backgroundColor: job.applied ? '#204945' : '#3BA3D3',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '15px',
                  color: '#FFFFFF',
                }}
              >
                {job.applied ? 'Applied' : 'Apply'}
              </Text>
            </UnstyledButton>

            <UnstyledButton
              onClick={handleCardClick}
              style={{
                width: '105px',
                height: '38px',
                border: '1px solid #3BA3D3',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Text
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '15px',
                  color: '#204945',
                }}
              >
                View more
              </Text>
            </UnstyledButton>
          </Flex>

          <UnstyledButton
            onClick={(e) => onBookmark(job.id, e)}
            style={{ padding: '6px', cursor: 'pointer' }}
          >
            <IconHeart
              size={26}
              color="#3BA3D3"
              fill={job.bookmarked ? '#3BA3D3' : 'none'}
            />
          </UnstyledButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default FigmaJobCard;
