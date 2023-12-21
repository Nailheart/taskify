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
  icons: {
    icon: [
      {
        url: "favicon/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "favicon/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: {
      url: "favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    other: [
      {
        rel: "mask-icon",
        url: "favicon/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "favicon/site.webmanifest",
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
