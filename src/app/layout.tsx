import './global.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Vazirmatn } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const vazirMatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazir',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gangbot.loserbot.ir'),
  title: {
    default: 'SudoBotz - Discord Gang Management Bot',
    template: '%s | SudoBotz Documentation'
  },
  description: 'SudoBotz is a powerful Discord bot designed specifically for gang and server management. Built with Python and discord.py, it provides comprehensive tools for gang administration, member tracking, and server moderation.',
  keywords: ['discord', 'bot', 'gang', 'management', 'server', 'moderation', 'python', 'discord.py'],
  authors: [{ name: 'SudoBotz Team' }],
  creator: 'SudoBotz',
  publisher: 'SudoBotz',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/static/favicon.ico',
    shortcut: '/static/favicon.ico',
    apple: '/static/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gangbot.loserbot.ir',
    siteName: 'SudoBotz',
    title: 'SudoBotz - Discord Gang Management Bot',
    description: 'SudoBotz is a powerful Discord bot designed specifically for gang and server management.',
    images: [
      {
        url: '/static/logo-dark.png',
        width: 1200,
        height: 630,
        alt: 'SudoBotz - Discord Gang Management Bot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SudoBotz - Discord Gang Management Bot',
    description: 'SudoBotz is a powerful Discord bot designed specifically for gang and server management.',
    images: ['/static/logo-dark.png'],
    creator: '@AmirKenzoo',
  },
  alternates: {
    canonical: 'https://gangbot.loserbot.ir',
    languages: {
      'en': '/en',
      'fa': '/fa',
    },
  },
};

export default function RootLayout({ 
  children 
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${inter.variable} ${vazirMatn.variable}`}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 
                               (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                  document.documentElement.style.colorScheme = theme;
                  document.documentElement.style.backgroundColor = theme === 'dark' ? 'hsl(240 2% 11%)' : 'hsl(240 5% 96%)';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${vazirMatn.variable}`}>
        {children}
      </body>
    </html>
  );
}
