import React from 'react';
import PrivacyClient from '@/components/PrivacyClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy of PT INOVASI DIGITAL ASIA (Codevora) regarding information collection, security, and usage of client and visitor data.',
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
