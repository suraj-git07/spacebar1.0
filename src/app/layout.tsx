import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SpaceBar1.0",
  description: "A Decentralized Space Adventure Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThirdwebProvider>{children}</ThirdwebProvider>

      </body>
    </html>
  );
}
