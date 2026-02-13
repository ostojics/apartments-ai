import {useEffect, useRef, useState} from 'react';
import {MessageCircle, SendHorizonal} from 'lucide-react';
import {useTranslation} from 'react-i18next';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils/cn';
import {useApartmentChat} from '../hooks/use-apartment-chat';
import {Spinner} from '@/components/ui/spinner';

export default function ApartmentChatTab() {
  const {t} = useTranslation();
  const [messageInput, setMessageInput] = useState('');
  const {messages, sendMessage, isLoading} = useApartmentChat();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const assistantMessages = messages.filter((message) => message.role !== 'user');
  const lastAssistantMessage = assistantMessages.at(-1);
  const lastAssistantHasText =
    lastAssistantMessage?.parts.some(
      (part) => part.type === 'text' && typeof part.content === 'string' && part.content.trim().length > 0,
    ) ?? false;
  const shouldShowLoadingIndicator = isLoading && !lastAssistantHasText;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await sendMessage(messageInput);
    setMessageInput('');
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <Card className="bg-background rounded-none sm:rounded-2xl border-0 sm:border py-2 flex h-full min-h-0 flex-col">
      <CardHeader className="gap-4 pb-2 pt-4 border-b-2 border-b-border/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageCircle className="size-5" />
          </span>
          <div className="space-y-1">
            <CardTitle className="text-lg">{t('apartment.chat.title')}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 min-h-0 flex-col gap-4 p-4">
        <div ref={messagesContainerRef} className="flex flex-1 flex-col gap-5 rounded-2xl p-0 overflow-y-auto pr-2">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            const isAssistant = !isUser;
            const roleLabel = isUser ? t('apartment.chat.roles.user') : t('apartment.chat.roles.assistant');
            const textParts = message.parts.filter((part) => part.type === 'text');
            const shouldHideAssistantBubble = isAssistant && isLoading && textParts.length === 0;

            if (shouldHideAssistantBubble) {
              return null;
            }

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
                  {textParts.map((part, index) => (
                    <div key={index}>
                      <span className="whitespace-pre-wrap">{part.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {shouldShowLoadingIndicator && (
            <div className="flex flex-col gap-2 items-start text-left">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t('apartment.chat.roles.assistant')}
              </span>
              <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed text-left shadow-sm bg-background text-foreground border border-border/60">
                <div className="text-xs italic text-muted-foreground">
                  <Spinner className="size-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="rounded-2xl border bg-background p-3 shadow-sm">
          <div className="flex flex-col gap-3 items-end">
            <Textarea
              style={{backgroundColor: 'transparent'}}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t('apartment.chat.inputPlaceholder')}
              className="resize-none border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={t('apartment.chat.inputLabel')}
              disabled={isLoading}
              required
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
