import {useMemo} from 'react';
import {MessageCircle, Send} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils/cn';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type ChatRole = ChatMessage['role'];

const CHAT_MESSAGE_DATA: {id: string; role: ChatRole; content: string}[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content: 'Zdravo! Ja sam vaš AI asistent za apartmane. Kako mogu da pomognem?',
  },
  {
    id: 'user-question',
    role: 'user',
    content: 'Koji su tihi sati i da li postoji parking za goste?',
  },
  {
    id: 'assistant-response',
    role: 'assistant',
    content: 'Tišina počinje u 22:00, a parking za goste je dostupan vikendom.',
  },
];

export default function ApartmentChatTab() {
  const {t} = useTranslation();
  const messages = useMemo<ChatMessage[]>(
    () =>
      CHAT_MESSAGE_DATA.map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
      })),
    [],
  );

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
            const roleLabel = isUser ? t('apartment.chat.roles.user') : t('apartment.chat.roles.assistant');

            return (
              <div
                key={message.id}
                className={cn('flex flex-col gap-2', isUser ? 'items-end text-right' : 'items-start text-left')}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{roleLabel}</span>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed text-left shadow-sm',
                    isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background text-foreground border border-border/60',
                  )}
                >
                  <span>{message.content}</span>
                </div>
              </div>
            );
          })}
        </div>
        <form className="flex flex-col gap-3 rounded-2xl border bg-background p-4 shadow-sm sm:flex-row sm:items-end">
          <div className="flex-1">
            <Textarea
              placeholder={t('apartment.chat.inputPlaceholder')}
              className="min-h-20 resize-none"
              aria-label={t('apartment.chat.inputLabel')}
            />
          </div>
          <Button type="button" className="w-full sm:w-auto">
            <span>{t('apartment.chat.send')}</span>
            <Send className="size-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
