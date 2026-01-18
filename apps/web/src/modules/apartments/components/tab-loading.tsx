import {Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription} from '@/components/ui/empty';
import {Spinner} from '@/components/ui/spinner';

interface TabLoadingStateProps {
  title: string;
  description: string;
  ariaLabel: string;
}

export function TabLoadingState({title, description, ariaLabel}: TabLoadingStateProps) {
  return (
    <Empty className="bg-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner className="size-6" aria-label={ariaLabel} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
