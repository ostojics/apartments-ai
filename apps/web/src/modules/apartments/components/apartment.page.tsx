import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';

interface ApartmentPageProps {
  apartmentId: string;
}

export function ApartmentPage({apartmentId}: ApartmentPageProps) {
  const {t} = useTranslation();
  const communityName = t('apartment.overview.communityValue');

  const overviewItems = [
    {label: t('apartment.overview.communityLabel'), value: communityName},
    {label: t('apartment.overview.addressLabel'), value: t('apartment.overview.addressValue')},
    {label: t('apartment.overview.officeLabel'), value: t('apartment.overview.officeValue')},
    {label: t('apartment.overview.floorPlansLabel'), value: t('apartment.overview.floorPlansValue')},
  ];

  const policies = [t('apartment.policies.quiet'), t('apartment.policies.smoke'), t('apartment.policies.guests')];

  const officeHours = [
    t('apartment.officeHours.weekday'),
    t('apartment.officeHours.saturday'),
    t('apartment.officeHours.sunday'),
  ];

  const contacts = [
    {label: t('apartment.contact.phoneLabel'), value: t('apartment.contact.phoneValue')},
    {label: t('apartment.contact.emailLabel'), value: t('apartment.contact.emailValue')},
  ];

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{t('apartment.title', {id: apartmentId})}</h1>
            <p className="text-muted-foreground max-w-2xl text-sm/relaxed">
              {t('apartment.subtitle', {community: communityName})}
            </p>
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
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('apartment.cards.overview')}</CardTitle>
                    <CardDescription>{t('apartment.overview.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 text-sm">
                    {overviewItems.map((item) => (
                      <div key={item.label} className="grid gap-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('apartment.cards.policies')}</CardTitle>
                    <CardDescription>{t('apartment.policies.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 text-sm">
                    {policies.map((item) => (
                      <div key={item} className="rounded-md border bg-muted/40 px-3 py-2">
                        {item}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('apartment.cards.officeHours')}</CardTitle>
                    <CardDescription>{t('apartment.officeHours.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2 text-sm">
                    {officeHours.map((item) => (
                      <span key={item} className="font-medium">
                        {item}
                      </span>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('apartment.cards.contact')}</CardTitle>
                    <CardDescription>{t('apartment.contact.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 text-sm">
                    {contacts.map((item) => (
                      <div key={item.label} className="grid gap-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
