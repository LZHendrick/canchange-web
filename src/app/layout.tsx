import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://canchange-web.vercel.app'),
  title: "CanChange 灿橙 - 雇佣你的第一支 AI 自动化团队",
  description: "基于 Apple 硬件的私有化数字员工解决方案。内置 4 位 24 小时在线的 AI 高管（CGO/CHO/COO/CLO），从获客到合规，全流程自动化运营。",
  keywords: ["AI 数字员工", "企业自动化", "Apple Silicon", "私有化部署", "AI 销售", "AI 运营", "CanChange", "灿橙"],
  authors: [{ name: "CanChange 灿橙" }],
  creator: "CanChange 灿橙",
  publisher: "CanChange 灿橙",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://canchange.ai",
    siteName: "CanChange 灿橙",
    title: "CanChange 灿橙 - 雇佣你的第一支 AI 自动化团队",
    description: "基于 Apple 硬件的私有化数字员工解决方案。内置 4 位 24 小时在线的 AI 高管，从获客到合规，全流程自动化运营。",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CanChange 灿橙 - AI 数字员工",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanChange 灿橙 - 雇佣你的第一支 AI 自动化团队",
    description: "基于 Apple 硬件的私有化数字员工解决方案",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://canchange.ai",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
