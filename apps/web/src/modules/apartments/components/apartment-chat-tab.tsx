import {MessageCircle} from 'lucide-react';

import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from '@/components/ui/empty';

interface ApartmentChatTabProps {
  title: string;
  description: string;
  note: string;
}

export function ApartmentChatTab({title, description, note}: ApartmentChatTabProps) {
  return (
    <Empty className="bg-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircle />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <p className="text-muted-foreground text-sm">{note}</p>
      </EmptyContent>
    </Empty>
  );
}
