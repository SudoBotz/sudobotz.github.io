'use client';

import { useParams } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';
import { type Locale, type Translations } from './server-i18n';

// Cache for client-side translations
const clientTranslationsCache = new Map<Locale, Translations>();

/**
 * Custom hook for client-side translations in the app directory
 */
export function useTranslations(): { t: (key: string) => string; locale: string } {
  const params = useParams();
  const locale = (params?.lang as Locale) || 'en';
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      // Return cached translations if available
      if (clientTranslationsCache.has(locale)) {
        setTranslations(clientTranslationsCache.get(locale)!);
        return;
      }

      try {
        // Load translations dynamically
        const translationsModule = await import(`../../public/locales/${locale}.json`);
        const translationsData = translationsModule.default;
        
        clientTranslationsCache.set(locale, translationsData);
        setTranslations(translationsData);
      } catch (error) {
        console.error(`Failed to load translations for locale: ${locale}`, error);
        
        // Fallback to English if the requested locale fails
        if (locale !== 'en') {
          try {
            const fallbackModule = await import(`../../public/locales/en.json`);
            const fallbackData = fallbackModule.default;
            clientTranslationsCache.set(locale, fallbackData);
            setTranslations(fallbackData);
          } catch (fallbackError) {
            console.error('Failed to load fallback translations', fallbackError);
            // Use hardcoded fallback
            const fallbackTranslations: Translations = {
              appName: 'SudoBotz',
              appDescription: 'SudoBotz is a powerful Discord bot designed specifically for gang and server management.',
              version: 'V1 First Version',
              documentation: 'Documentation',
              github: 'GitHub',
              introduction: {
                title: 'introduction',
                description: 'A powerful and dedicated bot for professional management of Gangside servers'
              },
              wellcome: {
                title: 'Welcome system',
                description: 'Instructions and commands related to setting the welcome message for new members + ready examples'
              },
              ticket: {
                title: 'ticket system',
                description: 'Commands related to the ticket system + ready examples'
              },
              search: {
                placeholder: 'Search documentation...',
                button: 'Search',
                title: 'Search Documentation',
                noResults: 'No results found',
                noResultsDescription: 'Try a different search term',
                searching: 'Searching...',
                instructions: 'Type to search across all pages',
                shortcuts: {
                  search: 'to search',
                  navigate: 'to navigate',
                  select: 'to select'
                }
              }
            };
            setTranslations(fallbackTranslations);
          }
        } else {
          // Use hardcoded fallback for English
          const fallbackTranslations: Translations = {
            appName: 'SudoBotz',
            appDescription: 'SudoBotz is a powerful Discord bot designed specifically for gang and server management.',
            version: 'V1 First Version',
            documentation: 'Documentation',
            github: 'GitHub',
            introduction: {
              title: 'introductionn',
              description: 'A powerful and dedicated bot for professional management of Gangside servers'
            },
            wellcome: {
              title: 'Welcome system',
              description: 'Instructions and commands related to setting the welcome message for new members + ready examples'
            },
            ticket: {
              title: 'ticket system',
              description: 'Commands related to the ticket system + ready examples'
            },
            search: {
              placeholder: 'Search documentation...',
              button: 'Search',
              title: 'Search Documentation',
              noResults: 'No results found',
              noResultsDescription: 'Try a different search term',
              searching: 'Searching...',
              instructions: 'Type to search across all pages',
              shortcuts: {
                search: 'to search',
                navigate: 'to navigate',
                select: 'to select'
              }
            }
          };
          setTranslations(fallbackTranslations);
        }
      }
    };

    loadTranslations();
  }, [locale]);

  const t = (key: string): string => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    
    return (typeof value === 'string' ? value : key);
  };

  return { t, locale };
}
