/* eslint-disable @typescript-eslint/only-throw-error */
import {Button} from '@/components/ui/button';
import {FeedbackButton} from '@/modules/feedback/components/feedback-button';
import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';
import {Show, UserButton} from '@clerk/react';
import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {HomeIcon} from 'lucide-react';
import {useTranslation} from 'react-i18next';

export const Route = createFileRoute('/__admin')({
  component: RouteComponent,
  beforeLoad: ({context}) => {
    if (!context.isSignedIn) {
      throw redirect({to: '/login'});
    }
  },
});

function RouteComponent() {
  const {t} = useTranslation();

  return (
    <section className="min-h-screen bg-secondary flex flex-col">
      <header className="p-4 flex gap-10 items-center justify-center">
        <Button variant="outline" size="icon" className="rounded-lg justify-self-start">
          <HomeIcon />
          <span className="sr-only">{t('layout.home')}</span>
        </Button>
        <div className="flex items-center justify-center">
          <FeedbackButton />
        </div>
        <div className="flex items-center justify-end">
          <ThemeSwitcher />
        </div>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <main className="flex flex-1 min-h-0 flex-col">
        <Outlet />
      </main>
      <footer className="mt-auto p-4 text-sm text-muted-foreground">
        <p className="text-center">
          {t('public.poweredBy')} <strong>HostElite</strong>
        </p>
      </footer>
    </section>
  );
}
