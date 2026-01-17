import {createFileRoute} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export const Route = createFileRoute('/_public/welcome')({
  component: WelcomeRoute,
});

function WelcomeRoute() {
  const {t} = useTranslation();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl">{t('public.greeting')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('public.welcomeDescription')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
