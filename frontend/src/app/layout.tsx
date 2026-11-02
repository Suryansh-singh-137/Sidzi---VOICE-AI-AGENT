import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sidzi — AI Clinic Receptionist | Maple Grove Family Clinic",
  description: "A receptionist that never puts patients on hold. Meet Sidzi, your clinic's AI receptionist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,300..600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#FFF9F8] text-[#29212B] selection:bg-[#F8DCE8] selection:text-[#29212B]">
        {children}
      </body>
    </html>
  );
}
