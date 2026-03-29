import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from '@tanstack/react-router';
import {Toaster} from 'sonner';
import './index.css';
import './modules/i18n/i18n';
import {router} from './router';

import {CLERK_PUBLISHABLE_KEY, MSW_ENABLED} from './common/constants/constants';
import {queryClient} from './modules/api/query-client';
import {AppErrorBoundary} from './components/error-boundary/error-boundary';
import {ThemeProvider} from './modules/theme/theme-context';
import {TanStackDevtools} from '@tanstack/react-devtools';
import {aiDevtoolsPlugin} from '@tanstack/react-ai-devtools';
import {useTenantCheck} from './modules/tenants/hooks/use-tenant-check';
import {Loader2} from 'lucide-react';
import {ClerkProvider, useAuth} from '@clerk/react';
import {useTranslation} from 'react-i18next';
import {CLERK_LOCALES_MAP, I18nLanguage} from './modules/i18n/constants/i18n';
import {shadcn} from '@clerk/ui/themes';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  const {data: tenantData, isLoading, isError} = useTenantCheck();
  const {isLoaded: isClerkLoaded, isSignedIn} = useAuth();

  if (isLoading || !isClerkLoaded) {
    return (
      <section className="flex flex-col h-screen justify-center items-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <RouterProvider
      router={router}
      context={{isValid: Boolean(tenantData) && tenantData?.data.isValid && !isError, isSignedIn}}
    />
  );
}

function AppContent() {
  const {i18n} = useTranslation();
  const language = (i18n.resolvedLanguage ?? 'sr-Latn') as I18nLanguage;
  const locale = CLERK_LOCALES_MAP[language];

  return (
    <ClerkProvider
      afterSignOutUrl="/login"
      publishableKey={CLERK_PUBLISHABLE_KEY}
      localization={locale}
      signInFallbackRedirectUrl="/dashboard"
      appearance={{
        theme: shadcn,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <AppRouter />
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: 'app-toast',
              },
            }}
          />
          {import.meta.env.DEV && (
            <>
              <ReactQueryDevtools initialIsOpen={false} />
              <TanStackDevtools
                plugins={[aiDevtoolsPlugin()]}
                eventBusConfig={{
                  connectToServerBus: true,
                }}
              />
            </>
          )}
        </ThemeProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

async function enableMocking() {
  if (!MSW_ENABLED) {
    return;
  }

  const {worker} = await import('./mocks/browser');

  return worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'warn',
  });
}

void enableMocking()
  // eslint-disable-next-line no-console
  .catch((err) => console.error('Failed to initialize MSW', err))
  .finally(() => {
    createRoot(rootElement).render(
      <StrictMode>
        <AppErrorBoundary>
          <AppContent />
        </AppErrorBoundary>
      </StrictMode>,
    );
  });
