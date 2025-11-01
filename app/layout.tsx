import "@/styles/global.css";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const interFont = Inter({
  weight: ["200","300","400","500","600","700","800"],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "WaitList - The Loupe Collective",
  description: "To manage the waitlist from The Loupe Collective Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={interFont.className}>
          <Toaster richColors position="top-center" />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
