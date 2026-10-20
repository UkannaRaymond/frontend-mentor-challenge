import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/theme-components/providers";
import localFont from "next/font/local";

const notoSans = localFont({
  src: [
    {
      path: "./fonts/static/NotoSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/static/NotoSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/static/NotoSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Browser extensions manager UI",
  description: "",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${notoSans.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
