'use client';

import React from 'react';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from './Toast';

export const Toaster: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  return <ToastContainer toasts={toasts} onDismiss={dismissToast} />;
};
