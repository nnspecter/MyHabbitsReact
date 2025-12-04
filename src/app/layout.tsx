'use client'

import React, { ReactNode, useEffect } from 'react';

import "./globals.scss";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../api/queryCient';
import { axiosApi } from '../api/axiosApi';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
      axiosApi.get("/api/test/user") 
        .then(() => {
          if(pathname === "/login") router.push("/table")
        })
        .catch(() => {
          if(pathname !== "/login") router.push("/login")
        })
  }, [])
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
