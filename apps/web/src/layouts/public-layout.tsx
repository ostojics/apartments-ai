import {ReactNode} from 'react';
import {useTranslation} from 'react-i18next';

import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({children}: PublicLayoutProps) {
  const {t} = useTranslation();

  return (
    <section className="min-h-screen bg-secondary flex flex-col">
      <header className="p-4 flex justify-end gap-2 items-center">
        <ThemeSwitcher />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-auto p-4 text-sm text-muted-foreground">
        <p className="text-center">
          {t('public.poweredBy')} <strong>Apartments AI</strong>
        </p>
      </footer>
    </section>
  );
}
