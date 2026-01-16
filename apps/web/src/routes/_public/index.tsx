import {createFileRoute} from '@tanstack/react-router';

import {LanguageSelectionPage} from '@/modules/language-selection/components/language-selection.page';

export const Route = createFileRoute('/_public/')({
  component: PublicIndexRoute,
});

function PublicIndexRoute() {
  return <LanguageSelectionPage />;
}
