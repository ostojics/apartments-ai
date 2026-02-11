import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';
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
      <header className="p-4 flex justify-between gap-2 items-center">
        <Button variant="outline" size="icon" className="rounded-lg" onClick={handleHomeClick}>
          <HomeIcon />
          <span className="sr-only">Language selection</span>
        </Button>
        <ThemeSwitcher />
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
