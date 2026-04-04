import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "عيادة د. خالد شرف لطب الأسنان | أفضل عيادة أسنان في القاهرة",
  description: "عيادة د. خالد شرف متخصصة في علاج وتجميل الأسنان في القاهرة. احجز موعدك الآن عبر الموقع أو اتصل على 01008080358.",
  keywords: "عيادة أسنان, طب أسنان, تجميل أسنان, القاهرة, د خالد شرف",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="ltr" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="bg-white text-slate-900 antialiased font-sans">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
