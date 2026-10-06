import { Box, Flex, Stack, Text } from '@mantine/core';

export function AboutMissionVision() {
  return (
    <Stack
      gap="42px"
      style={{
        maxWidth: '1312px',
        margin: '52px auto 0 auto',
        position: 'relative',
      }}
    >
      {/* Mission */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={40}
      >
        <Box style={{ position: 'relative', flexShrink: 0, minWidth: '200px' }}>
          <img
            src="/about/mission-accent.png"
            alt=""
            style={{
              position: 'absolute',
              left: '-30px',
              top: '-28px',
              width: '85px',
              height: '71px',
              objectFit: 'contain',
              zIndex: 0,
            }}
          />
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '27px',
              lineHeight: '33px',
              color: '#000000',
              position: 'relative',
              zIndex: 1,
              paddingLeft: '14px',
            }}
          >
            Our Mission
          </Text>
        </Box>
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '21px',
            lineHeight: '32px',
            color: '#545454',
            maxWidth: '1088px',
            flex: 1,
          }}
        >
          Make quality employment opportunities easier to discover, manage, and
          match by connecting talent, employers, and recruitment teams in one
          trusted digital workflow.
        </Text>
      </Flex>

      {/* Vision */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={40}
      >
        <Text
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '27px',
            lineHeight: '33px',
            color: '#000000',
            flexShrink: 0,
            minWidth: '200px',
            paddingLeft: '14px',
          }}
        >
          Our Vision
        </Text>
        <Flex align="center" gap={24} style={{ flex: 1, maxWidth: '1088px' }}>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '21px',
              lineHeight: '32px',
              color: '#545454',
              flex: 1,
            }}
          >
            Our vision is to build a trusted and connected hiring ecosystem
            where every professional can discover meaningful opportunities and
            every business can find the right talent to grow.
          </Text>
          <img
            src="/about/mission-accent.png"
            alt=""
            style={{
              width: '70px',
              height: '71px',
              objectFit: 'contain',
              transform: 'scaleX(-1)',
              flexShrink: 0,
            }}
          />
        </Flex>
      </Flex>
    </Stack>
  );
}
