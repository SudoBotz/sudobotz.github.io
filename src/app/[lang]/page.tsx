import Link from 'next/link';
import { redirect } from 'next/navigation';
import { loadTranslations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Github, Box, Network, Terminal } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { CustomHeader } from '@/components/CustomHeader';
import { Metadata } from 'next';
import { getOGImagePath } from '@/lib/og-image-utils';

const validLanguages = ['en', 'fa'];

export async function generateStaticParams() {
  return validLanguages.map((lang) => ({
    lang: lang,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  // Validate if the lang parameter is a valid language
  if (!validLanguages.includes(lang)) {
    // Default to English if invalid language
    const translations = loadTranslations('en');
    return {
      metadataBase: new URL('https://gangbot.loserbot.ir'),
      title: translations.appName,
      description: translations.appDescription,
      icons: {
        icon: '/static/favicon.ico',
        shortcut: '/static/favicon.ico',
        apple: '/static/favicon.ico',
      },
      openGraph: {
        title: translations.appName,
        description: translations.appDescription,
        type: 'website',
        url: '/en',
        siteName: 'SudoBotz',
        images: [
          {
            url: getOGImagePath('en'),
            width: 1200,
            height: 630,
            alt: translations.appName,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: translations.appName,
        description: translations.appDescription,
        images: [getOGImagePath('en')],
      },
    };
  }
  
  const translations = loadTranslations(lang);
  
  return {
    metadataBase: new URL('https://gangbot.loserbot.ir'),
    title: translations.appName,
    description: translations.appDescription,
    icons: {
      icon: '/static/favicon.ico',
      shortcut: '/static/favicon.ico',
      apple: '/static/favicon.ico',
    },
    openGraph: {
      title: translations.appName,
      description: translations.appDescription,
      type: 'website',
      locale: lang,
      url: `/${lang}`,
      siteName: 'SudoBotz',
      images: [
        {
          url: getOGImagePath(lang),
          width: 1200,
          height: 630,
          alt: translations.appName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: translations.appName,
      description: translations.appDescription,
      images: [getOGImagePath(lang)],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'fa': '/fa',
      },
    },
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Validate if the lang parameter is a valid language
  if (!validLanguages.includes(lang)) {
    // Redirect to English if invalid language
    redirect('/fa');
  }
  
  const translations = loadTranslations(lang);
  const isRTL = ['fa', 'ar'].includes(lang);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header */}
      <CustomHeader lang={lang} isRTL={isRTL} translations={translations} />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <div className="flex py-12 sm:py-10 flex-col items-center justify-center min-h-screen px-4 text-center">
          {/* Version Badge */}
          <div className="mb-6">
            <Link 
              href="https://github.com/AmirKenzoo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors cursor-pointer">
                <ArrowRight className={`w-3 h-3 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {translations.version}
                <div className={`w-2 h-2 bg-primary rounded-full ${isRTL ? 'mr-2' : 'ml-2'}`}></div>
              </Badge>
            </Link>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-foreground">
            {translations.appName}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl leading-relaxed">
            {translations.appDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button asChild size="lg" className="px-8 py-3 text-lg font-semibold">
              <Link href={`/${lang}/introduction`}>
                {translations.documentation}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg font-semibold">
              <Link href="https://github.com/AmirKenzoo" target="_blank" rel="noopener noreferrer">
                <Github className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {translations.github}
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {/* Commands Card */}
            <Link href={`/${lang}/commands`} className="block">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Terminal className="w-8 h-8 text-primary" />
                    <ArrowRight className={`w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <CardTitle className="text-2xl">دستورات ربات</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    لیست کامل تمام دستورات ربات با توضیحات دقیق و نمونه‌های استفاده
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Gang Management Card */}
            <Link href={`/${lang}/commands/gang`} className="block">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Box className="w-8 h-8 text-primary" />
                    <ArrowRight className={`w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <CardTitle className="text-2xl">مدیریت گنگ</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    مدیریت اعضای گنگ، آمار و فعالیت‌های مربوط به گنگ
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            {/* Ticket Management Card */}
            <Link href={`/${lang}/commands/ticket`} className="block">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <Network className="w-8 h-8 text-primary" />
                    <ArrowRight className={`w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                  <CardTitle className="text-2xl">سیستم تیکت</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                  دستورات مدیریت و پیکربندی تیکت
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <Footer lang={lang} />
      </main>
    </div>
  );
}
