import { RootProvider } from 'fumadocs-ui/provider';
import { NextProvider } from 'fumadocs-core/framework/next';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter } from 'next/font/google';
import { Vazirmatn } from 'next/font/google';
import { i18n } from '@/lib/i18n';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const vazirMatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  variable: '--font-vazir',
});

export default async function LangLayout({ 
  children, 
  params 
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // Determine if the locale is RTL
  const isRTL = ['fa', 'ar'].includes(lang);
  
  return (
    <div 
      lang={lang} 
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${vazirMatn.variable} ${isRTL ? 'font-vazir' : 'font-inter'}`}
    >
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider>
          <NextProvider>
            <RootProvider i18n={{ ...i18n, locale: lang }}>
              {children}
            </RootProvider>
          </NextProvider>
        </ThemeProvider>
      </NextThemeProvider>
    </div>
  );
}
