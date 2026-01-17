import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';

export default function ApartmentChatTab() {
  const {t} = useTranslation();

  return (
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
  );
}
