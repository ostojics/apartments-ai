import {toast as sonnerToast, ExternalToast} from 'sonner';
import {CustomToast} from '@/components/toast/toast';

interface ToastOptions {
  title: string;
  description?: string;
}

export const toast = {
  success: (options: ToastOptions, sonnerOptions?: ExternalToast) => {
    return sonnerToast.custom(
      (t) => (
        <CustomToast
          title={options.title}
          description={options.description}
          type="success"
          onDismiss={() => sonnerToast.dismiss(t)}
        />
      ),
      sonnerOptions,
    );
  },

  error: (options: ToastOptions, sonnerOptions?: ExternalToast) => {
    return sonnerToast.custom(
      (t) => (
        <CustomToast
          title={options.title}
          description={options.description}
          type="error"
          onDismiss={() => sonnerToast.dismiss(t)}
        />
      ),
      sonnerOptions,
    );
  },
};
