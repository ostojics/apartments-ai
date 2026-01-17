import {Suspense, lazy} from 'react';
import {useTranslation} from 'react-i18next';
import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';
import {Spinner} from '@/components/ui/spinner';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
const ChatTab = lazy(() => import('./apartment-chat-tab'));
const ManualTab = lazy(() => import('./apartment-manual-tab'));

interface TabLoadingStateProps {
  title: string;
  description: string;
  ariaLabel: string;
}

function TabLoadingState({title, description, ariaLabel}: TabLoadingStateProps) {
  return (
    <Empty className="bg-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner className="size-6" aria-label={ariaLabel} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

interface ApartmentPageProps {
  apartmentId: string;
}

export function ApartmentPage({apartmentId}: ApartmentPageProps) {
  const {t} = useTranslation();
  const chatTabLabel = t('apartment.tabs.chat');
  const manualTabLabel = t('apartment.tabs.manual');
  const loadingLabel = t('apartment.loading.label');
  const chatLoadingTitle = t('apartment.loading.title', {tab: chatTabLabel});
  const chatLoadingDescription = t('apartment.loading.description', {tab: chatTabLabel});
  const manualLoadingTitle = t('apartment.loading.title', {tab: manualTabLabel});
  const manualLoadingDescription = t('apartment.loading.description', {tab: manualTabLabel});

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
            <TabsTrigger value="chat">{chatTabLabel}</TabsTrigger>
            <TabsTrigger value="manual">{manualTabLabel}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Suspense
              fallback={
                <TabLoadingState
                  ariaLabel={loadingLabel}
                  title={chatLoadingTitle}
                  description={chatLoadingDescription}
                />
              }
            >
              <ChatTab />
            </Suspense>
          </TabsContent>

          <TabsContent value="manual">
            <Suspense
              fallback={
                <TabLoadingState
                  ariaLabel={loadingLabel}
                  title={manualLoadingTitle}
                  description={manualLoadingDescription}
                />
              }
            >
              <ManualTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
