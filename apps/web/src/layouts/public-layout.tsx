import {ReactNode} from 'react';

import {MailIcon} from 'lucide-react';
import {ThemeSwitcher} from '@/modules/theme/components/theme-switcher';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({children}: PublicLayoutProps) {
  return (
    <div>
      <header>
        <div>
          <ThemeSwitcher />
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <MailIcon />
        <a href="mailto:contact@foredeck.com">contact@foredeck.com</a>
      </footer>
    </div>
  );
}
