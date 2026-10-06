import { Box, Flex, Text, UnstyledButton } from '@mantine/core';
import React from 'react';

export interface CategoryItem {
  id: string;
  name: string;
  count: string;
}

const figmaCategories: CategoryItem[] = [
  { id: 'it', name: 'IT', count: '1.2k+ Jobs' },
  { id: 'non-it', name: 'Non-IT', count: '1.1k+ Jobs' },
  { id: 'accounting', name: 'Accounting', count: '12 Jobs' },
  { id: 'creative', name: 'Creative', count: '30 Jobs' },
  { id: 'development', name: 'Development', count: '22 Jobs' },
  { id: 'marketing', name: 'Marketing', count: '39 Jobs' },
  { id: 'legal', name: 'Legal', count: '100 Jobs' },
  { id: 'commercial', name: 'Commercial', count: '39 Jobs' },
  { id: 'medicine', name: 'Medicine', count: '12 Jobs' },
  { id: 'fitness', name: 'Fitness', count: '30 Jobs' },
];

export interface CategoriesProps {
  onSelectCategory?: (categoryId: string) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const handleClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const browseEl = document.getElementById('browse-jobs');
    if (browseEl) {
      browseEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="section"
      id="categories"
      style={{
        width: '100%',
        maxWidth: '1440px',
        minHeight: '536px',
        margin: '0 auto',
        padding: '48px 16px',
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}
    >
      {/* Frame 32: Header Group */}
      <Box
        style={{
          width: '100%',
          maxWidth: '948px',
          minHeight: '106px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <Text
          component="h2"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '27px',
            lineHeight: '34px',
            color: '#204945',
            textAlign: 'center',
            margin: 0,
            width: '100%',
          }}
        >
          Browse Jobs Categories
        </Text>
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '30px',
            color: '#778984',
            textAlign: 'center',
            maxWidth: '948px',
            margin: 0,
            width: '100%',
          }}
        >
          Find your dream job very easily here by searching the job name. We are
          providing high demands job for all the job seekars
        </Text>
      </Box>

      {/* Frame 31: 10 Cards in 2 Rows */}
      <Flex
        wrap="wrap"
        justify="center"
        align="center"
        style={{
          width: '100%',
          maxWidth: '1344px',
          minHeight: '310px',
          gap: '30px 22px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {figmaCategories.map((cat) => (
          <UnstyledButton
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            style={{
              width: '217px',
              height: '140px',
              boxSizing: 'border-box',
              border: '2px solid #E0E3E2',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3BA3D3';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow =
                '0 6px 18px rgba(59, 163, 211, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E0E3E2';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: '24px',
                color: '#204945',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {cat.name}
            </Text>

            <Text
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#778984',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {cat.count}
            </Text>
          </UnstyledButton>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
