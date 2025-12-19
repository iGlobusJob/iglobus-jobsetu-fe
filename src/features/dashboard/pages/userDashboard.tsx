import { Container } from '@mantine/core';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import About from '../components/common/about';
import { BannerSection } from '../components/common/banner';
import { Categories } from '../components/common/categories';
import { LogoShowcase } from '../components/common/companies';
import { FooterSubscribe } from '../components/common/footer';
import { Header } from '../components/common/header';
import Icons from '../components/common/icons';
import { JobListingsSection } from '../components/common/jobs';
import { TestimonialCarousel } from '../components/common/review';
import { ScrollToTop } from '../components/common/scrolltotop';
import { HowItWorks } from '../components/common/steps';
export const UserDashboard = () => {
  return (
    <>
      <Container size="xl">
        <Header />

        <BannerSection />

        <About />

        <Icons />

        <Categories />

        <JobListingsSection />

        <HowItWorks />

        <TestimonialCarousel />

        <LogoShowcase />

        <OTPmodal />

        <ScrollToTop />
      </Container>
      <FooterSubscribe />
    </>
  );
};
