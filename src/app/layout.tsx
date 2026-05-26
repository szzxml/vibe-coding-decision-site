import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Coding 决策向导",
  description: "从想法到开发落地的路线决策工具"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
