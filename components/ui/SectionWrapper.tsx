'use client';

import React from 'react';
import { Section, SectionProps } from './Section';

export const SectionWrapper: React.FC<SectionProps> = (props) => {
  return <Section {...props} />;
};
