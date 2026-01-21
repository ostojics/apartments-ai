import {lazy, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useParams} from '@tanstack/react-router';
import {TabLoadingState} from './tab-loading';
const ApartmentChatTab = lazy(() => import('./apartment-chat-tab'));
const ApartmentManualTab = lazy(() => import('./apartment-manual-tab'));
const ApartmentsPromotionsTab = lazy(() => import('./promotions-tab'));

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
  const promotionsTabLabel = t('apartment.tabs.promotions');
  const promotionsLoadingTitle = t('apartment.loading.title', {tab: promotionsTabLabel});
  const promotionsLoadingDescription = t('apartment.loading.description', {tab: promotionsTabLabel});

  return (
    <section className="bg-secondary/40 flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-8 px-0 pt-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-3xl font-semibold tracking-tight">{t('apartment.title', {id: apartmentId})}</h1>
          </div>
        </div>

        <Tabs defaultValue="chat" className="flex flex-1 min-h-0 flex-col gap-6">
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 sm:h-9 sm:w-fit sm:flex-nowrap">
            <TabsTrigger value="chat">{t('apartment.tabs.chat')}</TabsTrigger>
            <TabsTrigger value="manual">{t('apartment.tabs.manual')}</TabsTrigger>
            <TabsTrigger value="promotions">{t('apartment.tabs.promotions')}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex flex-1 min-h-0 flex-col">
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

          <TabsContent value="promotions">
            <Suspense
              fallback={
                <TabLoadingState
                  ariaLabel={loadingLabel}
                  title={promotionsLoadingTitle}
                  description={promotionsLoadingDescription}
                />
              }
            >
              <ApartmentsPromotionsTab />
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
