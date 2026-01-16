import {ReactNode} from 'react';

import {MailIcon} from 'lucide-react';
import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';
import {Button} from '@/components/ui/button';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({children}: PublicLayoutProps) {
  return (
    <section className="bg-secondary">
      <header>
        <div className="p-4">
          <ThemeSwitcher />
        </div>
      </header>
      <main>{children}</main>
      <Button>Hello</Button>
      <footer>
        <MailIcon />
        <a href="mailto:contact@foredeck.com">contact@foredeck.com</a>
      </footer>
    </section>
  );
}
