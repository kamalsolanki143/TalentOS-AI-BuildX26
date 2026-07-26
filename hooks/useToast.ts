'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ToastMessage } from '@/components/ui/Toast';

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'neutral';

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

type ToastFunction = {
  (options: ToastOptions): string;
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
};

type ToastListener = (toasts: ToastMessage[]) => void;
let globalToasts: ToastMessage[] = [];
const listeners = new Set<ToastListener>();

function notifyListeners() {
  listeners.forEach((listener) => listener([...globalToasts]));
}

export function dismissGlobalToast(id: string) {
  globalToasts = globalToasts.filter((t) => t.id !== id);
  notifyListeners();
}

function addGlobalToast(options: ToastOptions) {
  const id = Math.random().toString(36).substring(2, 9);
  const variantMap: Record<string, ToastMessage['type']> = {
    success: 'success',
    error: 'error',
    warning: 'warning',
    info: 'info',
    neutral: 'info',
  };
  const type = variantMap[options.variant || 'info'] || 'info';

  const newToast: ToastMessage = {
    id,
    type,
    title: options.title,
    description: options.description,
    duration: options.duration || 4000,
  };

  globalToasts = [...globalToasts, newToast];
  notifyListeners();
  return id;
}

// Callable toast function
const toastFn = ((options: ToastOptions) => addGlobalToast(options)) as ToastFunction;

toastFn.success = (title: string, description?: string) =>
  addGlobalToast({ title, description, variant: 'success' });

toastFn.error = (title: string, description?: string) =>
  addGlobalToast({ title, description, variant: 'error' });

toastFn.info = (title: string, description?: string) =>
  addGlobalToast({ title, description, variant: 'info' });

toastFn.warning = (title: string, description?: string) =>
  addGlobalToast({ title, description, variant: 'warning' });

export { toastFn as toast };

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    setToasts([...globalToasts]);
    const listener: ToastListener = (updatedToasts) => {
      setToasts(updatedToasts);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    dismissGlobalToast(id);
  }, []);

  return {
    toasts,
    toast: toastFn,
    dismissToast,
  };
}
