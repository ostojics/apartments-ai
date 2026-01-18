import {useTranslation} from 'react-i18next';

import {useFormField} from '@/components/ui/form';
import {cn} from '@/lib/utils/cn';

export function FormError({className}: {className?: string}) {
  const {t} = useTranslation();
  const {error, formMessageId} = useFormField();

  if (!error?.message) {
    return null;
  }

  return (
    <p id={formMessageId} role="alert" className={cn('text-destructive text-sm', className)}>
      {t(String(error.message))}
    </p>
  );
}
