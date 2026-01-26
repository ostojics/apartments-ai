import {useState} from 'react';
import {MessageCircle, SendHorizonal} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils/cn';
import {useApartmentChat} from '../hooks/use-apartment-chat';
import {Spinner} from '@/components/ui/spinner';

export default function ApartmentChatTab() {
  const {t} = useTranslation();
  const [messageInput, setMessageInput] = useState('');

  const {messages, sendMessage, isLoading} = useApartmentChat();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (messageInput.trim() && !isLoading) {
      await sendMessage(messageInput);
      setMessageInput('');
    }
  };

  return (
    <Card className="bg-background rounded-none sm:rounded-2xl border-0 sm:border py-2">
      <CardHeader className="gap-4 pb-2 pt-4 border-b-2 border-b-border/40">
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
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-5 rounded-2xl p-0 mb-5 max-h-[30rem] overflow-y-auto">
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
                  {message.parts.map((part, index) => {
                    if (part.type === 'thinking') {
                      return (
                        <div key={index} className="mb-2 text-xs italic text-muted-foreground">
                          <Spinner className="size-4 animate-spin" />
                        </div>
                      );
                    }

                    if (part.type === 'text') {
                      return (
                        <div key={index}>
                          <span>{part.content}</span>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border bg-background p-3 shadow-sm">
          <div className="flex flex-col gap-3 items-end">
            <Textarea
              style={{backgroundColor: 'transparent'}}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t('apartment.chat.inputPlaceholder')}
              className="min-h-20 resize-none border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={t('apartment.chat.inputLabel')}
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="w-12 rounded-lg"
              disabled={!messageInput.trim() || isLoading}
              aria-label={t('apartment.chat.send')}
            >
              <SendHorizonal className="size-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
