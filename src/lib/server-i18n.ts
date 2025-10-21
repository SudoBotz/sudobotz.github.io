export type Locale = 'en' | 'fa';

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
  }
}
