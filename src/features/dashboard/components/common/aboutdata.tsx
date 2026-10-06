import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconBuildingCommunity,
  IconBulbFilled,
  IconChecklist,
  IconHeartHandshake,
  IconRosetteDiscountCheckFilled,
  IconUsers,
} from '@tabler/icons-react';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import { FooterSubscribe } from './footer';
import { Header } from './header';

const CORE_VALUES = [
  {
    icon: <IconHeartHandshake size={30} color="#003D8F" />,
    text: 'We build every connection on transparency, reliability, and genuine relationships.',
  },
  {
    icon: <IconUsers size={30} color="#003D8F" />,
    text: 'We put candidates and employers at the center of every hiring experience.',
  },
  {
    icon: <IconRosetteDiscountCheckFilled size={30} color="#003D8F" />,
    text: 'We strive to deliver quality opportunities and recruitment solutions that create real value.',
  },
  {
    icon: <IconBulbFilled size={30} color="#003D8F" />,
    text: 'We use technology and smarter processes to make hiring faster, simpler, and more effective.',
  },
];

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
    role: 'Execitive Director',
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

const STATS = [
  {
    value: '10+ Years',
    label: 'Recruitment & Staffing Experience',
    icon: <IconBriefcase size={22} color="#003D8F" />,
  },
  {
    value: '5K+',
    label: 'Job Opportunities',
    icon: <IconChecklist size={22} color="#003D8F" />,
  },
  {
    value: '100+',
    label: 'Businesses Served',
    icon: <IconBuildingCommunity size={22} color="#003D8F" />,
  },
  {
    value: '1000+',
    label: 'Professionals Reached',
    icon: <IconUsers size={22} color="#003D8F" />,
  },
];

export function AboutData() {
  return (
    <Box
      style={{ backgroundColor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}
    >
      <Header />

      <Box
        component="main"
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '130px 24px 60px 24px',
          boxSizing: 'border-box',
        }}
      >
        {/* HERO TITLE & INTRO */}
        <Stack align="center" gap="16px" ta="center" mb={40}>
          <Title
            order={1}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#000000',
            }}
          >
            About Us
          </Title>
          <Text
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(16px, 1.8vw, 20px)',
              lineHeight: '32px',
              color: '#000000',
              maxWidth: '1198px',
            }}
          >
            We make hiring simpler and more transparent through technology and
            trusted recruitment expertise. JobSetu connects professionals with
            the right opportunities while helping businesses find the right
            talent with confidence.
          </Text>
          <Box
            style={{
              width: '100%',
              maxWidth: '1312px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
              marginTop: '24px',
            }}
          >
            <Image
              src="/about/hero-meeting.jpg"
              alt="About JobSetu"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Box>
        </Stack>

        {/* MISSION & VISION */}
        <Stack
          gap="44px"
          style={{
            maxWidth: '1312px',
            margin: '70px auto',
            position: 'relative',
          }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={40}
          >
            <Box
              style={{ position: 'relative', flexShrink: 0, minWidth: '200px' }}
            >
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
              Make quality employment opportunities easier to discover, manage,
              and match by connecting talent, employers, and recruitment teams
              in one trusted digital workflow.
            </Text>
          </Flex>

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
            <Flex
              align="center"
              gap={24}
              style={{ flex: 1, maxWidth: '1088px' }}
            >
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
                where every professional can discover meaningful opportunities
                and every business can find the right talent to grow.
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

        {/* CORE VALUES */}
        <Box style={{ maxWidth: '1312px', margin: '80px auto' }}>
          <Title
            order={2}
            ta="center"
            mb={52}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '29px',
              lineHeight: '35px',
              color: '#000000',
            }}
          >
            Our Core Values
          </Title>
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing={{ base: 36, md: 72 }}
            verticalSpacing={48}
          >
            {CORE_VALUES.map((val, idx) => (
              <Box
                key={idx}
                style={{
                  position: 'relative',
                  width: '100%',
                  minHeight: '190px',
                }}
              >
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 56,
                    height: 56,
                    backgroundColor: '#E4F3FF',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: '0 4px 12px rgba(0, 61, 143, 0.08)',
                  }}
                >
                  {val.icon}
                </Box>
                <Box
                  style={{
                    marginTop: 28,
                    minHeight: 162,
                    backgroundColor: '#F3F3F3',
                    borderRadius: 24,
                    clipPath:
                      'polygon(0% 20px, 20px 0%, calc(100% - 50px) 0%, 100% 40px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 50px 100%, 0% calc(100% - 40px))',
                    padding: '38px 40px 30px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '21px',
                      lineHeight: '32px',
                      color: '#545454',
                      maxWidth: '467px',
                      width: '100%',
                      margin: 0,
                    }}
                  >
                    {val.text}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* OUR TEAM */}
        <Box style={{ maxWidth: '1333px', margin: '80px auto' }}>
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
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 24, md: 48 }}>
            {TEAM_MEMBERS.map((member, idx) => (
              <Box
                key={idx}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#FAFAFA',
                  boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                  border: '1px solid #ECECEC',
                }}
              >
                <Image
                  src={member.image}
                  alt={`${member.name} - ${member.role}, ${member.company}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* GROWING BEYOND BOUNDARIES */}
        <Box style={{ maxWidth: '1312px', margin: '80px auto' }}>
          <Title
            order={2}
            ta="center"
            mb={20}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '32px',
              color: '#000000',
            }}
          >
            Growing Beyond Boundaries
          </Title>
          <Box
            style={{
              width: '100%',
              maxWidth: '980px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <Image
              src="/about/world-map.png"
              alt="Global Reach Map"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24} mt={48}>
            {STATS.map((stat, idx) => (
              <Box
                key={idx}
                p={28}
                style={{
                  borderRadius: 24,
                  background:
                    'linear-gradient(155.7deg, #C7DFFF 15.55%, #FFFFFF 100%)',
                  boxShadow: '0 8px 24px rgba(0, 61, 143, 0.08)',
                }}
              >
                <Box
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#E4F3FF',
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                >
                  {stat.icon}
                </Box>
                <Text
                  fw={700}
                  fz={32}
                  c="#000000"
                  lh={1.2}
                  mb={8}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.value}
                </Text>
                <Text
                  fz={15}
                  c="#334155"
                  lh={1.4}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* IN ASSOCIATION WITH */}
        <Box
          py={48}
          my={60}
          style={{
            width: '100%',
            backgroundColor: '#F0F8FF',
            borderRadius: 24,
            textAlign: 'center',
          }}
        >
          <Image
            src="D:\iglobus-jobsetu-fe\dist\about\Telangana Government and TASK Logos.png"
            alt="In Association With Telangana & TASK"
            style={{
              maxWidth: '640px',
              width: '90%',
              margin: '0 auto',
              display: 'block',
            }}
          />
        </Box>
      </Box>

      <OTPmodal />
      <FooterSubscribe />
    </Box>
  );
}

export default AboutData;
