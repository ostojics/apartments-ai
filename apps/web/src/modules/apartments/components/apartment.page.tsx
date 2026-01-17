import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {apartmentMarkdownComponents} from '@/modules/apartments/components/markdown/markdown-components';
import {markdownContent} from '@/modules/apartments/components/markdown/markdown-content';

interface ApartmentPageProps {
  apartmentId: string;
}

export function ApartmentPage({apartmentId}: ApartmentPageProps) {
  const {t} = useTranslation();

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{t('apartment.title', {id: apartmentId})}</h1>
          </div>
        </div>

        <Tabs defaultValue="manual" className="gap-6">
          <TabsList className="w-full justify-start sm:w-fit">
            <TabsTrigger value="chat">{t('apartment.tabs.chat')}</TabsTrigger>
            <TabsTrigger value="manual">{t('apartment.tabs.manual')}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Empty className="bg-background">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MessageCircle />
                </EmptyMedia>
                <EmptyTitle>{t('apartment.chat.title')}</EmptyTitle>
                <EmptyDescription>{t('apartment.chat.description')}</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <p className="text-muted-foreground text-sm">{t('apartment.chat.note')}</p>
              </EmptyContent>
            </Empty>
          </TabsContent>

          <TabsContent value="manual">
            <div className="rounded-2xl border border-border/70 bg-background p-6 shadow-sm sm:p-8">
              <Markdown remarkPlugins={[remarkGfm]} components={apartmentMarkdownComponents}>
                {markdownContent}
              </Markdown>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
