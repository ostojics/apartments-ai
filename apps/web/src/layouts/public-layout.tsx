import {ReactNode} from 'react';

import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({children}: PublicLayoutProps) {
  return (
    <section className="min-h-screen bg-secondary flex flex-col">
      <header className="p-4 flex justify-end">
        <ThemeSwitcher />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mt-auto p-4 text-sm text-muted-foreground">
        <p className="text-center">
          Powered by <strong>Apartments AI</strong>
        </p>
      </footer>
    </section>
  );
}
