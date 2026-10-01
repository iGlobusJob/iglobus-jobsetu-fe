import { Box, Flex, Select, TextInput, UnstyledButton } from '@mantine/core';
import { IconMapPin, IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';

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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onSearch) {
      onSearch({ keyword, location: location || 'all' });
    } else {
      const browseSection = document.getElementById('browse-jobs');
      if (browseSection) {
        browseSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '100%',
        maxWidth: '934px',
        margin: '0 auto',
      }}
    >
      <Box
        style={{
          width: '100%',
          height: '84px',
          boxSizing: 'border-box',
          padding: '16px 24px',
          borderRadius: '20px',
          border: '4px solid transparent',
          background:
            'linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(89.56deg, #175DB1 0%, #5ECAFD 100.11%) border-box',
          boxShadow: '0px 10px 30px rgba(23, 93, 177, 0.08)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: '24px',
        }}
      >
        {/* Left: Job keyword input */}
        <Flex
          align="center"
          gap="12px"
          style={{
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          <IconSearch size={24} color="#000000" style={{ flexShrink: 0 }} />
          <TextInput
            variant="unstyled"
            placeholder="Job title, keywords, or company"
            value={keyword}
            onChange={(e) => setKeyword(e.currentTarget.value)}
            style={{ width: '100%' }}
            styles={{
              input: {
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                lineHeight: '26px',
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
          gap="12px"
          style={{
            flex: '0 0 220px',
            minWidth: '180px',
          }}
        >
          <IconMapPin size={24} color="#000000" style={{ flexShrink: 0 }} />
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
                fontSize: '18px',
                lineHeight: '26px',
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
            width: '141px',
            height: '52px',
            background: '#3BA3D3',
            borderRadius: '10px',
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
              fontSize: '21px',
              lineHeight: '26px',
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
