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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white antialiased">
        {children}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          limit={5}
          toastClassName="rounded-lg shadow-md"
          style={{ zIndex: 99999 }}
        />
      </body>
    </html>
  );
}

