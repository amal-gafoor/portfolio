import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import { site } from "@/content/site";
import "./globals.css";


export const metadata: Metadata = {
  title: `${site.name} — AI Engineer`,
  description: site.headline,
  openGraph: {
    title: `${site.name} — AI Engineer`,
    description: site.headline,
    type: "website",
    images: ["/avatar.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <body className="bg-grain min-h-full">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="bg-glow" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
