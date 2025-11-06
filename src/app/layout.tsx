'use client'

import React, { ReactNode } from 'react';

import "./globals.scss";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../api/queryCient';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <QueryClientProvider client={queryClient}>
        <body>
              {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
