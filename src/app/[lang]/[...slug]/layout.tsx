import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { CompactControls } from '@/components/CompactControls';
import { CustomSearch } from '@/components/CustomSearch';

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Get the page tree for the specific language
  const tree = source.pageTree[lang] || source.pageTree['en'];

  return (
    <DocsLayout
      tree={tree}
      {...baseOptions(lang)}
      searchToggle={{
        enabled: true,
        components: {
          sm: <CustomSearch isMobile locale={lang} />,
          lg: <CustomSearch locale={lang} />
        }
      }}
      sidebar={{
        footer: (
          <div className="flex flex-col gap-3 w-full p-2 sm:p-3">
            {/* Controls - Always visible, responsive design */}
            <CompactControls />
          </div>
        ),
      }}
    >
  { children }
    </DocsLayout >
  );
}