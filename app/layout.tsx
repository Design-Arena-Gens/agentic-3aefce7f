import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تحليل الأسواق المالية",
  description: "منصة تحليل الأسهم والفوركس والعملات والذهب بالذكاء الاصطناعي",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
