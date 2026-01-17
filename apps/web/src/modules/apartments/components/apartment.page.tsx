import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {ApartmentManual} from '@/modules/apartments/components/apartment-manual';
import {PromotionsTab} from '@/modules/apartments/components/promotions-tab';

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
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 sm:h-9 sm:w-fit sm:flex-nowrap">
            <TabsTrigger value="chat">{t('apartment.tabs.chat')}</TabsTrigger>
            <TabsTrigger value="manual">{t('apartment.tabs.manual')}</TabsTrigger>
            <TabsTrigger value="promotions">{t('apartment.tabs.promotions')}</TabsTrigger>
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
            <ApartmentManual />
          </TabsContent>

          <TabsContent value="promotions">
            <PromotionsTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
