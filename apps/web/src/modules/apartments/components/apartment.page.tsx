import {lazy, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useParams} from '@tanstack/react-router';
import {TabLoadingState} from './tab-loading';
const ApartmentChatTab = lazy(() => import('./apartment-chat-tab'));
const ApartmentManualTab = lazy(() => import('./apartment-manual-tab'));

export function ApartmentPage() {
  const {t} = useTranslation();
  const {apartmentId} = useParams({from: '/_public/apartments/$apartmentId'});
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

        <Tabs defaultValue="chat" className="gap-6">
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
              <ApartmentChatTab />
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
              <ApartmentManualTab />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
