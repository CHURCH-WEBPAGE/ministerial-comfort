import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Ministerial Comfort and Renewal (MCR)",
  description: "Restoring Hope and Renewal for Ministers",
  icons: {
    icon: "/assets/MCR logo 2.svg",
    shortcut: "/assets/MCR logo 2.svg",
    apple: "/assets/MCR logo 2.svg",
  },
  other: {
    'preload-hero': '/assets/hero2.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/hero2.jpg" fetchPriority="high" />
      </head>
      <body>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}

