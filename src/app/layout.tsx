import type { Metadata } from "next";
import { Inter, Rethink_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const rethink = Rethink_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Lucas Thomassin",
  description: "Portfolio de Lucas Thomassin : photo, vidéo & création numérique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} ${rethink.className} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
