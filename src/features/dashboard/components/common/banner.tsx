import {
  Box,
  Button,
  Container,
  Grid,
  Image,
  rem,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconBriefcase, IconMapPin, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

import { useSystemTheme } from '@/hooks/useSystemTheme';

// Countries data
const countries = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cape Verde' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Laos' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MK', label: 'Macedonia' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MX', label: 'Mexico' },
  { value: 'MD', label: 'Moldova' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestine' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russian Federation' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'KN', label: 'Saint Kitts and Nevis' },
  { value: 'LC', label: 'Saint Lucia' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syrian Arab Republic' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Viet Nam' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
];

export const BannerSection = () => {
  const systemTheme = useSystemTheme();
  const isDark = systemTheme === 'dark';
  const theme = useMantineTheme();

  const [formData, setFormData] = useState<{
    jobTitle: string;
    location: string | null;
  }>({
    jobTitle: '',
    location: '',
  });

  // Dynamic colors based on theme

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    alert(
      `Searching for: ${formData.jobTitle} in ${formData.location || 'All Locations'}`
    );
  };

  return (
    <>
      {/* Hero Section */}
      <Box
        component="section"
        style={{
          padding: `${rem(80)} 0 ${rem(120)} 0`,
          position: 'relative',
          transition: 'background 0.3s ease',
        }}
      >
        <Container size="xl" component="section">
          <Grid align="center" gutter={{ base: 'xl', md: 60 }}>
            {/* Left Content */}
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Stack gap="xl" mb="xl">
                {/* Subtitle */}
                <Text
                  size="sm"
                  fw={600}
                  tt="uppercase"
                  style={{ letterSpacing: '0.5px' }}
                >
                  We have 150,000+ live jobs
                </Text>

                {/* Main Title */}
                <Title
                  order={1}
                  fw={600}
                  style={{
                    lineHeight: 1.2,
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    textAlign: 'center',
                  }}
                >
                  Find your dream job with{' '}
                  <Text
                    component="span"
                    fw={700}
                    variant="gradient"
                    gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                    inherit
                  >
                    JobSetu
                  </Text>
                </Title>

                {/* Lead Text */}
                <Text size="lg" style={{ maxWidth: '90%' }}>
                  Find jobs, create trackable resumes and enrich your
                  applications. Carefully crafted after analyzing the needs of
                  different industries.
                </Text>
              </Stack>

              {/* Search Form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                style={{
                  borderRadius: theme.radius.md,
                  padding: rem(8),
                  boxShadow: isDark
                    ? '0 10px 40px rgba(0, 0, 0, 0.3)'
                    : '0 10px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Grid gutter="xs">
                  {/* Job Title Input */}
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <TextInput
                      placeholder="Job, Company name..."
                      value={formData.jobTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, jobTitle: e.target.value })
                      }
                      leftSection={<IconBriefcase size={18} />}
                      styles={{
                        input: {
                          border: 'none',
                          backgroundColor: 'transparent',
                          height: rem(50),
                          fontSize: rem(15),
                        },
                      }}
                    />
                  </Grid.Col>

                  {/* Location Select */}
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Select
                      placeholder="Select Location"
                      data={countries}
                      value={formData.location}
                      onChange={(value) =>
                        setFormData({ ...formData, location: value })
                      }
                      leftSection={<IconMapPin size={18} />}
                      searchable
                      clearable
                      styles={{
                        input: {
                          border: 'none',
                          backgroundColor: 'transparent',
                          height: rem(50),
                          fontSize: rem(15),
                        },
                      }}
                    />
                  </Grid.Col>

                  {/* Submit Button */}
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Button
                      type="submit"
                      fullWidth
                      size="lg"
                      leftSection={<IconSearch size={18} />}
                      gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                      variant="gradient"
                      style={{ height: rem(50) }}
                    >
                      Find Job
                    </Button>
                  </Grid.Col>
                </Grid>
              </Box>
            </Grid.Col>

            {/* Right Image */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Box
                style={{
                  textAlign: 'center',
                  animation: 'float 3s ease-in-out infinite',
                }}
              >
                <Image
                  src="/process-02.png"
                  alt="Find your dream job"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    filter: isDark ? 'brightness(0.9)' : 'none',
                  }}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Add floating animation */}
        <style>
          {`
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
          `}
        </style>
      </Box>

      {/* Wave Shape Divider */}
      <Box
        style={{
          position: 'relative',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{
            display: 'block',
            width: '100%',
            height: rem(150),
            transform: 'rotate(180deg)',
          }}
        >
          <defs>
            <mask id="waveMask">
              <rect width="1440" height="250" fill="#ffffff" />
            </mask>
          </defs>
          <g mask="url(#waveMask)" fill="none">
            <path
              d="M 0,213 C 288,186.4 1152,106.6 1440,80L1440 250L0 250z"
              style={{ transition: 'fill 0.3s ease' }}
            />
          </g>
        </svg>
      </Box>
    </>
  );
};
