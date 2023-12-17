import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { TanstackQueryProvider } from "@/components/tanstack-query-provider/tanstack-query-provider";
import { inter } from "@/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Taskify",
    template: "Taskify | %s",
  },
  description: "Task manager to keep track of your goals",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TanstackQueryProvider>
            {children}
            <Toaster richColors />
          </TanstackQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
