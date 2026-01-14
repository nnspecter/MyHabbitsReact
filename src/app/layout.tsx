'use client'

import { ReactNode, useEffect } from 'react';
import "./globals.scss";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api/queryCient';
import { axiosApi } from '@/api/axiosApi';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material';
import { theme } from '@/features/muiThemes/theme';
import Header from '@/components/Header/Header';

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

    const hideHeaderPaths = ["/dashboard", "/settings", "/table", "/analytics"];
    const showHeader = hideHeaderPaths.includes(pathname);
  return (
    <html lang="ru">
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <body>
            <div className='headerDirection'>
              {showHeader && <Header/>}
              <div className='mobileCenter'>
                {children}
              </div>
            </div>
          </body>
        </QueryClientProvider>
      </ThemeProvider>
    </html>
  );
}
