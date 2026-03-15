import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';
import {FeedbackButton} from '@/modules/feedback/components/feedback-button';
import {Button} from '@/components/ui/button';
import {HomeIcon} from 'lucide-react';
import {useNavigate} from '@tanstack/react-router';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({children}: PublicLayoutProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    void navigate({to: '/'});
  };

  return (
    <section className="min-h-screen bg-secondary flex flex-col">
      <header className="p-4 flex gap-10 items-center justify-center">
        <Button variant="outline" size="icon" className="rounded-lg justify-self-start" onClick={handleHomeClick}>
          <HomeIcon />
          <span className="sr-only">{t('layout.home')}</span>
        </Button>
        <div className="flex items-center justify-center">
          <FeedbackButton />
        </div>
        <div className="flex items-center justify-end">
          <ThemeSwitcher />
        </div>
      </header>
      <main className="flex flex-1 min-h-0 flex-col">{children}</main>
      <footer className="mt-auto p-4 text-sm text-muted-foreground">
        <p className="text-center">
          {t('public.poweredBy')} <strong>HostElite</strong>
        </p>
      </footer>
    </section>
  );
}
