import { Box, Image, SimpleGrid, Title } from '@mantine/core';

const TEAM_MEMBERS = [
  {
    name: 'Pavan Chandra Duddilla',
    role: 'Director',
    company: 'iGLOBUS Corporate Consulting',
    image: '/about/team-pavan.png',
  },
  {
    name: 'Uttam Singh',
    role: 'Founder, CEO',
    company: 'Shashwa Dimensions',
    image: '/about/team-uttam.png',
  },
  {
    name: 'Sanjana Shah',
    role: 'Executive Director',
    company: 'BNI',
    image: '/about/team-sanjana.png',
  },
  {
    name: 'Captain Anand',
    role: 'Director',
    company: 'Mira IMS',
    image: '/about/team-anand.png',
  },
];

export function AboutTeam() {
  return (
    <Box style={{ maxWidth: '1333px', margin: '88px auto 0 auto' }}>
      <Title
        order={2}
        ta="center"
        mb={48}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: '29px',
          lineHeight: '35px',
          color: '#000000',
        }}
      >
        Our Team
      </Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2 }}
        spacing={{ base: 24, md: 96 }}
        verticalSpacing={24}
      >
        {TEAM_MEMBERS.map((member, idx) => (
          <Box
            key={idx}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
              border: '1px solid #ECECEC',
            }}
          >
            <Image
              src={member.image}
              alt={`${member.name} - ${member.role}, ${member.company}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                backgroundColor: '#FFFFFF',
              }}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
