import {useTranslation} from 'react-i18next';
import {toast} from 'sonner';

import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Spinner} from '@/components/ui/spinner';
import {FormError} from '@/components/form-error';

import {useFeedbackForm} from '../hooks/use-feedback-form';
import {useFeedbackMutation} from '../hooks/use-feedback-mutation';
import {useEffect} from 'react';

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_MESSAGE_LENGTH = 1000;

export function FeedbackDialog({open, onOpenChange}: FeedbackDialogProps) {
  const {t} = useTranslation();
  const feedbackMutation = useFeedbackMutation();
  const form = useFeedbackForm();

  const message = form.watch('message');
  const messageLength = message.length;

  const handleSubmit = form.handleSubmit(async (values) => {
    await feedbackMutation.mutateAsync(values, {
      onSuccess: () => {
        toast.success(t('feedback.toasts.success'));
        form.reset();
        onOpenChange(false);
      },
      onError: () => {
        toast.error(t('feedback.toasts.error'));
      },
    });
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="feedback-dialog-description" className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{t('feedback.title')}</DialogTitle>
          <DialogDescription id="feedback-dialog-description" className="my-4">
            {t('feedback.description')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('feedback.form.emailLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('feedback.form.emailPlaceholder')} type="email" {...field} />
                  </FormControl>
                  <FormError />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('feedback.form.messageLabel')}</FormLabel>
                  <FormControl>
                    <Textarea
                      autoFocus
                      maxLength={MAX_MESSAGE_LENGTH}
                      placeholder={t('feedback.form.messagePlaceholder')}
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <div className="text-muted-foreground text-xs text-right">
                    {t('feedback.form.characterCounter', {
                      count: messageLength,
                      max: MAX_MESSAGE_LENGTH,
                    })}
                  </div>
                  <FormError />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-3">
              <Button type="button" variant="outline" onClick={handleClose}>
                {t('feedback.form.cancel')}
              </Button>
              <Button type="submit" disabled={feedbackMutation.isPending}>
                {feedbackMutation.isPending && <Spinner className="mr-2" />}
                {t('feedback.form.submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
