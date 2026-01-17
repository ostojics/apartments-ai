import type {PromotionsRequestDTO} from '@acme/contracts';
import {promotionsRequestSchema} from '@acme/contracts';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {toast} from 'sonner';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Spinner} from '@/components/ui/spinner';
import {createZodResolver} from '@/lib/utils/zod-resolver';
import {usePromotionsMutation} from '@/modules/apartments/hooks/use-promotions-mutation';

import {FormError} from './form-error';

export function PromotionsTab() {
  const {t} = useTranslation();
  const promotionsMutation = usePromotionsMutation();
  const resolver = createZodResolver<PromotionsRequestDTO>(promotionsRequestSchema);
  const form = useForm<PromotionsRequestDTO>({
    resolver,
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      await promotionsMutation.mutateAsync(values);
      form.reset();
      toast.success(t('apartment.promotions.toasts.success'));
    } catch {
      toast.error(t('apartment.promotions.toasts.error'));
    }
  });

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-xl">{t('apartment.promotions.title')}</CardTitle>
        <CardDescription>{t('apartment.promotions.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('apartment.promotions.form.nameLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="name"
                      placeholder={t('apartment.promotions.form.namePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormError />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('apartment.promotions.form.emailLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder={t('apartment.promotions.form.emailPlaceholder')}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormError />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>{t('apartment.promotions.form.phoneLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="tel"
                      placeholder={t('apartment.promotions.form.phonePlaceholder')}
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormError />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">{t('apartment.promotions.helper')}</p>
              <Button className="w-full sm:w-auto" type="submit" disabled={promotionsMutation.isPending}>
                {promotionsMutation.isPending && <Spinner className="mr-2" />}
                {t('apartment.promotions.form.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
