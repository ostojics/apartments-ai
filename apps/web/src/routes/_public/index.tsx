import {createFileRoute} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';

export const Route = createFileRoute('/_public/')({
  component: PublicIndexRoute,
  // beforeLoad: ({context}) => {
  //   if (!context.isAuthenticated) {
  //     // eslint-disable-next-line @typescript-eslint/only-throw-error
  //     throw redirect({to: '/'});
  //   }

  //   // eslint-disable-next-line @typescript-eslint/only-throw-error
  //   throw redirect({to: '/'});
  // },
});

function PublicIndexRoute() {
  const {t} = useTranslation();

  return <div>{t('public.greeting')}</div>;
}
