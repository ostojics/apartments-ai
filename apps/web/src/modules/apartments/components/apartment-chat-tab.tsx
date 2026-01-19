import {MessageCircle} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils/cn';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ApartmentChatTab() {
  const {t} = useTranslation();
  const messages: ChatMessage[] = [
    {
      id: 'welcome',
      role: 'assistant',
      content: t('apartment.chat.messages.greeting'),
    },
    {
      id: 'user-question',
      role: 'user',
      content: t('apartment.chat.messages.question'),
    },
    {
      id: 'assistant-response',
      role: 'assistant',
      content: t('apartment.chat.messages.response'),
    },
  ];

  return (
    <Card className="bg-background">
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="size-5" />
          </span>
          <div className="space-y-1">
            <CardTitle className="text-xl">{t('apartment.chat.title')}</CardTitle>
            <CardDescription>{t('apartment.chat.description')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-5 rounded-2xl border bg-muted/30 p-4 sm:p-6">
          {messages.map((message) => {
            const isUser = message.role === 'user';

            return (
              <div
                key={message.id}
                className={cn('flex flex-col gap-2', isUser ? 'items-end text-right' : 'items-start text-left')}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t(`apartment.chat.roles.${message.role}`)}
                </span>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
                    isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground border border-border/60',
                  )}
                >
                  {message.content}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">{t('apartment.chat.note')}</p>
      </CardContent>
    </Card>
  );
}
