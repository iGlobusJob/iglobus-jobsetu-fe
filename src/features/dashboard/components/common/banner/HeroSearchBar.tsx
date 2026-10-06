import { Box, Flex, Select, TextInput, UnstyledButton } from '@mantine/core';
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/store/userDetails';

export interface HeroSearchBarProps {
  onSearch?: (searchData: { keyword: string; location: string }) => void;
  locations?: { value: string; label: string }[];
}

const defaultLocations = [
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Secunderabad', label: 'Secunderabad' },
  { value: 'Miyapur', label: 'Miyapur' },
  { value: 'Bowenpally', label: 'Bowenpally' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Remote', label: 'Remote' },
];

export const HeroSearchBar: React.FC<HeroSearchBarProps> = ({
  onSearch,
  locations = defaultLocations,
}) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isLoggedIn, userRole } = useAuthStore();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (keyword.trim()) params.set('search', keyword.trim());
    if (location && location !== 'all') params.set('location', location);
    const queryString = params.toString();

    if (isLoggedIn() && userRole === 'candidate') {
      navigate(`/candidate/search${queryString ? `?${queryString}` : ''}`);
    } else {
      navigate(`/candidate/login${queryString ? `?${queryString}` : ''}`);
    }

    if (onSearch) {
      onSearch({ keyword, location: location || 'all' });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '840px',
        margin: '0 auto',
      }}
    >
      <Box
        style={{
          width: '100%',
          height: '68px',
          boxSizing: 'border-box',
          padding: '10px 18px',
          borderRadius: '16px',
          border: '3px solid transparent',
          background:
            'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(89.56deg, #175DB1 0%, #5ECAFD 100.11%) border-box',
          boxShadow: '0px 8px 24px rgba(23, 93, 177, 0.08)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '16px',
        }}
      >
        {/* Left: Job keyword input */}
        <Flex
          align="center"
          gap="10px"
          style={{
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          <IconSearch size={20} color="#000000" style={{ flexShrink: 0 }} />
          <TextInput
            variant="unstyled"
            placeholder="Job title, keywords, or company"
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
            style={{ width: '100%' }}
            styles={{
              input: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '22px',
                color: '#1a1a1a',
                height: 'auto',
                padding: 0,
              },
            }}
          />
        </Flex>

        {/* Middle: Location selector */}
        <Flex
          align="center"
          gap="10px"
          style={{
            flex: '0 0 200px',
            minWidth: '160px',
          }}
        >
          <IconMapPin size={20} color="#000000" style={{ flexShrink: 0 }} />
          <Select
            variant="unstyled"
            placeholder="Select Location"
            data={locations}
            value={location}
            onChange={setLocation}
            searchable
            clearable
            style={{ width: '100%' }}
            styles={{
              input: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: '22px',
                color: '#1a1a1a',
                height: 'auto',
                padding: 0,
              },
            }}
          />
        </Flex>

        {/* Right: Find Jobs button */}
        <UnstyledButton
          type="submit"
          style={{
            width: '124px',
            height: '44px',
            background: '#3BA3D3',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.2s ease, transform 0.1s ease',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '17px',
              lineHeight: '22px',
              color: '#FFFFFF',
              userSelect: 'none',
            }}
          >
            Find Jobs
          </span>
        </UnstyledButton>
      </Box>
    </form>
  );
};

export default HeroSearchBar;
