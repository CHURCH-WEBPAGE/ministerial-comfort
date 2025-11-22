import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ministerial Comfort and Renewal (MCR)",
  description: "Restoring Hope and Renewal for Ministers",
  icons: {
    icon: "/assets/MCR logo 2.svg",
    shortcut: "/assets/MCR logo 2.svg",
    apple: "/assets/MCR logo 2.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

