import { ReactNode } from "react";
import "@styles/globals.scss";
import WrapperProvider from "@/components/WrapperProvider/WrapperProvider";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <WrapperProvider>{children}</WrapperProvider>
      </body>
    </html>
  );
}
