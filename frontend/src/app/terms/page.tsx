import React from 'react';
import TermsClient from '@/components/TermsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions of Service for PT INOVASI DIGITAL ASIA (Codevora) detailing software development, client agreements, and SLAs.',
};

export default function TermsOfServicePage() {
  return <TermsClient />;
}
