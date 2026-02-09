import {API_URL, TENANT_SLUG} from '@/common/constants/constants';
import {getCurrentLanguage} from '@/modules/i18n/utils/get-current-language';
import {fetchServerSentEvents, useChat} from '@tanstack/ai-react';
import {useParams} from '@tanstack/react-router';

export const useApartmentChat = () => {
  const params = useParams({from: '/_public/apartments/$apartmentId'});

  const buildHeaders = () => {
    const headers: Record<string, string> = {
      'Accept-Language': getCurrentLanguage(),
    };

    const tenantSlug = TENANT_SLUG;
    if (tenantSlug) {
      headers['X-Tenant-Slug'] = tenantSlug;
    }

    return headers;
  };

  return useChat({
    connection: fetchServerSentEvents(`${API_URL}/v1/buildings/${params.apartmentId}/chat`, {
      headers: buildHeaders(),
    }),
  });
};
