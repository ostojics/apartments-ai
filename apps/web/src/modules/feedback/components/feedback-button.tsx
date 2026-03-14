import {MessageSquareMore} from 'lucide-react';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';

import {FeedbackDialog} from './feedback-dialog';

export function FeedbackButton() {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg"
        aria-label={t('feedback.button')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquareMore />
        <span className="sr-only">{t('feedback.button')}</span>
      </Button>

      <FeedbackDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
