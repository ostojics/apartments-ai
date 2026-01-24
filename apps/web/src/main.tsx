import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {RouterProvider} from '@tanstack/react-router';
import {Toaster} from 'sonner';
import './index.css';
import './modules/i18n/i18n';
import {router} from './router';

import {MSW_ENABLED} from './common/constants/constants';
import {queryClient} from './modules/api/query-client';
import {AppErrorBoundary} from './components/error-boundary/error-boundary';
import {ThemeProvider} from './modules/theme/theme-context';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  return <RouterProvider router={router} />;
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

void enableMocking().then(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <AppErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <AppRouter />
            <Toaster position="bottom-right" />
            {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          </ThemeProvider>
        </QueryClientProvider>
      </AppErrorBoundary>
    </StrictMode>,
  );
});
