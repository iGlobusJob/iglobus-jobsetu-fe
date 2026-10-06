import React from 'react';

import { OTPmodal } from '@/features/auth/components/modal/otpModal';

import { AboutUdyog } from '../components/common/aboutUdyog';
import { BannerSection } from '../components/common/banner';
import { Categories } from '../components/common/categories';
import { LogoShowcase } from '../components/common/companies';
import ContactUsSection from '../components/common/contact';
import { FooterSubscribe } from '../components/common/footer';
import { Header } from '../components/common/header';
import { JobListingsSection } from '../components/common/jobs';
import { TestimonialCarousel } from '../components/common/review';
import { ScrollToTop } from '../components/common/scrolltotop';
import { HowItWorks } from '../components/common/steps';

import { ScrollToHash } from './scroll';

export const UserDashboard: React.FC = () => {
  return (
    <div
      style={{ backgroundColor: '#FFFFFF', width: '100%', overflowX: 'hidden' }}
    >
      <Header />
      <BannerSection />
      <LogoShowcase />
      <AboutUdyog />
      <HowItWorks />
      <Categories />
      <JobListingsSection />
      <TestimonialCarousel />
      <ContactUsSection />
      <FooterSubscribe />

      <ScrollToHash />
      <OTPmodal />
      <ScrollToTop />
    </div>
  );
};

export default UserDashboard;
