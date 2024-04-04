import "@/styles/globals.css";
import { Providers } from "@/redux/Provider";
import { poppins, rabar } from "@/lib/fonts";
import Script from "next/script";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="google" content="notranslate" />
      </head>

      <body
        suppressHydrationWarning={true}
        className={`w-svw min-h-svh ${rabar.variable} ${poppins.variable}`}
      >
        {/* GOOGLE ANALYTICS */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          strategy="afterInteractive"
        />
        <Script strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
          });
        `}</Script>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}


export const metadata = {
  metadataBase: new URL('https://morinamenu.com'),
  title: "Morina Menu",
  description: "Powered By Morina Company",
  creator: "Morina Company",
  applicationName: "Morina Menu",
  manifest: "/manifest.json",
  keywords: ["Morina", "Morina Menu", "Morina Company"],
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ku",
    url: "https://morinamenu.com/",
    siteName: "Morina Menu",
    images: [
      {
        url: "/morina.svg",
        width: 1200,
        height: 1200,
        alt: "Morina Logo",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#1d1d1d",
  height: "device-height",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  userScalable: false,
};