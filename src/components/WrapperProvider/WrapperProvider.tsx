"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/features/muiThemes/theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/entities/api/queryCient";


interface WrapperProviderProps {
  children: ReactNode;
}

export default function WrapperProvider({ children }: WrapperProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <div className="headerDirection">
          
          <div className="mobileCenter">
            {children}
          </div>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
