import { readFileSync } from 'fs';
import { join } from 'path';

export interface Translations {
  appName: string;
  appDescription: string;
  version: string;
  documentation: string;
  github: string;
  introduction: {
    title: string;
    description: string;
  };
  wellcome: {
    title: string;
    description: string;
  };
  ticket: {
    title: string;
    description: string;
  };
  search: {
    placeholder: string;
    button: string;
    title: string;
    noResults: string;
    noResultsDescription: string;
    searching: string;
    instructions: string;
    shortcuts: {
      search: string;
      navigate: string;
      select: string;
    };
  };
}

export function loadTranslations(locale: string): Translations {
  try {
    const filePath = join(process.cwd(), 'public', 'locales', `${locale}.json`);
    const fileContents = readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.warn(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English
    return {
      appName: 'SudoBotz',
      appDescription: 'Censorship-resistant GUI integrated solution',
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
  }
}
