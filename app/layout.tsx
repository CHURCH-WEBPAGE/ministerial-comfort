import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DEFAULT_OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  getMetadataBase,
  getSiteUrl,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'MCR',
    'Ministerial Comfort and Renewal',
    'Foursquare Gospel Church Nigeria',
    'minister support',
    'pastoral care',
    'spiritual renewal',
  ],
  authors: [{ name: SITE_NAME, url: getSiteUrl() }],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}, share preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
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
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={5}
          toastClassName="rounded-lg shadow-md"
          style={{ zIndex: 99999 }}
        />
      </body>
    </html>
  );
}
