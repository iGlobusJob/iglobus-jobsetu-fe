import {
  Box,
  Flex,
  Loader,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAllJobs,
  getMyJobs,
  saveToJob,
  unSaveToJob,
} from '@/services/candidate-services';
import { useOtpModalStore } from '@/store/otpModalStore';
import { useAuthStore } from '@/store/userDetails';

import type { CandidateJobs } from '../../types/candidate';

import { FigmaJobCard } from './jobs/FigmaJobCard';

type TabType = 'recent' | 'freelance' | 'fullTime' | 'partTime';

const filterTabs: { id: TabType; label: string }[] = [
  { id: 'recent', label: 'Recent Jobs' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'fullTime', label: 'Full Time' },
  { id: 'partTime', label: 'Part Time' },
];

export const JobListingsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('recent');
  const [jobs, setJobs] = useState<CandidateJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);
  const userRole = useAuthStore((s) => s.userRole);
  const openModal = useOtpModalStore((s) => s.openModal);
  const isCandidate = Boolean(token) && userRole === 'candidate';
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await getAllJobs();
        const bookmarkedSet = new Set<string>();
        const appliedSet = new Set<string>();

        if (isCandidate) {
          const myJobs = await getMyJobs();
          myJobs?.forEach((item) => {
            const jobId = item.jobId?.id;
            if (!jobId) return;
            if (item.isJobSaved) bookmarkedSet.add(jobId);
            if (item.isJobApplied) appliedSet.add(jobId);
          });
        }

        const enriched: CandidateJobs[] = allJobs.map((apiJob) => ({
          id: apiJob.id,
          jobTitle: apiJob.jobTitle,
          organizationName: apiJob.organizationName,
          jobLocation: apiJob.jobLocation,
          jobType: apiJob.jobType,
          jobDescription: apiJob.jobDescription,
          salaryMin: apiJob.minimumSalary,
          salaryMax: apiJob.maximumSalary,
          experienceLevel: `${apiJob.minimumExperience} - ${apiJob.maximumExperience} years`,
          salaryRange: `₹${apiJob.minimumSalary.toLocaleString()} - ₹${apiJob.maximumSalary.toLocaleString()}`,
          bookmarked: bookmarkedSet.has(apiJob.id),
          applied: appliedSet.has(apiJob.id),
          category: apiJob.jobType || 'general',
          logo: apiJob.logo,
          status: apiJob.status,
          createdAt: apiJob.createdAt,
        }));
        setJobs(enriched);
      } catch (err) {
        console.error('Failed to load jobs', err);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [isCandidate]);

  const handleBookmark = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) {
      openModal(jobId);
      return;
    }
    const current = jobs.find((j) => j.id === jobId);
    const willBookmark = !current?.bookmarked;
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, bookmarked: willBookmark } : j))
    );
    try {
      if (willBookmark) await saveToJob({ jobId });
      else await unSaveToJob({ jobId });
    } catch {
      setJobs((prev) =>
        prev.map((j) =>
          j.id === jobId ? { ...j, bookmarked: !willBookmark } : j
        )
      );
    }
  };

  const handleApply = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) openModal(jobId);
    else navigate(`/jobs/${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'recent') return true;
    const type = (job.jobType || '').toLowerCase();
    if (activeTab === 'freelance') return type.includes('freelance');
    if (activeTab === 'fullTime') return type.includes('full');
    if (activeTab === 'partTime') return type.includes('part');
    return true;
  });

  return (
    <Box
      component="section"
      id="browse-jobs"
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto 24px auto',
        padding: '56px 24px',
        boxSizing: 'border-box',
        backgroundColor: '#ECF6FB',
      }}
    >
      <Stack align="center" gap="12px" mb="32px">
        <Title
          order={2}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(22px, 2.5vw, 27px)',
            lineHeight: '37px',
            color: '#000000',
            textAlign: 'center',
          }}
        >
          Explore Feature Jobs
        </Title>
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '23px',
            color: '#5F5F5F',
            textAlign: 'center',
            maxWidth: '966px',
            whiteSpace: 'nowrap',
          }}
        >
          Find your next opportunity in just a few simple steps — from creating
          your profile to landing your dream job.
        </Text>

        {/* 4 Filter Pills */}
        <Flex gap="16px" justify="center" wrap="wrap" mt="16px">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <UnstyledButton
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '160px',
                  height: '39px',
                  borderRadius: '100px',
                  backgroundColor: isActive ? '#3BA3D3' : '#FFFFFF',
                  border: isActive ? 'none' : '0.75px solid #383838',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Text
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: isActive ? '#FFFFFF' : '#1A1A1A',
                  }}
                >
                  {tab.label}
                </Text>
              </UnstyledButton>
            );
          })}
        </Flex>
      </Stack>

      <style>
        {`
          .job-scroller {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .job-scroller::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {/* Jobs Grid / Horizontal Invisible Scroller */}
      {loading ? (
        <Flex justify="center" py="50px">
          <Loader color="#3BA3D3" size="lg" />
        </Flex>
      ) : filteredJobs.length === 0 ? (
        <Text ta="center" py="40px" c="#778984" fz="lg">
          No jobs found for this category.
        </Text>
      ) : (
        <Flex
          className="job-scroller"
          align="center"
          justify={filteredJobs.length < 3 ? 'center' : 'flex-start'}
          gap="24px"
          style={{
            width: '100%',
            maxWidth: '1380px',
            margin: '0 auto',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '12px 4px',
            boxSizing: 'border-box',
            scrollBehavior: 'smooth',
          }}
        >
          {filteredJobs.map((job) => (
            <Box
              key={job.id}
              style={{ flex: '0 0 auto', width: '100%', maxWidth: '510px' }}
            >
              <FigmaJobCard
                job={job}
                onBookmark={handleBookmark}
                onApply={handleApply}
              />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default JobListingsSection;
