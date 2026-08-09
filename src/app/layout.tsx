import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import NavigationWrapper from "@/components/NavigationWrapper";
import { PortfolioProvider } from "@/context/PortfolioContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://geraldev.vercel.app"),
  title: {
    default: "Geraldine Firdaus — Back-End Developer",
    template: "%s | Geraldine Firdaus",
  },
  description:
    "Portofolio resmi Geraldine Firdaus, seorang Back-End & Full-Stack Developer dengan pengalaman membangun aplikasi web dan mobile menggunakan PHP (Laravel, CodeIgniter), Node.js (Express, TypeScript), Golang (Fiber), dan Android (Kotlin, Java).",
  keywords: [
    "Geraldine Firdaus",
    "Back-End Developer",
    "Full-Stack Developer",
    "Node.js Developer",
    "Express.js",
    "Golang Developer",
    "Fiber Framework",
    "PHP Developer",
    "Laravel",
    "CodeIgniter",
    "Android Developer",
    "Kotlin",
    "TypeScript Engineer",
    "PostgreSQL",
    "MySQL",
    "Portfolio Back-End",
  ],
  authors: [{ name: "Geraldine Firdaus", url: "https://github.com/geraldz99" }],
  creator: "Geraldine Firdaus",
  publisher: "Geraldine Firdaus",
  icons: {
    icon: "/projects/logo-new.svg",
    shortcut: "/projects/logo-new.svg",
    apple: "/projects/logo-new.svg",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://github.com/geraldz99",
    siteName: "Geraldine Firdaus — Back-End Developer Portfolio",
    title: "Geraldine Firdaus — Back-End Developer",
    description:
      "Portofolio resmi Geraldine Firdaus. Spesialis Back-End & Full-Stack Development (Node.js, Golang, PHP, Android, PostgreSQL & MySQL).",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Geraldine Firdaus — Back-End Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Geraldine Firdaus — Back-End Developer",
    description:
      "Portofolio resmi Geraldine Firdaus. Spesialis Back-End & Full-Stack Development (Node.js, Golang, PHP, Android, PostgreSQL & MySQL).",
    images: ["/opengraph-image"],
    creator: "@geraldz99",
  },
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
  category: "Technology",
};

import { ThemeProvider } from "@/context/ThemeContext";
import DynamicFavicon from "@/components/DynamicFavicon";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved ? saved === 'dark' : true;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} ${poppins.className} antialiased bg-[var(--bg-main)] text-[var(--text-main)] relative selection:bg-[var(--accent)] selection:text-white transition-colors duration-300`}
      >
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
        <div className="ambient-blob-3" />
        <ThemeProvider>
          <PortfolioProvider>
            <DynamicFavicon />
            <LenisProvider>
              {/* <Preloader /> */}
              <NavigationWrapper>{children}</NavigationWrapper>
            </LenisProvider>
          </PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
